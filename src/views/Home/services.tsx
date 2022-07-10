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
    
    let chapters: number[] = [];
    let verses: number[] = [];
    let queries: ScriptureQuery[] = [];

    if (inputs.length === 1) {
      // No spaces. Reference is form of "John 1-2" or "John 1"
      if (inputs[0].indexOf('-') < 0) {
        // Has one request. Reference is form of "John 1".
        let p = inputs[0].indexOf('.');
        if (p > -1) {
          // Reference is form of "John 1.1".
          queries.push({
            'book': book,
            'chapter': parseInt(inputs[0].slice(0, p)),
            'verses': [parseInt(inputs[0].slice(p + 1))]
          })
        } else {
          // Reference is form of "John 1".
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

      // No spaces. Query is form of "John 1-2" or "John 1"
      if (inputs[0].indexOf('-') > -1) {
        // Has two requests. Query is form of "John 1-2".
        const [first, second] = inputs[0].split('-');
        // Do first one first.
        let p = first.indexOf('.');
        if (p > -1) {
          chapters.push(parseInt(first.slice(0, p)));
          verses.push(parseInt(first.slice(p + 1)));
        } else {
          chapters.push(parseInt(first));
          verses.push(1);
        }

        // Do second one second.
        p = second.indexOf('.');
        if (p > -1) {
          chapters.push(parseInt(second.slice(0, p)));
          verses.push(parseInt(second.slice(p + 1)));
        } else {
          chapters.push(parseInt(second));
          verses.push(db[version][book].chapters[parseInt(second)].verses.length);
        }

        // Check if need to fill.
        if (chapters[1] - chapters[0] < 0) {
          throw Error("Invalid Reference. No verses in range!");
        } else if (chapters[1] - chapters[0] === 0) {
          if (verses[1] - verses[0] < 1) {
            throw Error("Invalid Reference. No verses in range!");
          } else {
            for (let i=verses[0]+1; i < verses[1]; i++) {
              verses.push(i);
            }
          }
        } else {
          // TODO: Implement this properly!
          for (let i=verses[0]; i < verses[1]; i++) {
            verses.push(i);
          }
        }
      }
    }

    // TODO: If there is more than 1 input remaining. E.g. "John 1.1 - 1.2" 

    return queries;
}