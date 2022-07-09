import { BOOKS } from "../utils/constants";

export enum VERSIONS {
  KJV = 'KJV',
}

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