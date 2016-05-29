// shoehorn.js
// calculator.js
// application.js ~
(function functionName() {
  ajax({
    url: "/verify-session",
    type: "POST",
    success: function (data) {
      ajax({
        url: "/get-financial-records",
        type: "POST",
        success: function (userData) {
          startApp(userData, calculator);
        },
        error: function(data) {
          startApp(null);
          console.log(error);
        }
      });
    },
    error: function(data) {
      startApp(null);
      console.log(error);
    }
  });

  function startApp(userData, calc) {
    if(!userData) {
      // user feedback
    } else {
      // application code
    };
  };
}());
