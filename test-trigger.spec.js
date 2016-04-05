describe("Testing my entire goddamn app to make sure it works,", function() {
  it("starting with '/custom_modules/callback-router.js'", function() {
    var Func_callbackRouter = require("./custom_modules/callback-router");
    var Int_testNumber = 0,
      String_testString;

    var arr = [
      {
        func: function(String_foo, next) {
          console.log(arguments);
          Int_testNumber++;
          String_testString = String_foo;
          next("foo");
        },
        Array_args: ["foo"]
      },
      {
        func: function(_, next) {
          console.log(arguments);
          Int_testNumber++;
          next("bar");
        },
        Array_args: ["bar"]
      },
      {
        func: function(_, next) {
          console.log(arguments);
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
});
