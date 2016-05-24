var app = require("express")(),
  accounts = require("./accounts"),
  dbQuery = require("./mongo-queries");

app
.get("/signup", function(req, res) {

})
.post("/signup", function(req, res) {

});

module.exports = app;
console.log("csrf-routes.js mounted\n");
