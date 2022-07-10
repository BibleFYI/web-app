import { useState } from "react";

import "./styles.css"
import * as db from "../../db";
import { VERSIONS } from "../../utils/constants";
import { getScriptureQuery } from "./services";

export function Home(): JSX.Element {
  const [passage, setPassage] = useState("");
  const [reference, setReference] = useState("");
  const [version, setVersion] = useState(VERSIONS.KJV);

  const showPassage = () => {
    try {
      const queries = getScriptureQuery(reference, version);
      console.log("Queries:", queries);

      let passage = ""
      for (let i=0; i < queries.length; i++) {
        let query = queries[i]
        for (let j=0; j < query.verses.length; j++) {
          passage += `${query.chapter}.${query.verses[j]}: ${db[version][query.book].chapters[query.chapter-1].verses[query.verses[j]-1].text}\n`
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