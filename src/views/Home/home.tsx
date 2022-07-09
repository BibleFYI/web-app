import { useState } from "react";

import "./styles.css"
import * as db from "../../db";
import { getBookKey } from "../../utils/scripture";
import { BOOKS } from "../../utils/constants";
import { VERSIONS } from "../../db/types";

export function Home(): JSX.Element {
  const [passage, setPassage] = useState("");
  const [reference, setReference] = useState("");
  const [version, setVersion] = useState(VERSIONS.KJV);

  function getBook(book: string) {
    const bookKey = getBookKey(book);
    if (bookKey === BOOKS.INVALID) {
      throw Error(`Invalid reference. Cannot find book with name ${book}`);
    }
    return bookKey;
  }

  function getChapterAndVerse(input: string[], book: BOOKS) {
    let chapters: number[] = [];
    let verses: number[] = [];
    if (input.length === 1) {
      // No spaces! Easy!
      if (input[0].indexOf('-') > -1) {
        // Has two requests!
        const [first, second] = input[0].split('-');
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
          throw Error("No verses in range!");
        } else if (chapters[1] - chapters[0] === 0) {
          if (verses[1] - verses[0] < 1) {
            throw Error("No verses in range!");
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

    return [chapters.sort((a,b) => a - b), verses.sort((a,b) => a - b)];
  }

  function getPassage(ref: string) : [BOOKS, number[], number[]] {
    let input: string[] = ref.split(' ');
    if (input.length <= 1) {
      throw Error("Invalid reference. It appears you are missing a space between the book and chapter. Try '{BOOK} {CHAPTER}:{VERSE} - {CHAPTER}:{VERSE}");
    }
    const book = getBook(String(input.shift()));
    let [chapters, verses] = getChapterAndVerse(input, book);

    return [book, chapters, verses];
  }

  const showPassage = () => {
    try {
      const [book, chapters, verses] = getPassage(reference);
      console.log(`book: ${book}, chapters: ${chapters}, verses: ${verses}`);

      let passage = ""
      for (let i = chapters[0]; i <= chapters[chapters.length-1]; i++) {
        for (let j = verses[0]; j <= verses[verses.length-1]; j++) {
          passage += `${i}.${j}: ${db[version][book].chapters[i].verses[j].text}\n`;
        }
      }

      setPassage(`${passage}`);
    } catch (e) {
      setPassage(`ERROR: ${e}`);
    }
  }

  const handleChange = (event: { target: { name: string, value: any; }; }) => {
    switch (event.target.name){
      case 'reference':
        setReference(event.target.value);
        break;
      case 'version':
        setVersion(event.target.value);
    }
  }

  const urlSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  }

  return (
    <div>
      <h1 className="home-header">The Holy Bible</h1>
      <form className="form" onSubmit={urlSubmit}>
        <label htmlFor="reference">Reference: 
          <input list="chapters" id="reference" name="reference" placeholder="Enter reference, e.g. John 1.1-5" maxLength={1024} size={25} value={reference} onChange={handleChange}></input>
        </label>
        <datalist id="chapters">
          <option value="Genesis"/>
          <option value="Exodus"/>
          <option value="Leviticus"/>
          <option value="Numbers"/>
          <option value="Deuteronomy"/>
          <option value="Joshua"/>
          <option value="Judges"/>
          <option value="Ruth"/>
          <option value="1 Samuel"/>
          <option value="2 Samuel"/>
          <option value="1 Kings"/>
          <option value="2 Kings"/>
          <option value="1 Chronicles"/>
          <option value="2 Chronicles"/>
          <option value="Ezra"/>
          <option value="Nehemiah"/>
          <option value="Esther"/>
          <option value="Job"/>
          <option value="Psalms"/>
          <option value="Proverbs"/>
          <option value="Ecclesiastes"/>
          <option value="Song of Solomon"/>
          <option value="Isaiah"/>
          <option value="Jeremiah"/>
          <option value="Ezekiel"/>
          <option value="Daniel"/>
          <option value="Hosea"/>
          <option value="Joel"/>
          <option value="Amos"/>
          <option value="Obadiah"/>
          <option value="Jonah"/>
          <option value="Micah"/>
          <option value="Nahum"/>
          <option value="Habakkuk"/>
          <option value="Zephaniah"/>
          <option value="Haggai"/>
          <option value="Zechariah"/>
          <option value="Malachi"/>
          <option value="Tobit"/>
          <option value="Judith"/>
          <option value="Additions to Esther"/>
          <option value="Wisdom of Solomon"/>
          <option value="Sirach"/>
          <option value="Ecclesiastes"/>
          <option value="Baruch"/>
          <option value="Letter of Jeremiah"/>
          <option value="Azariah and Song"/>
          <option value="Susannah"/>
          <option value="Bel and the dragon"/>
          <option value="1 Maccabees"/>
          <option value="2 Maccabees"/>
          <option value="1 Edras"/>
          <option value="Manasseh"/>
          <option value="3 Maccabees"/>
          <option value="2 Esdras"/>
          <option value="4 Maccabees"/>
          <option value="Matthew"/>
          <option value="Mark"/>
          <option value="Luke"/>
          <option value="John"/>
          <option value="Acts"/>
          <option value="Romans"/>
          <option value="1 Corinthians"/>
          <option value="2 Corinthians"/>
          <option value="Galatians"/>
          <option value="Ephesians"/>
          <option value="Philippians"/>
          <option value="Colossians"/>
          <option value="1 Thessalonians"/>
          <option value="2 Thessalonians"/>
          <option value="1 Timothy"/>
          <option value="2 Timothy"/>
          <option value="Titus"/>
          <option value="Philemon"/>
          <option value="Hebrews"/>
          <option value="James"/>
          <option value="1 Peter"/>
          <option value="2 Peter"/>
          <option value="1 John"/>
          <option value="2 John"/>
          <option value="3 John"/>
          <option value="Jude"/>
          <option value="Revelation"/>
        </datalist>

        <p></p>
        <label htmlFor="version">Version: 
          <select name="version" id="version" value={version} onChange={handleChange}>
            <option value={VERSIONS.KJV}>King James Version</option>
            <option value="NRSV">New Revised Standard Version</option>
            <option value="NIV">New International Version</option>
          </select>
        </label>

        <p></p>
        <button onClick={showPassage}>Show Passage</button>
        <input type="submit" name="list_books" value="List all books and chapters"/>
      </form>

      <p className="scripture">{passage}</p>
    </div>
  );
}