
-- DDL queries

CREATE TABLE products (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(20) UNIQUE NOT NULL,
	name VARCHAR(25) UNIQUE NOT NULL,
	price FLOAT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    brand VARCHAR(20) NOT NULL
);


CREATE TABLE invoices (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number INT UNIQUE NOT NULL,
	purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	buyer_email VARCHAR(30) NOT NULL,
    invoice_total FLOAT NOT NULL
);


CREATE TABLE invoice_details(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	invoice_id INT REFERENCES invoices (id),
	product_id INT REFERENCES products(id),
    quantity SMALLINT NOT NULL,
	items_total FLOAT NOT NULL
);


CREATE TABLE cart(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	buyer_email VARCHAR(30) NOT NULL
);


CREATE TABLE products_in_cart(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	cart_id INT REFERENCES cart (id),
	product_id INT REFERENCES products(id),
    quantity SMALLINT NOT NULL
);


-- invoice´s new columns
ALTER TABLE invoices
	ADD phone_number CHAR(9) NOT NULL DEFAULT "8000-8000"; -- phone number format: 8888-0000;
--  ADD phone_number CHAR(9); -- we can add the column without restricctions if the phone 
--  number info were not relevant

ALTER TABLE invoices
	ADD retail_cashier_code CHAR(5) NOT NULL DEFAULT "A0001"; -- cashier format code: A1234;