var sh = require("shoehornjs");

module.exports = function(userAccountId) {
  userAccountId = sh().String( userAccountId.toString() );
  return {
    createFinancesRecord() {
      return {
        userAccountId,
        "sourceNames": [],
        "moneyManagement": {
          "year": Number,
          "sourcesOfRevenue": [],
          "sourcesOfExpenses": [],
          "months": []
        }
      }
    }
  };
};
