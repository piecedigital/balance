# Mongo Queries
___

This'll be short. This is how you'd use the `mongo-queries` module:
```js
var Func_dbQueries = require("./custom_modules/mongo-queries");

Func_dbQueries(collection: String, operation: String, query: Object, update: Object, function(returnedData: Object || Array) {
  //
});
```

Whether `returnedData` is an object or an array depends on the operation used. E.g.:
```js
Func_dbQueries("users", "find", {}, {}, function(Array_returnedData) {
  // returnedData is an array
});
```

If an empty string is passed to the "operation" argument it defaults to "findOne" and will return an object.

**NOTE: for testing purposes there is a 6th argument, a function. When called it will close the database connection. This should only be used in the unit tests**
