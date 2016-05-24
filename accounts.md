# Accounts

___

This module will handle all operations regarding user accounts (besides saving them to the DB, of course).

The module exports a function. It takes an object as an argument. This object should be the body object that's returned from a form submission:

```js
var accounts = require("./accounts");

app.post("/signup", function(req, res) {
  accounts(req.body);
});
```

That's just the beginning. Once called the `accounts` function will return an object containing several other methods to complete a full operation.

#### validateUser: functions

This function validates the user input. It will either return `true` or an `Error` object.

#### createUser: functions

This function will create a completely formatted user object, if it passes validation (which it will run on its own).

We've already seen a brief example of how the parent method is supposed to be called, so lets try and create a user.

```js
accounts(req.body).createUser(function(err, object) {
});
```
`object` is the newly formatted user object. At this point you can simply shove it in the DB.
`err`, if there is an error, will be a string containing the error message, which you can then long like so:

```js
accounts(req.body).createUser(function(err, object) {
  console.error(new Error(err));
});
```
... and `object` will be null.

The `createUser` method uses the `validateUser` method, which is openly accessible to being called.

```js
accounts(req.body).validateUser();
```

It takes no arguments and will return either true, meaning the user details passed validation, or it'll pass a string, which is the error message which you can then log to the console.

```js
var isValid = accounts(req.body).validateUser();
if(isValid === true) {
  // hurray!
} else {
  // aww, bullocks
  console.error(new Error(isValid));
};
```

There virtually no need to call the method directly, but it is there for, a) unit testing purposes, and b) the off-chance of it being needed at some point.
