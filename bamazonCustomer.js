var inquirer = require("inquirer");
var mysql = require("mysql");
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
    openBamazon();
});
function openBamazon (){
    console.log("Welcome to Bamazon! Check out our products");
    conn.query("SELECT * FROM products", function (err, data){
        if (err) throw err;
        for (var i = 0; i <data.length; i++){
            console.log("I.D: "+ data[i].item_id + " | Product Name: " +
            data[i].product_name + " | Price: $" + data[i].price + " | Amount Left: " + data[i].stock_quantity);
        }
        buy();
    })
}

function buy (){
    inquirer.prompt([
        {
            type: "input",
            name: "product",
            message: "Please enter the I.D of the item you would like to purchase"
        },
        {
            type: "input",
            name: "quantity",
            message: "Please enter the amount of the item you would like to purchase"
        }
    ]).then (function(results){
        //checking current inventory
        conn.query("SELECT * FROM products WHERE ?",{item_id: results.product}, function(err, res){
            //setting variables with values from database
            var productChosen = res[0].product_name;
            var productChosenPrice = res[0].price;
            var amountleft = res[0].stock_quantity;
            var requested = results.quantity;
            //determining if purchase is possible
            if (amountleft >= results.quantity){
            //setting variables of new amount left that will be used to update database after purchase
                var newStockQuantity = amountleft - requested;
                //console.log(newStockQuantity);
                var totalPrice = productChosenPrice * requested;
                
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
                        console.log("\nPurchase complete! Your total is $" + totalPrice);
                        console.log("Order Summary \nProduct Selected: " + productChosen + "\n$" + productChosenPrice + " x" + requested + " = $" + totalPrice);
                        console.log("Please come again soon!");   
                    }
                );
            }
            else {
                console.log("\nSorry, we cannot process this order at this time");
                console.log("We don't have " + requested + " of " + productChosen + " at this time.")
                console.log("Please come again soon");
            }
            conn.end();
        });
    });
}