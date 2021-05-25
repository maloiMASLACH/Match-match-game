export const uid = () => {
  let timmy = Date.now().toString(36).toLocaleUpperCase();
  return ''.concat(timmy);
};
