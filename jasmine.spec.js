var sh = require("shoehornjs");
require("./private/private-data")();

describe("Testing module:", function() {
  var callbackRouter = sh().Func(require("./custom_modules/callback-router"));

  // testing the "callback-router" module
  it("'/custom_modules/callback-router.js'", function() {
    var testNumber = 0,
    testString;

    var arr = [
      {
        func: function(foo, next) {
          testNumber++;
          testString = sh().String(foo);
          next("foo");
        },
        args: ["foo"]
      },
      {
        func: function(_, next) {
          testNumber++;
          next("bar");
        },
        args: ["bar"]
      },
      {
        func: function(_, next) {
          testNumber++;
          next();
        }
      }
    ];

    var next = callbackRouter(arr);
    next();
    expect(testNumber).toBe(3);
    expect(sh().trueType(testString)).toBe("String");
    expect(testString).toBe("foo");
  });

  // testing "mongo-queries" module
  it("'/custom_modules/mongo-queries.js'", function() {
    var asyncsDone = 0;
    var dbQueries = sh().Func(require("./custom_modules/mongo-queries")), queryArrayDataGood, queryObjectDataGood, queryArrayDataBad, queryObjectDataBad;

    var cbArr = [
      {
        func: function(next) {
          dbQueries("test_users_success", "find", {}, {}, function(err, returnedData, quit) {
            queryArrayDataGood = sh().Array(returnedData);
            asyncsDone++;
            next();
          });
        }
      },
      {
        func: function(next) {
          dbQueries("test_users_success", "", {}, {}, function(err, returnedData, quit) {
            queryObjectDataGood = sh().Object(returnedData);
            asyncsDone++;
            next();
          });
        }
      },
      {
        func: function(next) {
          dbQueries("test_users_fail", "find", {}, {}, function(err, returnedData, quit) {
            queryArrayDataBad = sh().Array(returnedData);
            asyncsDone++;
            next();
          });
        }
      },
      {
        func: function() {
          dbQueries("test_users_fail", "", {}, {}, function(err, returnedData, quit) {
            queryObjectDataBad = sh().Object(returnedData);
            asyncsDone++;
            quit();
          });
        }
      }
    ];
    var asyncs = sh().Func( callbackRouter(cbArr) );
    asyncs();

     waitsFor(function() {
       return asyncsDone === 4;
     }, "Async should be done", 5000);

     runs(function() {
       expect(sh().trueType(dbQueries)).toBe("Function");
       // testing data returned from a populated collection in the database
       // ![broken] - the database needs to actually be populated
       expect(sh().trueType(queryArrayDataGood)).toBe("Array");
       expect(queryArrayDataGood.length).toBe(0);
       expect(sh().trueType(queryObjectDataGood)).toBe("Object");
       expect(Object.keys(queryObjectDataGood).length).toBe(0);
       // testing returned data from an unpopulated collection in the database
       expect(sh().trueType(queryArrayDataBad)).toBe("Array");
       expect(queryArrayDataBad.length).toBe(0);
       expect(sh().trueType(queryObjectDataBad)).toBe("Object");
       expect(Object.keys(queryObjectDataBad).length).toBe(0);
     });
  });

  // testing "accounts" module
  it("'/custom_modules/accounts.js'", function() {
    var accounts = require("./custom_modules/accounts");
    var callbackDone = false,
    attempts = [];

    var arr = [
      {
        func(next) {
          accounts({
            username: "foobar",
            firstname: "foo",
            lastname: "bar",
            email: "foobar@foo.bar",
            password: "foobar"
          }).createUser(function(err, object) {
            if(err) {
              attempts.push(false);
            } else {
              attempts.push(true);
            }
            next();
          });
        }
      },
      {
        func(next) {
          accounts({
            username: "foobar",
            firstname: "foo",
            lastname: "bar",
            email: "foobarfoo.bar",
            password: "foobar"
          }).createUser(function(err, object) {
            if(err) {
              attempts.push(false);
            } else {
              attempts.push(true);
            }
            next();
          });
        }
      },
      {
        func(next) {
          accounts({}).createUser(function(err, object) {
            if(err) {
              attempts.push(false);
            } else {
              attempts.push(true);
            }
            next();
          });
        }
      },
      {
        func(next) {
          var isValid = accounts({
            username: "foobar",
            firstname: "foo",
            lastname: "bar",
            email: "foobar@foo.bar",
            password: "foobar"
          }).validateUser();
          if(isValid === true) {
            attempts.push(true);
          } else {
            attempts.push(false);
          }
          next();
        }
      },
      {
        func(next) {
          var isValid = accounts().validateUser();
          if(isValid === true) {
            attempts.push(true);
          } else {
            attempts.push(false);
          }
          callbackDone = true;
          next();
        }
      }
    ];

    var next = callbackRouter(arr)();

    waitsFor(function() {
      return callbackDone;
    }, "callback should be done", 5000);

    runs(function() {
      expect(attempts.length).toBe(5);
      expect(attempts[0]).toBe(true);
      expect(attempts[1]).toBe(false);
      expect(attempts[2]).toBe(false);
      expect(attempts[3]).toBe(true);
      expect(attempts[4]).toBe(false);
    });
  });
});
