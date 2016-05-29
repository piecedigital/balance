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
      expenseBySource: {},
      netBySource: {}
    };

    var calc = function(record) {
      financialData[record].map(function(record) {
        if(returnData.grossBySource[record.sourceName.sourceNameFlat]) {
          returnData.grossBySource[record.sourceName.sourceNameFlat].money += record.money;
        } else {
          returnData.grossBySource[record.sourceName.sourceNameFlat] = {
            sourceName: record.sourceName.sourceName,
            sourceNameFlat: record.sourceName.sourceNameFlat,
            money: record.money,
            date: record.date
          };
        };
        returnData.gross += returnData.grossBySource[record.sourceName.sourceNameFlat].money;
      });
    };
    financialData.map(function(_, key) {
      calc(key);
    });
    // gross, expense, grossBySource and expenseBySource should be completed by now
  }
};

if(module && module.exports) module.exports.calculator = calculator;
