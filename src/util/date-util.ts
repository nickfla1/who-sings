import dateformat from 'dateformat';

/**
 * Converts a Date object to a UNIX timestamp.
 * @param date The Date object to convert
 * @param ms Set to true to include milliseconds to the output
 */
export const dateToTs = (date: Date, ms?: boolean): number =>
  ms ? date.getTime() : Math.round(date.getTime() / 1000);

/**
 * Converts an UNIX timestamp to a Date object.
 * @param ts The UNIX timestamp to convert
 * @param ms Set to true if the input timestamp includes milliseconds
 */
export const tsToDate = (ts: number, ms?: boolean): Date =>
  new Date(ms ? ts : ts * 1000);

/**
 * Formats a Date object using en-US locale.
 * @param date The Date object to format
 */
export const formatDate = (date: Date): string =>
  dateformat(date, 'mm/dd/yy, hh:MM TT');
