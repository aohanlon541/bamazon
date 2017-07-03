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


var questions = function(answer) {
    inquirer.prompt([{
        type: "list",
        name: "managerMenu",
        message: "Please select an option below",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function(answer) {
        if (answer.managerMenu === "View Products for Sale") {
            connection.query("SELECT * FROM products", function(err, res) {
                console.log("-----------------------------------");
                for (var i = 0; i < res.length; i++) {
                    console.log("\nID:" + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
                }
                console.log("-----------------------------------");
                questions();
            });
        }
        if (answer.managerMenu === "View Low Inventory") {
            connection.query("SELECT * FROM products WHERE stock_quantity<= 5", function(err, res) {
                console.log("-----------------------------------");
                if (res.length > 0) {
                    for (var i = 0; i < res.length; i++) {
                        console.log("\nID:" + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
                    }
                } else {
                    console.log("There is no low inventory");
                }
                console.log("-----------------------------------");
                questions();
            });
        }
        if (answer.managerMenu === "Add to Inventory") {
            var addInventoryQuestions = function(answer) {
                inquirer.prompt([{
                        name: "restockID",
                        message: "What's the ID of the product you'd like to restock?",
                    },
                    {
                        name: "restockQuantity",
                        message: "How many units would you like to add",
                    }
                ]).then(function(answer) {
                    connection.query("SELECT * FROM products", [answer.restockID], function(err, res) {
                        if (err) throw err;

                        connection.query("UPDATE products SET ? WHERE ?", [{
                                    stock_quantity: res[0].stock_quantity + answer.restockQuantity
                                },
                                {
                                    item_id: answer.restockID
                                }
                            ],
                            function(err, res) {
                                if (err) throw err;

                            });
                        console.log("Inventory Added!");
                        console.log("\nID:" + res[0].item_id + " | " + res[0].product_name + " | " + res[0].department_name + " | $" + res[0].price + " | " + res[0].stock_quantity);
                        questions();
                    });
                });
            }

            addInventoryQuestions();

        }


    });
}

questions();