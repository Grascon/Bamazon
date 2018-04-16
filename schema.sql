DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price FLOAT (10, 2),
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Watch", "Jewelry", 100, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 600, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", 5, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hats", "Clothing", 10, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirts", "Clothing", 10, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Television", "Electronics", 150, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keyboard", "Electronics", 10, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothing", 25, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cookies", "Food", 1, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "Clothing", 75, 75);