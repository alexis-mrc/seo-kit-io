export type StringDate = string & { __brand: 'YYYY-MM-DD' }; // format YYYY-MM-DD

export const isValidDateString = (str: string): str is StringDate => {
  return str.match(/^\d{4}-\d{2}-\d{2}$/) !== null
};
