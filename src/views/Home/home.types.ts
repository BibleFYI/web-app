import { BOOKS, VERSIONS } from "../../utils/constants";

/**
 * Error to be used when no such book exists in any copy of the bible.
 * @param {string} book - the string representation of the book.
 */
export class InvalidBookError extends Error {
  constructor(public book: string) {
    super();
    this.name = "InvalidBookError";
    this.message = `Invalid reference. Cannot find any books with the name "${book}"`;
    this.stack = (new Error()).stack;
  }

  toString() {
    return `${this.message}`;
  }
}

/**
 * Error to be used when a valid book is submitted, but that book does not exist in the given 
 * version/translation.
 * @param {BOOKS} book - the invalid book in question.
 * @param {VERSIONS} version - the version the book does not exist in
 */
export class InvalidBookInVersionError extends Error {
  constructor(public book: BOOKS, public version: VERSIONS) {
    super();
    this.name = "InvalidBookInVersionError";
    this.message = `Invalid reference. The book ${book} does not exist in the selected bible version. 
    -> ${version}`
    this.stack = (new Error()).stack;
  }

  toString() {
    return `${this.message}`;
  }
}

/**
 * Error to be used when an invalid reference range is given.
 * @param {string} reference - the invalid reference in question.
 */
export class InvalidReferenceRangeError extends Error {
  constructor(public reference: string) {
    super();
    this.name = 'InvalidReferenceRangeError';
    this.message = `Invalid reference. No verses in range ${reference}.`;
    this.stack = (new Error()).stack;
  }

  toString() {
    return `${this.message}`;
  }
}
