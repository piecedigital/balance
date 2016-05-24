module.exports = function(callbacks) {
  // set initial index to -1 for the initial call to begin at index 0
  var index = -1;

  var next = function() {
    // take the arguments passed to this function and put them into an array
    var sortedArguments = [];
    Object.keys(arguments).map(function(key) {
      sortedArguments.push(arguments[key]);
    });
    if(sortedArguments.length === 0) sortedArguments = null;
    // increment index so the next function is always called
    index++;
    if(index >= callbacks.length) return;
    callbacks[index].args = sortedArguments || callbacks[index].args || [];
    callbacks[index].args.push(next);
    callbacks[index].func.apply(null, callbacks[index].args);
  }
  return next;
};
console.log("callback-router.js mounted\n");
