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
  PRIMARY KEY (department_id),
);

ALTER TABLE products
ADD COLUMN product_sales INT(7) NULL;

ALTER TABLE departments
ADD COLUMN product_sales INT(7) NULL;
ADD COLUMN total_profit INT(7) NULL;

ALTER TABLE departments
ADD UNIQUE (department_name);

CREATE TABLE deparment_final AS 
  (SELECT department_join.*, 
	(product_sales - over_head_costs) as final_profit
   FROM   department_join 
);

RENAME TABLE deparment_final TO department_final
