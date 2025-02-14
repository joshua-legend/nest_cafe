export const predicateHelpers = {
  arrayHasElements: <T>(data: T[]): boolean => Array.isArray(data) && data.length > 0,
  exists: <T>(value: T[] | T): boolean => (Array.isArray(value) ? value.length > 0 : !!value),
};
