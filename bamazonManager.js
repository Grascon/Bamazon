//dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
//connecting to database
var conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
})

conn.connect(function(err){
    if (err) {
        throw err;
    }
    console.log("\nWelcome to Bamazon Manager");
    console.log("--------------------------");
    openBamazonManager();
    
});

function openBamazonManager(){
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ] 
        }     
    ])
    .then(function(data){
        switch (data.options){
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            case "Exit":
                console.log("Thank you, come again")
                conn.end();
        };
    });
}

function viewProducts(){
    console.log("\nInventory");
    console.log("---------");
    conn.query("SELECT * FROM products", function (err, data){
        if (err) throw err;
        for (var i = 0; i <data.length; i++){
            console.log("I.D: "+ data[i].item_id + " | Product Name: " + data[i].product_name + " | Price: $" + data[i].price + " | Amount Left: " + data[i].stock_quantity);
        }
        console.log("--------------------------");
        conn.end();
    })
}

function viewLowInventory(){
    console.log("\nLow Inventory");
    console.log("If there are products with less than 5 in stock, they will be displayed below: ");
    conn.query("SELECT * FROM products", function (err, data){
        for (var i = 0; i <data.length; i++){
            if (data[i].stock_quantity < 5){
                console.log("\nI.D: "+ data[i].item_id + " | Product Name: " + data[i].product_name + " | Price: $" + data[i].price + " | Amount Left: " + data[i].stock_quantity);
            }
        }
        console.log("--------------------------");
        conn.end();
    });
}

function addToInventory (){
    conn.query("SELECT * FROM products", function (err, data){
        if (err) throw err;
        for (var i = 0; i <data.length; i++){
            console.log("I.D: "+ data[i].item_id + " | Product Name: " + data[i].product_name + " | Price: $" + data[i].price + " | Amount Left: " + data[i].stock_quantity);
        }
        inquirer.prompt([
            {
                type: "input",
                name: "product",
                message: "Please enter the I.D of the item you would like to add to."
            },
            {
                type: "input",
                name: "quantity",
                message: "Please enter the amount you would like to add"
            }
        ]).then (function(results){
            //checking current inventory
            conn.query("SELECT * FROM products WHERE ?",{item_id: results.product}, function(err, res){
                //setting variables with values from database
                var productChosen = res[0].product_name;
                var amountleft = res[0].stock_quantity;
                var added = parseInt(results.quantity);
                //determining if at least 1 is being added
                if (added >= 1){
                //setting variables of new amount after adding that will be used to update database
                    var newStockQuantity = amountleft + added;
                    //console.log(newStockQuantity);
                    
                    conn.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newStockQuantity
                            },
                            {
                            item_id: results.product
                            }
                        ],
                        function(err, res){
                            console.log("\nYou added " + added + " to the " + productChosen + " stock");
                        }
                    );
                }
                else {
                    console.log("\nSorry, you need to add at least 1 to the " + productChosen + " stock");
                }
                console.log("--------------------------");
                conn.end();
            });
            
        });
    })
}