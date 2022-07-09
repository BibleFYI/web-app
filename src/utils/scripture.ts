import { BOOKS } from './constants'

/**
 * Takes in the book from a reference input, and returns the correctly formatted key to be used in the db.
 * @param book String - a string representation of a book, e.g. "Jn" or "2 sam".
 * @returns a key to be used to access that book in the db.
 */
export function getBookKey(book: string) : BOOKS {
  if (book[book.length - 1] === '.') {
    book = book.slice(0, -1);
  }

  switch(book.toLowerCase()) {
    case 'gen':
    case 'ge':
    case 'gn':
    case 'genesis':
      return BOOKS.GENESIS;

    case 'ex':
    case 'exod':
    case 'exodus':
      return BOOKS.EXODUS;

    case 'lev':
    case 'le':
    case 'lv':
    case 'leviticus':
      return BOOKS.LEVITICUS;

    case 'num':
    case 'nu':
    case 'nm':
    case 'nb':
    case 'numbers':
      return BOOKS.NUMBERS;

    case 'deut':
    case 'de':
    case 'dt':
    case 'deuteronomy':
      return BOOKS.DEUTERONOMY;

    case 'josh':
    case 'jos':
    case 'jsh':
    case 'joshua':
      return BOOKS.JOSHUA;

    case 'judg':
    case 'jdg':
    case 'jg':
    case 'jdgs':
    case 'judges':
      return BOOKS.JUDGES;

    case 'rth':
    case 'ru':
    case 'ruth':
      return BOOKS.RUTH;

    case '1 sam':
    case '1 sm':
    case '1 sa':
    case '1 s':
    case '1 samuel':
      return BOOKS.FIRST_SAMUEL;

    case '2 sam':
    case '2 sm':
    case '2 sa':
    case '2 s':
    case '2 samuel':
      return BOOKS.SECOND_SAMUEL;

    case '1 kgs':
    case '1 kin':
    case '1 ki':
    case '1 k':
    case '1 kings':
      return BOOKS.FIRST_KINGS;

    case '2 kgs':
    case '2 kin':
    case '2 ki':
    case '2 k':
    case '2 kings':
      return BOOKS.SECOND_KINGS;

    case '1 chr':
    case '1 ch':
    case '1 chronicles':
      return BOOKS.FIRST_CHRONICLES;
    
    case '2 chr':
    case '2 ch':
    case '2 chronicles':
      return BOOKS.SECOND_CHRONICLES;

    case 'ezr':
    case 'ez':
    case 'ezra':
      return BOOKS.EZRA;
    
    case 'neh':
    case 'ne':
    case 'nehemiah':
      return BOOKS.NEHEMIAH;

    case 'tob':
    case 'tobit':
      return BOOKS.TOBIT;

    case 'jdt':
    case 'judith':
      return BOOKS.JUDITH;

    case 'esth':
    case 'esth1':
    case 'est':
    case 'es':
    case 'esther':
      return BOOKS.ESTHER;

    case '1 macc':
    case '1 maccabees':
      return BOOKS.FIRST_MACCABEES;

    case '2 macc':
    case '2 maccabees':
      return BOOKS.SECOND_MACCABEES;

    case 'jb':
    case 'job':
      return BOOKS.JOB;

    case 'ps':
    case 'psalm':
    case 'pslm':
    case 'psa':
    case 'psm':
    case 'psalms':
      return BOOKS.PSALMS;

    case 'prov':
    case 'pro':
    case 'prv':
    case 'pr':
    case 'proverbs':
      return BOOKS.PROVERBS;

    case 'ecc1':
    case 'eccles':
    case 'eccle':
    case 'ecc':
    case 'ec':
    case 'ecclesiastes':
      return BOOKS.ECCLESIASTES;

    case 'song':
    case 'song of songs':
    case 'canticle of canticles':
    case 'song of solomon':
      return BOOKS.SONG_OF_SONGS;

    case 'cant':
    case 'canticles':
      return BOOKS.CANTICLES;

    case 'wis':
    case 'wisdom of solomon':
    case 'wisdom':
      return BOOKS.WISDOM;

    case 'ecclus':
    case 'ecclesiasticus':
    case 'sir':
    case 'sirach':
      return BOOKS.SIRACH;

    case 'isa':
    case 'is':
    case 'isaiah':
      return BOOKS.ISAIAH;

    case 'jer':
    case 'je':
    case 'jr':
    case 'jeremiah':
      return BOOKS.JEREMIAH;

    case 'lam':
    case 'la':
    case 'lamentations':
      return BOOKS.LAMENTATIONS;

    case 'bar':
    case 'baruch':
      return BOOKS.BARUCH;

    case 'ezek':
    case 'eze':
    case 'ezk':
    case 'ezekial':
    case 'ezechiel':
    case 'ezekiel':
      return BOOKS.EZEKIEL;

    case 'dan':
    case 'da':
    case 'dn':
    case 'daniel':
      return BOOKS.DANIEL;

    case 'hos':
    case 'ho':
    case 'hosea':
      return BOOKS.HOSEA;

    case 'jl':
    case 'joel':
      return BOOKS.JOEL;

    case 'am':
    case 'amos':
      return BOOKS.AMOS;

    case 'jon':
    case 'jnh':
    case 'jonah':
      return BOOKS.JONAH;

    case 'mic':
    case 'mc':
    case 'micah':
      return BOOKS.MICAH;

    case 'nah':
    case 'na':
    case 'nahum':
      return BOOKS.NAHUM;

    case 'hab':
    case 'habakkuk':
      return BOOKS.HABAKKUK;

    case 'zeph':
    case 'zep':
    case 'zp':
    case 'zephaniah':
      return BOOKS.ZEPHANIAH;

    case 'hag':
    case 'hg':
    case 'haggai':
      return BOOKS.HAGGAI;

    case 'zech':
    case 'zec':
    case 'zc':
    case 'zechariah':
      return BOOKS.ZECHARIAH;

    case 'mal':
    case 'ml':
    case 'malachi':
      return BOOKS.MALACHI;

    case 'mt':
    case 'matt':
    case 'matthew':
      return BOOKS.MATTHEW;

    case 'mk':
    case 'mrk':
    case 'mark':
      return BOOKS.MARK;

    case 'lk':
    case 'luk':
    case 'luke':
      return BOOKS.LUKE;

    case 'jn':
    case 'jhn':
    case 'john':
      return BOOKS.JOHN;

    case 'acts':
    case 'acts of the apostles':
      return BOOKS.ACTS_OF_THE_APOSTLES;
    
    case 'rom':
    case 'ro':
    case 'rm':
    case 'romans':
      return BOOKS.ROMANS;

    case '1 cor':
    case '1 co':
    case '1 corinthians':
      return BOOKS.FIRST_CORINTHIANS;

    case '2 cor':
    case '2 co':
    case '2 corinthians':
      return BOOKS.SECOND_CORINTHIANS;

    case 'gal':
    case 'ga':
    case 'galatians':
      return BOOKS.GALATIANS;

    case 'eph':
    case 'ephes':
    case 'ephesians':
      return BOOKS.EPHESIANS;
    
    case '1 thess':
    case '1 thes':
    case '1 th':
    case '1 thessalonians':
      return BOOKS.FIRST_THESSALONIANS;

    case '2 thess':
    case '2 thes':
    case '2 th':
    case '2 thessalonians':
      return BOOKS.SECOND_THESSALONIANS;

    case '1 tim':
    case '1 ti':
    case '1 timothy':
      return BOOKS.FIRST_TIMOTHY;

    case '2 tim':
    case '2 ti':
    case '2 timothy':
      return BOOKS.SECOND_TIMOTHY;

    case 'ti':
    case 'tit':
    case 'titus':
      return BOOKS.TITUS;

    case 'philem':
    case 'phm':
    case 'pm':
    case 'philemon':
      return BOOKS.PHILEMON;

    case 'heb':
    case 'hebrews':
      return BOOKS.HEBREWS;

    case 'jas':
    case 'jm':
    case 'james':
      return BOOKS.JAMES;

    case '1 pet':
    case '1 pe':
    case '1 pt':
    case '1 p':
    case '1 peter':
      return BOOKS.FIRST_PETER;

    case '2 pet':
    case '2 pe':
    case '2 pt':
    case '2 p':
    case '2 peter':
      return BOOKS.SECOND_PETER;

    case '1 jn':
    case '1 jhn':
    case '1 j':
    case '1 john':
      return BOOKS.FIRST_JOHN;

    case '2 jn':
    case '2 jhn':
    case '2 j':
    case '2 john':
      return BOOKS.SECOND_JOHN;

    case '3 jn':
    case '3 jhn':
    case '3 j':
    case '3 john':
      return BOOKS.THIRD_JOHN;

    case 'jud':
    case 'jd':
    case 'jude':
      return BOOKS.JUDE;

    case 'rev':
    case 'apoc':
    case 'apocalypse':
    case 'revelation':
      return BOOKS.REVELATION;

    default:
      return BOOKS.INVALID;
  }
}