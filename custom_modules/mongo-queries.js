var MongoClient  = require("mongodb"),
  ObjectId = MongoClient.ObjectID,
  sh = require("shoehornjs");

var db;

// [avoid] - this is here ONLY for unit testing.
var quit = function() {
  db.close();
};

MongoClient.connect(process.env["MLAB_URL"]
, function(err, data) {
  if(err) throw err;

  db = data;
  console.log("'mongo-queries' set.\n");
});

module.exports = function(collectionName, operation, queryObject, updateObject, userCallback) {
  collectionName = sh().String(collectionName),
  operation = sh().String(operation),
  queryObject = sh().Object(queryObject),
  updateObject = sh().Object(updateObject),
  userCallback = sh().Func(userCallback);
  // wait for db to be set
  setTimeout(function() {
    operations = {
      find: function() {
        db.collection(collectionName)[operation](queryObject, updateObject).toArray(function(err, queryData) {
          if(err) console.error(err);

          if(typeof userCallback === "function") {
            userCallback(err, queryData, quit);
          }
        });
      },
      default: function() {
        db.collection(collectionName)[operation || "findOne"](queryObject, updateObject, function(err, queryData) {
          if(err) console.error(err);

          if(typeof userCallback === "function") {
            userCallback(err, queryData, quit);
          }
        });
      }
    };
    // console.log("run")

    // call the function in the operations object, or the default function for undefined operations
    if(operations.hasOwnProperty(operation)) {
      operations[operation]();
    } else {
      operations.default();
    };
  }, 100);
};
console.log("mongo-queries.js mounted\n");
