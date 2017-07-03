CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INT(6) NULL,
  stock_quantity INT(6) NULL,

  PRIMARY KEY (item_id)
);

