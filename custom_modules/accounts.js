var bcrypt = require("bcryptjs"),
sh = require("shoehornjs");

module.exports = function(body) {
  body = sh().Object(body);
  return {
    createUser(callback) {
      callback = sh().Func(callback);
      var isValid = this.validateUser();
      if(typeof isValid !== "boolean") {
        console.error(new Error(isValid));
        callback(isValid, null);
      } else {
        bcrypt.hash(sh().String(body.password), 10, function(err, hash) {
          callback(null, {
            firstName: sh().String(body.firstname),
            lastName: sh().String(body.lastname),
            email: sh().String(body.email),// regex: /([a-z0-9]){1,}([.][a-z0-9]{1,})?([@][a-z0-9]{2,}[.][a-z]{1,3})([.][a-z]{1,2})?/i
            password: sh().String(hash),
            username: sh().String(body.username),// regex: /^[a-z0-9_\-]{3,}$/gi
            // ...  // used for login and to connect the user document in the "users" collection
            usernameFlat: sh().String(body.username.toLowerCase()),
            accountType: "basic", // ["basic", "premium"]
            ban: {
              status: false,
              banDate: null, // new Date().getTime() === gets milliseconds
              reason: "" // explains the reason for the user's ban
            },
            suspension:  {
              reasons: [
                // startDate: new Date().getTime() === gets milliseconds
                // endDate: new Date().getTime() === gets milliseconds
              ]
            }
          });
        });
      }
    },
    validateUser() {
      if(Object.keys(body).length !== 5) {
        return "Invalid number of properties";
      }
      for(var key in body) {
        if( Object.hasOwnProperty(body[key]) ) {
          if(!body[key]) return `Missing user data. Key: ${key}, Value: ${body[key]}`;
        }
      };
      // validate user data with regex
      if( !body.firstname.match(/^[a-z]{2,}$/gi) ) return `Invalid first name: ${body.firstname}`;
      if( !body.lastname.match(/^[a-z]{2,}$/gi) ) return `Invalid last name: ${body.lastname}`;
      if( !body.username.match(/^[a-z0-9_\-]{3,}$/gi) ) return `Invalid username: ${body.username}`;
      if( !body.email.match(/([a-z0-9]){1,}([.][a-z0-9]{1,})?([@][a-z0-9]{2,}[.][a-z]{1,3})([.][a-z]{1,2})?/i) ) return `Invalid email: ${body.email}`;
      // if no fails, return true
      return true;
    }
  };
};
console.log("accounts.js mounted\n");
