var Object_MongoClient  = require("mongodb"),
  Func_ObjectId = Object_MongoClient.ObjectID;

var Object_db;

// [avoid] - this is here ONLY for unit testing.
var quit = function() {
  Object_db.close();
};

module.exports = function(String_collectionName, String_operation, Object_queryObject, Object_updateObject, Func_userCallback) {
  // wait for Object_db to be set
  setTimeout(function() {
    Object_operations = {
      find: function() {
        Object_db.collection(String_collectionName)[String_operation](Object_queryObject, Object_updateObject).toArray(function(err, Array_queryData) {
          if(err) console.error(err);

          if(typeof Func_userCallback === "function") {
            Func_userCallback(Array_queryData || [], quit);
          }
        });
      },
      default: function() {
        Object_db.collection(String_collectionName)[String_operation || "findOne"](Object_queryObject, Object_updateObject, function(err, Object_queryData) {
          if(err) console.error(err);

          if(typeof Func_userCallback === "function") {
            Func_userCallback(Object_queryData || {}, quit);
          }
        });
      }
    };
    // console.log("run")

    // call the function in the operations object, or the default function for undefined operations
    if(Object_operations.hasOwnProperty(String_operation)) {
      Object_operations[String_operation]();
    } else {
      Object_operations.default();
    };
  }, 100);
};

require("../private/private-data")();
Object_MongoClient.connect(process.env["MLAB_URL"]
, function(err, data) {
  if(err) throw err;

  Object_db = data;
  console.log("'mongo-queries' set.\n");
});
