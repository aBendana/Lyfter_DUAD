SET search_path TO lyfter_ecommerce_pets;

-- DQL INVOICES QUERIES
-- select the whole table
SELECT * FROM invoices;

-- select by shipping method or payment method
SELECT id, user_id, date_placed, shipping_method 
FROM invoices WHERE shipping_method = 'Overnight';

SELECT id, user_id, date_placed, payment_method 
FROM invoices WHERE payment_method = 'Credit card';

-- select a specific invoice by id
SELECT * FROM invoices WHERE id = 10;

-- select invoices with total summary greater than 49.99
SELECT id, user_id, cart_id, invoice_total FROM invoices WHERE invoice_total > 49.99;


-- verifications about relations of users, carts and shipping address
-- with invoices table are in users, shipping adress and carts _DQLs.sql

-- verifications that show if is missing an user, cart or shipping address
-- with users
SELECT Users.id, Users.name, Invoc.id, date_placed
FROM users as Users 
RIGHT JOIN invoices as Invoc 
ON Users.id = Invoc.user_id
WHERE Users.id IS NULL;

-- with carts
SELECT Cart.id Cart_ID, Invoc.id Invoice_ID, Cart.status, Invoc.date_placed
FROM carts as Cart 
RIGHT JOIN invoices as Invoc 
ON Cart.id = Invoc.cart_id
WHERE Cart.id is NULL;

-- with shipping address
SELECT Ship.id Address_Id, Invoc.id Invoice_Id, Invoc. shipping_method, Ship.postal_code
FROM shipping_address as Ship 
RIGHT JOIN invoices as Invoc
ON Ship.id = Invoc.shipping_address_id
WHERE Ship.id IS NULL;


-- relation with invoice_details
-- all invoices with details
SELECT InDeta.invoice_id, Invc.user_id, Invc.cart_id, InDeta.product_id, InDeta.quantity, InDeta.item_total
FROM invoices as Invc 
INNER JOIN invoice_details as InDeta 
ON Invc.id = InDeta.invoice_id;

-- a specific invoice with it details
SELECT InDeta.invoice_id, Invc.user_id, Invc.cart_id, InDeta.product_id, InDeta.quantity, InDeta.item_total
FROM invoices as Invc 
INNER JOIN invoice_details as InDeta 
ON Invc.id = InDeta.invoice_id
WHERE Invc.id = 1;

-- invoices with no details
SELECT Invc.id, InDeta.invoice_id, Invc.user_id, Invc.cart_id, InDeta.product_id
FROM invoices as Invc 
LEFT JOIN invoice_details as InDeta 
ON Invc.id = InDeta.invoice_id
WHERE InDeta.invoice_id IS NULL;