export const generateNewId = () => {
  return new Date().getTime().toString(36).concat(
    performance.now().toString(),
    Math.random().toString(),
  ).replace(/\./g, "");
};
