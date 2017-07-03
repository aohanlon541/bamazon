var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "3037775643",
  database: "bamazon_db"
});

connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
        console.log("\nID:" + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    questions();
});

var questions = function(answer) {
    inquirer.prompt([
        {
            name: "id",
            message: "What's the ID of the product you'd like to buy?",
        },
        {
            name: "quantity",
            message: "How many units would you like?",
        }    
         ]).then(function(answer) {
            connection.query("SELECT * FROM products", [answer.id], function(err, res) {
                if (err) throw err;

                if (res[0].stock_quantity > answer.quantity) {
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                        {
                            stock_quantity: res[0].stock_quantity - answer.quantity
                        },
                        {
                            item_id: answer.id
                         }
                        ], 
                         function(err, res) {
                            if (err) throw err;
                        });
                        
                        console.log("Your Total: $" + answer.quantity * res[0].price);
                }
                else {
                    console.log("Insufficient quantity!");
                }

            });
         });
}