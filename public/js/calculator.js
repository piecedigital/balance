// shoehorn.js
// polyfill.js
// calculator.js ~
// application.js
if(typeof require === "function"){
  var shoehorn = require("shoehornjs");
  require("./polyfill");
};
var sh = shoehorn;

calculator = {
  calculateRecords(blockRecords) {
    blockRecords = shoehorn().Object(blockRecords);
    if(Object.empty(blockRecords)) {
      return console.error(new Error("No proper financial data structure provided").stack);
    };
    var returnData = {
      gross: 0,
      expense: 0,
      net: 0,
      grossBySource: {},
      expenseBySource: {}//,
      // netBySource: {}
    };

    var calc = function(record) {
      blockRecords[record].map(function(value) {
        var sourcePlacement = record === "expense" ? "expenseBySource" : "grossBySource",
          flatPlacement = record === "expense" ? "expense" : "gross";
        // console.log("value", value.sourceName.sourceNameFlat);
        // return;
        if(returnData[sourcePlacement][value.sourceName.sourceNameFlat]) {
          returnData[sourcePlacement][value.sourceName.sourceNameFlat].money += value.money;
        } else {
          returnData[sourcePlacement][value.sourceName.sourceNameFlat] = {
            sourceName: value.sourceName.sourceName,
            sourceNameFlat: value.sourceName.sourceNameFlat,
            money: value.money
          };
        };
        returnData[flatPlacement] += returnData[sourcePlacement][value.sourceName.sourceNameFlat].money;
      });
    };
    blockRecords.map(function(_, key) {
      calc(key);
    });
    // gross, expense, grossBySource and expenseBySource should be completed by now
    returnData.net = returnData.gross - returnData.expense;
    // gross, expense, net, grossBySource and expenseBySource should be completed by now

    // grossBySource.map(function(value, key) {
    //   returnData.netBySource[value.sourceName.sourceNameFlat] = {
    //     sourceName: value.sourceName.sourceName,
    //     sourceNameFlat: value.sourceName.sourceNameFlat,
    //     money: value.money * (value.money * returnData.gross)
    //   };
    // });
    return returnData;
  }
};

if(module && module.exports) module.exports = calculator;
