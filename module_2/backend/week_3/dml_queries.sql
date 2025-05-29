
-- DML queries

--Products
INSERT INTO products (code, name, price, brand) VALUES ('LG23520485AP','OLED 55 C3', 100000.00,'LG');
INSERT INTO products (code, name, price, brand) VALUES ('LG24520481AP','OLED 65 C4', 180000.00,'LG');
INSERT INTO products (code, name, price, brand) VALUES ('SM23520485AP','Galaxy Tab S8', 150000.00,'Samsung');
INSERT INTO products (code, name, price, brand) VALUES ('AP23520485AP','iPhone 14 Pro', 240000.00,'Apple');
INSERT INTO products (code, name, price, brand) VALUES ('DE23520485AP','XPS 13 Laptop', 220000.00,'Dell');
INSERT INTO products (code, name, price, brand) VALUES ('HP23520485AP','Spectre x360', 180000.00,'HP');
INSERT INTO products (code, name, price, brand) VALUES ('AS23520485AP','ROG Strix G15', 199900.00,'Asus');
INSERT INTO products (code, name, price, brand) VALUES ('MS23520485AP','Surface Pro 9', 210000.00,'Microsoft');
INSERT INTO products (code, name, price, brand) VALUES ('LV23520485AP','ThinkPad X1', 175000.00,'Lenovo');
INSERT INTO products (code, name, price, brand) VALUES ('AC23520485AP','Aspire 7', 120000.00,'Acer');
INSERT INTO products (code, name, price, brand) VALUES ('HU23520485AP','MateBook X', 160000.00,'Huawei');
INSERT INTO products (code, name, price, brand) VALUES ('MT23520485AP','Pixel 7 Pro', 135000.00,'Google');
INSERT INTO products (code, name, price, brand) VALUES ('JB23520485AP','Charge 5 Speaker', 115000.00,'JBL');
INSERT INTO products (code, name, price, brand) VALUES ('SN23520485AP','WH-1000XM5', 130000.00,'Sony');
INSERT INTO products (code, name, price, brand) VALUES ('NK23520485AP','Smartwatch G2', 95000.00,'Nokia');


--Invoices
INSERT INTO invoices (invoice_number, buyer_email, invoice_total)
    VALUES (2001, 'martin.alvarez@gmail.com', 315000.00);

INSERT INTO invoices (invoice_number, buyer_email, invoice_total, phone_number, retail_cashier_code)
    VALUES (2002, 'viviana.rojas@yahoo.com', 350500.00, '7111-2233', 'B0002');

INSERT INTO invoices (invoice_number, buyer_email, invoice_total, phone_number, retail_cashier_code)
    VALUES (2003, 'julio.castro@outlook.com', 420000.00, '7222-3344', 'A0003');

INSERT INTO invoices (invoice_number, buyer_email, invoice_total, phone_number, retail_cashier_code)
    VALUES (2004, 'paola.mendez@hotmail.com', 399999.99, '7333-4455', 'B0002');

INSERT INTO invoices (invoice_number, buyer_email, invoice_total, phone_number, retail_cashier_code)
    VALUES (2005, 'ricardo.brenes@gmail.com', 500000.00, '7444-5566', 'C0005');

INSERT INTO invoices (invoice_number, buyer_email, invoice_total, phone_number, retail_cashier_code)
    VALUES (2006, 'julio.castro@outlook.com', 385750.00, '7222-3344', 'A0006');

INSERT INTO invoices (invoice_number, buyer_email, invoice_total, phone_number, retail_cashier_code)
    VALUES (2007, 'andres.mora@outlook.com', 365000.00, '7666-7788', 'B0002');

INSERT INTO invoices (invoice_number, buyer_email, invoice_total, phone_number, retail_cashier_code)        
    VALUES (2008, 'julio.castro@outlook.com', 310000.00, '7222-3344', 'C0005');


-- Invoices Details
-- Invoice 1: buys 1 unit of product 2 (OLED 65 C4 - 180000.00)
INSERT INTO invoice_details (invoice_id, product_id, quantity, items_total)
VALUES (1, 2, 1, 180000.00);

-- Invoice 1: buys 1 unit of product 1 (OLED 55 C3 - 100000.00)
INSERT INTO invoice_details (invoice_id, product_id, quantity, items_total)
VALUES (1, 1, 1, 100000.00);

-- Invoice 2: buys 2 units of product 3 (Galaxy Tab S8 - 150000.00)
INSERT INTO invoice_details (invoice_id, product_id, quantity, items_total)
VALUES (2, 3, 2, 300000.00);

