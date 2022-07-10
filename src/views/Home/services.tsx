import * as db from "../../db"
import { BOOKS, VERSIONS } from "../../utils/constants";
import { getBookKey } from "../../utils/scripture";
import { ScriptureQuery } from "./types";

/**
 * Takes in a string representing a book. Could be "John", "jOhN" or "jn". Translates that string
 * into a dbKey useful for interacting with the database.
 * @param book A string representation of a book of the bible.
 * @throws {Error} if no string code of that book exists in global utils
 * @returns the book key.
 */
export function getBook(book: string) : BOOKS {
  const bookKey = getBookKey(book);
  if (bookKey === BOOKS.INVALID) {
    throw Error(`Invalid reference. Cannot find book with name ${book}`);
  }
  return bookKey;
}

/**
 * Takes in an input string representing a bible reference. Returns an array representing successive
 * queries to make to the db.
 * @param input - a string input.
 * @param version - the version of the bible to query.
 * @returns - an array of ScriptureQueries. 
 */
export function getScriptureQuery(input: string, version: VERSIONS) : ScriptureQuery[]{
    let inputs: string[] = input.split(' ');
    if (inputs.length <= 1) {
      throw Error("Invalid reference. It appears you are missing a space between the book and chapter. Try '{BOOK} {CHAPTER}:{VERSE} - {CHAPTER}:{VERSE}");
    }
    const book = getBook(String(inputs.shift()));
    if (!db[version][book]) {
      throw Error("Invalid reference. That book does not exist in the selected bible version");
    }
    
    let queries: ScriptureQuery[] = [];

    // No spaces. Reference is form of "John 1-2" or "John 1"
    if (inputs.length === 1) {
      // Has one request. Reference is form of "John 1".
      if (inputs[0].indexOf('-') < 0) {
        let p = inputs[0].indexOf('.');
        // Reference is form of "John 1.1".
        if (p > -1) {
          queries.push({
            'book': book,
            'chapter': parseInt(inputs[0].slice(0, p)),
            'verses': [parseInt(inputs[0].slice(p + 1))]
          })
        } // Reference is form of "John 1". 
        else {
          const query: ScriptureQuery = {
            'book': book,
            'chapter': parseInt(inputs[0]),
            'verses': []
          };
          console.log(`length: ${db[version][book].chapters[query.chapter-1].verses.length}`)
          for (let i = 0; i < db[version][book].chapters[query.chapter-1].verses.length; i++) {
            query.verses.push(i);
          }
          queries.push(query);
        }
      }

      // Has two requests. Reference is form of "John 1-2".
      else {
        const [left, right] = inputs[0].split('-');
        const leftP = left.indexOf('.');
        const rightP = right.indexOf('.');
        let leftC: number, leftV: number, rightC: number, rightV: number;
        // Left reference is form of "[John] 1"
        if (leftP < 0) {
          leftC = parseInt(left);
          leftV = 1;
        } // Left reference is form of "[John] 1.1" 
        else {
          leftC = parseInt(left.slice(0, leftP));
          leftV = parseInt(left.slice(leftP + 1));
        }
        // Right reference is form of "[John 1-]2"
        if (rightP < 0) {
          rightC = parseInt(right);
          rightV = db[version][book].chapters[rightC - 1].verses.length;
        } // Right reference is form of "[John 1-]2.1"
        else {
          rightC = parseInt(right.slice(0, rightP));
          rightV = parseInt(right.slice(rightP + 1));
        }

        // Reference is form of "John 2-1"
        if (leftC > rightC) {
          throw Error("Invalid reference. No verses in that range");
        }
        // Reference is form of "John 1-2"
        if (leftC < rightC) {
          const leftQuery: ScriptureQuery = {
            'book': book,
            'chapter': leftC,
            'verses': []
          }
          for (let i=leftV; i < db[version][book].chapters[leftC - 1].verses.length; i++) {
            leftQuery.verses.push(i);
          }
          queries.push(leftQuery);

          const rightQuery: ScriptureQuery = {
            'book': book,
            'chapter': rightC,
            'verses': []
          }
          for (let i=1; i <= rightV; i++) {
            rightQuery.verses.push(i);
          }
          queries.push(rightQuery);
        } // Reference is form of "John 1-1"
        else {
          const query: ScriptureQuery = {
            'book': book,
            'chapter': leftC,
            'verses': []
          }
          for (let i=leftV; i <= rightV; i++) {
            query.verses.push(i);
          }
          queries.push(query);
        }
      }
    }

    // TODO: If there is more than 1 input remaining. E.g. "John 1.1 - 1.2" 

    return queries;
}