import { BOOKS } from "../../utils/constants"

export type ScriptureQuery = {
  'book': BOOKS
  'chapter': number,
  'verses': number[],
};