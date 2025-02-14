export const isEmptyObject = (obj: any): boolean => {
  return obj == null || (typeof obj === 'object' && Object.keys(obj).length === 0);
};
