/**
 *  Função que retorna data formatada em pt-BR
 *  @param {string} value Recebe um valor ISO
 *  @example formatDate('2010-10-01T00:00:00Z') => '01/10/2010'
 */

export const formatDate = (value: string): string =>
  new Date(value)
    .toISOString()
    .split('T')[0]
    .split('-')
    .slice(0, 3)
    .reverse()
    .join('/');

/**
 *  Função para adicionar x dias a data e retorná-lano formato Date
 *  @param {string} value Recebe um valor ISO
 *  @example formatDate('2010-10-01T00:00:00Z',5) => '2010-10-06T00:00:00Z'
 */
export function addDays(date: string | Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

interface iDateOptions {
  year: number;
  month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  day: number;
}

/**
 * Converts the date in d to a date-object. The input can be:
 *
 *   a date object: returned without modification
 *   an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
 *   a number     : Interpreted as number of milliseconds
 *                   since 1 Jan 1970 (a timestamp)
 *   a string     : Any format supported by the javascript engine, like
 *                   "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
 *   an object     : Interpreted as an object with year, month and date
 *                   attributes.  **NOTE** month is 0-11.
 */
export function convertDate(d: any) {
  return d.constructor === Date
    ? d
    : d.constructor === Array
    ? new Date(d[0], d[1], d[2])
    : d.constructor === Number
    ? new Date(d as any)
    : d.constructor === String
    ? new Date(d as string)
    : typeof d === 'object'
    ? new Date(d.year, d.month, d.date)
    : NaN;
}

/**
Compare two dates (could be of any type supported by the convert
function above) and returns:

  _-1_ : if a < b

    _0_ : if a = b

    _1_ : if a > b

 NaN : if a or b is an illegal date

 NOTE: The code inside isFinite does an assignment (=).
 */
export function compareDates(
  a: string | Date | number | iDateOptions,
  b: string | Date | number | iDateOptions,
) {
  // eslint-disable-next-line no-return-assign
  return Number.isFinite((a = convertDate(a).valueOf())) &&
    Number.isFinite((b = convertDate(b).valueOf()))
    ? (((a as any) > b) as any) - (((a as any) < b) as any)
    : NaN;
}

/**
Checks if date in d is between dates in start and end.
 Returns a boolean or NaN:
  
   true  : if d is between start and end (inclusive)
  
      false : if d is before start or after end
  
      NaN   : if one or more of the dates is illegal.
  
      __NOTE__ : The code inside isFinite does an assignment (=).
 */

export function isInRange(
  d: string | Date | number | iDateOptions,
  start: string | Date | number | iDateOptions,
  end: string | Date | number | iDateOptions,
) {
  return Number.isFinite((d = convertDate(d).valueOf())) &&
    Number.isFinite((start = convertDate(start).valueOf())) &&
    Number.isFinite((end = convertDate(end).valueOf()))
    ? start <= d && d <= end
    : NaN;
}

export function AddHour(date: Date, hour: number) {
  return date.setHours(date.getHours() + hour);
}
export default {
  /**
   * Converts the date in d to a date-object. The input can be:
   *
   *   a date object: returned without modification
   *   an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
   *   a number     : Interpreted as number of milliseconds
   *                   since 1 Jan 1970 (a timestamp)
   *   a string     : Any format supported by the javascript engine, like
   *                   "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
   *   an object     : Interpreted as an object with year, month and date
   *                   attributes.  **NOTE** month is 0-11.
   */
  convert: convertDate,
  /**
Compare two dates (could be of any type supported by the convert
function above) and returns:

  _-1_ : if a < b

    _0_ : if a = b

    _1_ : if a > b

 NaN : if a or b is an illegal date

 NOTE: The code inside isFinite does an assignment (=).
 */
  compare: compareDates,
  /**
Checks if date in d is between dates in start and end.
 Returns a boolean or NaN:
  
   true  : if d is between start and end (inclusive)
  
      false : if d is before start or after end
  
      NaN   : if one or more of the dates is illegal.
  
      __NOTE__ : The code inside isFinite does an assignment (=).
 */
  inRange: isInRange,
  /**
   *  Função para adicionar x dias a data e retorná-lano formato Date
   *  @param {string} value Recebe um valor ISO
   *  @example formatDate('2010-10-01T00:00:00Z',5) => '2010-10-06T00:00:00Z'
   */
  add: addDays,
  /**
   *  Função que retorna data formatada em pt-BR
   *  @param {string} value Recebe um valor ISO
   *  @example formatDate('2010-10-01T00:00:00Z') => '01/10/2010'
   */
  format: formatDate,
  hour: AddHour,
};
