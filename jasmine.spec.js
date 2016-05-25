var sh = require("shoehornjs");
require("./private/private-data")();

describe("Testing module:", function() {
  var callbackRouter = sh().Func(require("./custom_modules/callback-router"));

  // testing the "method-fill" module
  it("'/custom_modules/method-fill.js'", function() {
    require("./custom_modules/method-fill")();
    var arr = [1,2,3];
    expect(arr.includes(1)).toBe(true);
    expect(arr.includes(4)).toBe(false);
  });

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
       expect(queryArrayDataGood.length).toBe(2);
       expect(sh().trueType(queryObjectDataGood)).toBe("Object");
       // ... testing the number of keys of an object
       expect(Object.keys(queryObjectDataGood).length).toBe(10);
       // testing returned data from an unpopulated collection in the database
       expect(sh().trueType(queryArrayDataBad)).toBe("Array");
       expect(queryArrayDataBad.length).toBe(0);
       expect(sh().trueType(queryObjectDataBad)).toBe("Object");
       // ... testing the number of keys of an object
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

  // testing "finances" module
  it("'/custom_modules/finances.js'", function() {
    var finances = require("./custom_modules/finances");
    expect(sh().trueType(finances)).toBe("Function");
    expect(sh().trueType(finances("foo"))).toBe("Object");
    // expect(sh().trueType(finances())).toBe("Null");

    var financesObject = finances();

    var goodFinancesObject = financesObject.createFinancesObject("foo");
    expect(sh().trueType(goodFinancesObject)).toBe("Object");
    expect(Object.keys(goodFinancesObject).length).toBe(2);

    var badFinancesObject = financesObject.createFinancesObject();
    expect(sh().trueType(badFinancesObject)).toBe("Null");

    // testing blocks
    var goodBlock = financesObject.addNewBlock("year");
    expect(sh().trueType(goodBlock)).toBe("Object");
    expect(Object.keys(goodBlock).length).toBe(9);

    var dayBlock = financesObject.addNewBlock("day");
    delete dayBlock[""];
    expect(sh().trueType(dayBlock)).toBe("Object");
    expect(Object.keys(dayBlock).length).toBe(8);

    var badBlock = financesObject.addNewBlock();
    expect(sh().trueType(badBlock)).toBe("Null");

    // testing records
    var newRecord = financesObject.addRecord;
    expect(sh().trueType(newRecord)).toBe("Function");

    expect(sh().trueType(newRecord("bad"))).toBe("Null");
    expect(sh().trueType(newRecord())).toBe("Null");

    var goodRecord = newRecord("day");
    expect(sh().trueType(goodRecord)).toBe("Object");
    expect(Object.keys(goodRecord).length).toBe(4);

    expect(sh().trueType(goodRecord.sourceOfRevenue)).toBe("Function");
    expect(sh().trueType(goodRecord.sourceOfRevenue())).toBe("Object");

    expect(sh().trueType(goodRecord.sourceOfExpense)).toBe("Function");
    expect(sh().trueType(goodRecord.sourceOfExpense())).toBe("Object");

    expect(sh().trueType(goodRecord.exception)).toBe("Function");
    expect(sh().trueType(goodRecord.exception(1))).toBe("Int");
    expect(sh().trueType(goodRecord.exception(0))).toBe("Null");
    expect(sh().trueType(goodRecord.exception())).toBe("Null");

    expect(sh().trueType(goodRecord.sourceName)).toBe("Function");
    expect(sh().trueType(goodRecord.sourceName("My Mom"))).toBe("Object");
    expect(goodRecord.sourceName("My Mom").sourceName).toBe("My Mom");
    expect(goodRecord.sourceName("My Mom").sourceNameFlat).toBe("my_mom");
    expect(sh().trueType(goodRecord.sourceName())).toBe("Null");

    expect(sh().trueType( financesObject.addRecord() )).toBe("Null");
    expect(sh().trueType( financesObject.addRecord("bad") )).toBe("Null");
  });
});
