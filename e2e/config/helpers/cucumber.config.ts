export const defaultTimeout = 10000;

module.exports = () => {
  // Default timeout for each cucumber step
  this.setDefaultTimeout(defaultTimeout);
};
