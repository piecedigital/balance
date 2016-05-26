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
        [blockName !== "day" ? `${allBlocks[allBlocks.indexOf(blockName)+1]}s` : ""]: blockName !== "day" ? [] : undefined
      }
    },
    addRecord(blockName) {
      blockName = sh().String(blockName).toLowerCase();
      if(!blockName || !allBlocks.includes(blockName)) {
        console.error(new Error(`Invalid block blockName: ${blockName}`).stack);
        return null;
      };
      return {
        create(type, money, otherData) {
          type = sh().String(type);
          money = sh().Float( parseFloat( sh().String(money) ) );
          otherData = sh().Object(otherData);

          if(!money || !type) {
            console.error(new Error("No type or money value provided").stack);
            return null;
          }
          if(Object.empty(otherData)) {
            console.error(new Error("No data provided in `otherData` argument").stack);
            return null;
          };

          var sourceName = sh().Object(this.sourceName(otherData.sourceName));
          var date = sh().Int(this.createDate(otherData.year, otherData.month, otherData.day));

          if(!date || !sourceName) return null;
          if(type !== "expense" && type !== "revenue") {
            console.error(new Error("Record type is not allowed").stack);
            return null;
          };

          return {
            sourceName,
            // uppercase the first letter of 'blockName'
            [`${type}Per${blockName.replace(/^./, blockName[0].toUpperCase() )}`]: money,
            date
          }
        },
        createDate(year, month, day) {
          year = sh().String(parseInt(year).toString());
          month = sh().String(parseInt(month).toString());
          day = sh().String(parseInt(day).toString());
          if(!year || !month || !day) {
            console.error(new Error("Date information evaluating to false").stack);
            return null;
          };
          if(year.length !== 4 || month.length > 2 || day.length > 2) {
            console.error(new Error(`Incorrect date information: Year: ${year}, Month: ${month}, Day: ${day}`).stack)
            return null;
          };
          return new Date(year, month, day, 0, 0, 0, 0).getTime();
        },
        sourceName(sourceName) {
          sourceName = sh().String(sourceName);
          if(!sourceName) return null;
          if(!sourceName.match(/^[a-z\s]+$/i)) {
            console.error(new Error("Source name should only contain letters and spaces").stack);
            return null;
          };
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
