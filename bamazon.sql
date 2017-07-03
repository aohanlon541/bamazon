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

CREATE TABLE departments ( 
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  over_head_costs INT(7) NULL,
  
  PRIMARY KEY (department_id)
);