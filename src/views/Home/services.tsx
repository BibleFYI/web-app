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
export function getScriptureQuery(input: string, version: VERSIONS) : ScriptureQuery[] {
    let inputs: string[] = input.split(' ');

    let bookString = inputs.shift();
    if (!Number.isNaN(Number(bookString))) {
      bookString += " " + inputs.shift()!;
    }
    const book = getBook(String(bookString));
    if (!db[version][book]) {
      throw Error("Invalid reference. That book does not exist in the selected bible version");
    }
    
    const reference = inputs.join('');
    let queries: ScriptureQuery[] = [];

    // Reference is form of "John"
    if (inputs.length === 0) {
      for (let i=0; i < db[version][book].chapters.length; i++) {
        const query: ScriptureQuery = {
          'book': book,
          'chapter': i + 1, // Bible chapters are not indexed at 0, dummy.
          'verses': []
        }
        for (let j=0; j < db[version][book].chapters[i].verses.length; j++) {
          query.verses.push(j + 1);
        }
        queries.push(query);
      }
    }

    // Has one request. Reference is form of "John 1".
    else if (reference.indexOf('-') < 0) {
      let p = reference.indexOf('.') < 0 ? reference.indexOf(':') : reference.indexOf('.');
      // Reference is form of "John 1.1".
      if (p > -1) {
        console.log("Verse:", parseInt(reference.slice(p + 1)));
        queries.push({
          'book': book,
          'chapter': parseInt(reference.slice(0, p)),
          'verses': [parseInt(reference.slice(p + 1))]
        })
      } // Reference is form of "John 1". 
      else {
        const query: ScriptureQuery = {
          'book': book,
          'chapter': parseInt(reference),
          'verses': []
        };
        console.log(`length: ${db[version][book].chapters[query.chapter-1].verses.length}`)
        for (let i = 1; i < db[version][book].chapters[query.chapter-1].verses.length + 1; i++) {
          query.verses.push(i);
        }
        queries.push(query);
      }
    }

    // Has two requests. Reference is form of "John 1-2".
    else {
      const [left, right] = reference.split('-');
      const leftP = left.indexOf('.') < 0 ? left.indexOf(':') : left.indexOf('.')
      const rightP = right.indexOf('.') < 0 ? right.indexOf(':') : right.indexOf('.');
      let leftC: number, leftV: number, rightC: number, rightV: number;
      // Left reference is form of "[John] 1"
      if (leftP < 0) {
        leftC = parseInt(left);
        leftV = 0;
      } // Left reference is form of "[John] 1.1" 
      else {
        leftC = parseInt(left.slice(0, leftP));
        leftV = parseInt(left.slice(leftP + 1));
      }
      // Right reference is form of "[John 1-]2"
      if (rightP < 0) {
        // reference is form of John 1.1-2
        if (leftV !== 0) {
          rightC = leftC;
          rightV = parseInt(right);
        } else // reference is form of John 1-2
        {
          rightC = parseInt(right);
          rightV = db[version][book].chapters[rightC - 1].verses.length;
        }
      } // Right reference is form of "[John 1-]2.1"
      else {
        rightC = parseInt(right.slice(0, rightP));
        rightV = parseInt(right.slice(rightP + 1));
      }
      if (leftV === 0) {leftV = 1};

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

    return queries;
}