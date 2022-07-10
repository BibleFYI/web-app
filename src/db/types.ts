import { BOOKS, VERSIONS } from "../utils/constants";

export type Scripture = {
  version: VERSIONS;
  book: BOOKS;
  chapters: {
    chapter: string;
    verses: {
      verse: string;
      text: string;
      footnote?: string;
    }[];
  }[];
}

export interface Translation {
  [book: string]: Scripture;
}