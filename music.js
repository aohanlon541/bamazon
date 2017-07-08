var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "3037775643",
    database: "topsongs"
});

connection.query("SELECT * FROM songs", function(err, res) {
    for (var i = 0; i < 3; i++) {
        console.log("\nID:" + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity + " | " + res[i].product_sales);
    }
    console.log("-----------------------------------");
});