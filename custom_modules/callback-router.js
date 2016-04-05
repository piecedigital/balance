module.exports = function(Array_callbacks) {
  // set initial index to -1 for the initial call to begin at index 0
  var Int_index = -1;

  var Func_next = function() {
    var Object_arguments = arguments;
    // take the arguments passed to this function and put them into an array
    var Array_arguments = [];
    Object.keys(Object_arguments).map(function(key) {
      Array_arguments.push(Object_arguments[key]);
    });
    if(Array_arguments.length === 0) Array_arguments = null;
    // increment index so the next function is always called
    Int_index++;
    if(Int_index >= Array_callbacks.length) return;
    Array_callbacks[Int_index].Array_args = Array_arguments || Array_callbacks[Int_index].Array_args || [];
    Array_callbacks[Int_index].Array_args.push(Func_next);
    Array_callbacks[Int_index].func.apply(null, Array_callbacks[Int_index].Array_args);
  }
  return Func_next;
};
