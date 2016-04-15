var sh = require("shoehornjs");

module.exports = function(userAccountId) {
  userAccountId = sh().String( userAccountId.toString() );
  return {
    createFinancesRecord() {
      return {
        userAccountId,
        "moneyManagement": {
          "years": [

          ]
        }
      }
    },
    addNewBlock(blockName) {
      blockName = sh().String(blockName).toLowerCase();
      // cancel the rest of the script if 'blockName' === "day"
      // there are no lower blocks
      if(blockName === "day") return null;
      var allBlocks = ["year", "month", "day"],
      // cancel the rest of this script if the return value from 'index' is < 0
      var index = allBlocks.indexOf(blockName);
      if(index < 0) {
        console.error(new Error("Invalid block name:", blockName))
        return null;
      };
      return {
        blockName,
        "override": null,
        "overrideRecords": {
          "totalRevenue": 0,
          "totalEspenses": 0
        },
        "sourcesOfRevenue": [],
        "revenueExceptions": [],
        "sourcesOfExpenses": [],
        "expenseExceptions": [],
        "sourceNames": [],
        [blockName !== "day" ? blockName : ""]: blockName !== "day" ? [] : undefined
      }
    },
    addRecord(name) {
      name = sh().String(name).toLowerCase;
      return {
        sourceOfRevenue() {
          return {
            "sourceName": String,
            // uppercase the first letter of 'name
            [`revenuePer${name.replace(/^./, name[0].toUpperCase() )}`]: Number,
            "taxPercentage": Number,
          }
        },
        sourceOfExpense() {
          return {
            "sourceName": String,
            // uppercase the first letter of 'name
            [`expensePer${name.replace(/^./, name[0].toUpperCase() )}`]: Number,
          }
        },
        exception(date) {
          return sh().Int(date)
        },
        sourceName() {
          return {
            "sourceName": name,
            // lowecase 'name' and replace spaces with an underscore
            "sourceNameFlat": name.toLowerCase().replace(/[\s]{1,}/g, "_")
          };
        }
      };
    }
  };
};
