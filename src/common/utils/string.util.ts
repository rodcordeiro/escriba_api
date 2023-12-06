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
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return !!str.toLowerCase().match(regex);
  },
};
