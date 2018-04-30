var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    pickaProduct();
});

function pickaProduct() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArrary = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArrary.push(results[i].product_name);
                        }
                        return choiceArrary;
                    },
                    message: "What product would you like to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like?"
                }
            ])
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                //determine is quantity exists
            if(chosenItem.stock_quantity >= parseInt(answer.quantity)){
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                [
                    {//HOW TO SUBTRACT 
                        stock_quantity:chosenItem.stock_quantity-parseInt(answer.quantity)
                    },
                    {
                        id:chosenItem.id
                    }
                ],
                function(error){
                    if(error) throw err;
                    console.log("item has been selected, thank you for your order.");
                    pickaProduct();
                }    
                );
            }
            else{
                console.log("sorry we are out of those, please choose another product.");
                pickaProduct();
            }

            });
    });
}