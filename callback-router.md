# Callback Router

___

This module provides a simple API for stringing together function calls, while avoiding "callback hell."

First, we require the module
```js
// callbackRouter is a function
var callbackRouter = require("callback-router");
```

Then recreate an array where we'll hold our callbacks
```js
var arr = [
  {
    func: function(String_foo, next)
      console.log(String_foo); // foo
      next("foo");
    },
    Array_args: ["foo"]
  },
  {
    func: function(String_bar, next) {
      console.log(String_bar); // foo
      next("bar");
    },
    Array_args: ["bar"]
  },
  {
    func: function(String_bar, next) {
      console.log(String_bar); // bar
      next();
    }
  }
];
```

Call 'callbackRouter', passing in your newly created array
```js
callbackRouter(arr);
```

Now to go over some of the details of the array.
```js
// the array takes objects as its valus
// we'll refer to this as the 'chain array'
[
  {
    // the 'func' property takes the callback function that you want called
    func: function(next)
      // 'next' is a function that must be called in order for the next function in the array to be executed
      // the 'next' function is always the last argument of this function
      // If there are values passed to the 'next' callback they will override the 'Array_args' property of the next callback in the 'chain array'
      next();
    },
    // the 'Array_args' property is an array containing the arguments that you want passed to 'func'
    Array_args: []
  },
  ...
]
```
