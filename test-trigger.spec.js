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
});
