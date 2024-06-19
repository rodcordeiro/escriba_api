import { RegexHelper } from './regex.util';

export const StringUtils = {
  IsNotEmpty: (str: string) => {
    if (str === undefined) return false;
    if (str === null) return false;
    if (str === 'undefined') return false;
    if (str === 'null') return false;
    if (str === '') return false;
    return str.trim() !== '';
  },

  IsUUID: (str: string) => {
    return !!str.toLowerCase().match(RegexHelper.uuid);
  },
};
