var sh = require("shoehornjs");
require("./method-fill")();

module.exports = function() {
  // all of the available blocks
  var allBlocks = ["year", "month", "day"];

  return {
    createFinancesObject(userAccountId) {
      userAccountId = sh().String( userAccountId ? userAccountId.toString() : "" );
      // return early if there is no string data in 'userAccountId'
      if(!userAccountId) return null;
      return {
        userAccountId,
        "moneyManagement": {
          "years": []
        }
      }
    },
    addNewBlock(blockName) {
      blockName = sh().String(blockName).toLowerCase();
      // cancel the rest of this script if the return value from 'index' is < 0

      if(!allBlocks.includes(blockName)) {
        console.error(new Error(`Invalid block name: ${blockName}`).stack)
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
        // this will either create the next block or make a blank
        [blockName !== "day" ? blockName : ""]: blockName !== "day" ? [] : undefined
      }
    },
    addRecord(blockName) {
      blockName = sh().String(blockName).toLowerCase();
      if(!blockName || !allBlocks.includes(blockName)) {
        console.error(new Error(`Invalid block blockName: ${blockName}`).stack);
        return null;
      };
      return {
        sourceOfRevenue() {
          return {
            "sourceName": String,
            // uppercase the first letter of 'blockName'
            [`revenuePer${blockName.replace(/^./, blockName[0].toUpperCase() )}`]: Number,
            "taxPercentage": Number,
          }
        },
        sourceOfExpense() {
          return {
            "sourceName": String,
            // uppercase the first letter of 'blockName'
            [`expensePer${blockName.replace(/^./, blockName[0].toUpperCase() )}`]: Number,
          }
        },
        exception(date) {
          date = sh().Int(date);
          if(!date) return null;
          return date;
        },
        sourceName(sourceName) {
          sourceName = sh().String(sourceName);
          if(!sourceName) return null;
          return {
            sourceName,
            // lowecase 'sourceName' and replace spaces with an underscore
            "sourceNameFlat": sourceName.toLowerCase().replace(/[\s]{1,}/g, "_")
          };
        }
      };
    }
  };
};
