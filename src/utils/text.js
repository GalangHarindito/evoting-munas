export const toTitleCase = (text) => (
  text.replace(/\w\S*/g, (str) => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase())
);
