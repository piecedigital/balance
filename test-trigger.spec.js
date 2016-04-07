describe("Testing module:", function() {
  var Int_asyncsDone = 0;
  var Func_callbackRouter = require("./custom_modules/callback-router");

  // testing the "callback-router" module
  it("'/custom_modules/callback-router.js'", function() {
    var Int_testNumber = 0,
    String_testString;

    var arr = [
      {
        func: function(String_foo, next) {
          Int_testNumber++;
          String_testString = String_foo;
          next("foo");
        },
        Array_args: ["foo"]
      },
      {
        func: function(_, next) {
          Int_testNumber++;
          next("bar");
        },
        Array_args: ["bar"]
      },
      {
        func: function(_, next) {
          Int_testNumber++;
          next();
        }
      }
    ];

    var Func_next = Func_callbackRouter(arr);
    Func_next();
    expect(Int_testNumber).toBe(3);
    expect(typeof String_testString).toBe("string");
    expect(String_testString).toBe("foo");
  });

  // testing "mongo-queries" module
  it("'/custom_modules/mongo-queries.js'", function() {
    var Func_dbQueries = require("./custom_modules/mongo-queries"), Array_queryData, Object_queryData;
    var Array_cbArr = [
      {
        func: function(next) {
          Func_dbQueries("users", "find", {}, {}, function(Array_returnedData, quit) {
            Array_queryData = Array_returnedData;
            Int_asyncsDone++;
            next();
          });
        }
      },
      {
        func: function() {
          Func_dbQueries("users", "", {}, {}, function(Object_returnedData, quit) {
            Object_queryData = Object_returnedData;
            Int_asyncsDone++;
            quit();
          });
        }
      }
    ];
    var Func_asyncs = Func_callbackRouter(Array_cbArr);
    Func_asyncs();

     waitsFor(function() {
       return Int_asyncsDone === 2;
     }, "Async should be done", 5000);

     runs(function() {
       expect(typeof Func_dbQueries).toBe("function");
       expect(typeof Array_queryData).toBe("object");
       expect(typeof Object_queryData).toBe("object");
       expect(Array.isArray(Array_queryData)).toBe(true);
       expect(Array.isArray(Object_queryData)).toBe(false);
     });
  });
});
