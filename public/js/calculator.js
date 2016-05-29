// shoehorn.js
// polyfill.js
// calculator.js ~
// application.js
calculator = {
  default: function(financialData) {
    financialData = shType().Object(financialData);
    if(Object.empty(financialData)) {
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
      financialData[record].map(function(value) {
        if(returnData.grossBySource[value.sourceName.sourceNameFlat]) {
          returnData.grossBySource[value.sourceName.sourceNameFlat].money += value.money;
        } else {
          returnData.grossBySource[value.sourceName.sourceNameFlat] = {
            sourceName: value.sourceName.sourceName,
            sourceNameFlat: value.sourceName.sourceNameFlat,
            money: value.money
          };
        };
        returnData.gross += returnData.grossBySource[record.sourceName.sourceNameFlat].money;
      });
    };
    financialData.map(function(_, key) {
      calc(key);
    });
    // gross, expense, grossBySource and expenseBySource should be completed by now
    returnData.net = gross - expense;
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

if(module && module.exports) module.exports.calculator = calculator;
