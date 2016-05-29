Object.prototype.map = function(callback) {
  var returnObject = {};
  for(var key of Object.keys(this)) {
    var value = typeof this[key] === "object" ? Object.assign({}, this[key]) : this[key];
    if(typeof callback === "function") {
      var returnValue = callback(value, key, Object.assign({}, this));
      returnObject[key] = returnValue;
    }
  };
  return returnObject;
};
Object.empty = function(object) {
  return Object.keys(object).length === 0;
};
