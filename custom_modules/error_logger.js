var fs = require("fs"),
path = require("path");

module.exports = function(file, okayLogFile, errorLogFile) {
  if(!file || !okayLogFile || !errorLogFile) throw new Error("!!! Log file paths required");
  return {
    ok(message) {
      writeLog(message, file, okayLogFile)
    },
    error(message) {
      writeLog(message, file, errorLogFile);
    }
  };
};

function writeLog(message, file, filePath) {
  var data = `[Date=${new Date()}; File=${file};] ${message}\n\r`;
  fs.appendFile(path.join(__dirname, filePath), data, function(err) {
    if(err) console.error(new Error(err).stack);
  });
};
