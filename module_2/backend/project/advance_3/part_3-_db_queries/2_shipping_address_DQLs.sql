SET search_path TO lyfter_ecommerce_pets;

-- DQL SHIPPING ADDRESS QUERIES
-- select the whole table
SELECT * FROM shipping_address;

-- select only ids, canton, province, postal_code
SELECT province, canton FROM shipping_address
ORDER BY province, canton ASC;

-- select a specific address by id
SELECT id, user_id, province, canton, address, postal_code 
FROM shipping_address WHERE id = 10;


-- relation with users
-- all users with their respective addresses
SELECT Users.id, Users.name, Shipping.address
FROM users as Users 
INNER JOIN shipping_address as Shipping 
ON Users.id = Shipping.user_id;

-- a specific address relate to an user
SELECT  Users.id User, Shipping.id Shipping, Users.name, Shipping.address
FROM users as Users 
INNER JOIN shipping_address as Shipping 
ON Users.id = Shipping.user_id
WHERE Shipping.id = 2;

-- verifying all addresses are not related to an user
SELECT Shipping.id, Users.id, Users.name, Shipping.address
FROM users as Users 
RIGHT JOIN shipping_address as Shipping 
ON Users.id = Shipping.user_id
WHERE Users.id IS NULL;


-- relation with invoices
-- all shipping addresses that are in an invoice
SELECT Invoc.user_id User_Id, Invoc.id Invoice_Id, Ship.id Address_Id, Ship.postal_code, Invoc.date_placed
FROM shipping_address as Ship 
INNER JOIN invoices as Invoc
ON Ship.id = Invoc.shipping_address_id

-- a specific address in different invoices
SELECT Invoc.user_id User_Id, Invoc.id Invoice_Id, Ship.id Address_Id, Ship.postal_code, Invoc.date_placed
FROM shipping_address as Ship 
INNER JOIN invoices as Invoc
ON Ship.id = Invoc.shipping_address_id
WHERE Ship.id = 1;

-- verifying all shipping addresses that no appears in any invoice
SELECT Ship.id Address_Id, Invoc.id Invoice_Id, Ship.postal_code
FROM shipping_address as Ship 
LEFT JOIN invoices as Invoc
ON Ship.id = Invoc.shipping_address_id
WHERE Invoc.shipping_address_id IS NULL
ORDER BY Ship.id ASC;
