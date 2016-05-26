module.exports = function() {
  Array.prototype.includes = Array.prototype.includes || function(data) {
    return this.indexOf(data) >= 0;
  };
  Object.empty = function(object) {
    return Object.keys(object).length === 0;
  };
};
