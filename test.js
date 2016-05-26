// var MongoClient  = require("mongodb"),
//   ObjectId = MongoClient.ObjectID;
//
// MongoClient.connect("mongodb://localhost:27017/guidechat"
// , function(err, db) {
//   if(err) throw err;
//
//   db.collection("users").findOne({}, function(err, data) {
//     if(err) throw err;
//
//     console.log(JSON.stringify(data._id));
//     db.collection("users").findOne({_id: new ObjectId(data._id.toString()) }, function(err, data) {
//       if(err) throw err;
//
//       console.log(data);
//       db.close();
//     });
//   });
// });

// var MongoClient  = require("mongodb"),
//   ObjectId = MongoClient.ObjectID,
//   accounts = require("./custom_modules/accounts");
//
// MongoClient.connect("mongodb://localhost:27017/cashulator"
// , function(err, db) {
//   if(err) throw err;
//   accounts({
//     username: "foobarr",
//     firstname: "fooo",
//     lastname: "barr",
//     email: "foobar2@foo2.bar",
//     password: "foobar2"
//   }).createUser(function(err, object) {
//     if(err) {
//       db.close();
//     } else {
//       db.collection("test_users_success").insert(object, function(err, data) {
//         if(err) throw err;
//         console.log(data);
//         db.close();
//       });
//     }
//   });
// });

var logger = require("./custom_modules/error_logger");

var makeLog = logger(__dirname + "/test.js", "logs/logs.txt", "logs/errors.txt");

makeLog.ok("Test");
makeLog.error("Test");

// console.log(global)