-- Invoice 3: buys 1 unit of product 4 (iPhone 14 Pro - 240000.00)
INSERT INTO invoice_details (invoice_id, product_id, quantity, items_total)
VALUES (3, 4, 1, 240000.00);

-- Invoice 3: buys 1 unit of product 5 (XPS 13 Laptop - 220000.00)
INSERT INTO invoice_details (invoice_id, product_id, quantity, items_total)
VALUES (3, 5, 1, 220000.00);

-- Invoice 4: buys 2 units of product 14 (WH-1000XM5 - 130000.00)
INSERT INTO invoice_details (invoice_id, product_id, quantity, items_total)
VALUES (4, 14, 2, 260000.00);

-- Invoice 5: buys 1 unit of product 6 (Spectre x360 - 180000.00)
INSERT INTO invoice_details (invoice_id, product_id, quantity, items_total)
VALUES (5, 6, 1, 180000.00);

-- Invoice 5: buys 2 units of product 7 (ROG Strix G15 - 199900.00)
INSERT INTO invoice_details (invoice_id, product_id, quantity, items_total)
VALUES (5, 7, 2, 399800.00);

-- Invoice 6: buys 1 unit of product 8 (Surface Pro 9 - 210000.00)
INSERT INTO invoice_details (invoice_id, product_id, quantity, items_total)
VALUES (6, 8, 1, 210000.00);

-- Invoice 7: buys 1 unit of product 9 (ThinkPad X1 - 175000.00)
INSERT INTO invoice_details (invoice_id, product_id, quantity, items_total)
VALUES (7, 9, 1, 175000.00);

-- Invoice 8: buys 2 units of product 15 (Smartwatch G2 - 95000.00)
INSERT INTO invoice_details (invoice_id, product_id, quantity, items_total)
VALUES (8, 15, 2, 190000.00);

-- Invoice 8: buys 1 unit of product 12 (Pixel 7 Pro - 135000.00)
INSERT INTO invoice_details (invoice_id, product_id, quantity, items_total)
VALUES (8, 12, 1, 135000.00);


-- Carts
INSERT INTO cart (buyer_email) VALUES ('martin.alvarez@gmail.com');
INSERT INTO cart (buyer_email) VALUES ('viviana.rojas@yahoo.com');
INSERT INTO cart (buyer_email) VALUES ('julio.castro@outlook.com');
INSERT INTO cart (buyer_email) VALUES ('paola.mendez@hotmail.com');
INSERT INTO cart (buyer_email) VALUES ('ricardo.brenes@gmail.com');
INSERT INTO cart (buyer_email) VALUES ('andres.mora@outlook.com');


-- Products in cart
-- **Important: only one cart by buyer can exist at the time** --
-- Cart 1 - martin.alvarez@gmail.com - Invoice 1
INSERT INTO products_in_cart (cart_id, product_id, quantity) VALUES (1, 2, 1); -- OLED 65 C4
INSERT INTO products_in_cart (cart_id, product_id, quantity) VALUES (1, 1, 1); -- OLED 55 C3

-- Cart 2 - viviana.rojas@yahoo.com - Invoice 2
INSERT INTO products_in_cart (cart_id, product_id, quantity) VALUES (2, 3, 2); -- Galaxy Tab S8

-- Cart 3 - julio.castro@outlook.com - Invoice 3 (only one invoice chosen)
INSERT INTO products_in_cart (cart_id, product_id, quantity) VALUES (3, 4, 1); -- iPhone 14 Pro
INSERT INTO products_in_cart (cart_id, product_id, quantity) VALUES (3, 5, 1); -- XPS 13 Laptop

-- Cart 4 - paola.mendez@hotmail.com - Invoice 4
INSERT INTO products_in_cart (cart_id, product_id, quantity) VALUES (4, 14, 2); -- WH-1000XM5

-- Cart 5 - ricardo.brenes@gmail.com - Invoice 5
INSERT INTO products_in_cart (cart_id, product_id, quantity) VALUES (5, 6, 1); -- Spectre x360
INSERT INTO products_in_cart (cart_id, product_id, quantity) VALUES (5, 7, 2); -- ROG Strix G15

-- Cart 6 - andres.mora@outlook.com - Invoice 7
INSERT INTO products_in_cart (cart_id, product_id, quantity) VALUES (6, 9, 1); -- ThinkPad X1
