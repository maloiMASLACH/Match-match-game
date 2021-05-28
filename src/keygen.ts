export const uid = ():string => {
  const timmy = Date.now().toString(36).toLocaleUpperCase();
  return ''.concat(timmy);
};
