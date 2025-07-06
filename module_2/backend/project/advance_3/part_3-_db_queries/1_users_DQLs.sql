SET search_path TO lyfter_ecommerce_pets;

-- DQL USERS QUERIES
-- select the whole table
SELECT * FROM users;

-- select only ids, names, emails, phone numbers
SELECT name FROM users;

-- select by a specific id, name, email, phone number or rol
SELECT name FROM users WHERE id = 10;
SELECT name, rol FROM users WHERE rol = 'administrator';


-- relation with shipping addresses
-- all users name with their respective addresses
SELECT Users.id, Users.name, Shipping.address
FROM users as Users 
INNER JOIN shipping_address as Shipping 
ON Users.id = Shipping.user_id;

-- user name with his respective addresses
SELECT Users.id, Users.name, Shipping.address
FROM users as Users 
INNER JOIN shipping_address as Shipping 
ON Users.id = Shipping.user_id
WHERE Users.id = 1;

-- verifying all users that no have an address
SELECT Users.id, Users.name, Shipping.address
FROM users as Users 
LEFT JOIN shipping_address as Shipping 
ON Users.id = Shipping.user_id
WHERE Shipping.user_id IS NULL;--


-- relation with carts
-- all users name with their respective carts
SELECT Users.id, Users.name, Carts.id, Carts.status
FROM users as Users 
INNER JOIN carts as Carts 
ON Users.id = Carts.user_id;

-- user name with his respective carts
SELECT Users.id, Users.name, Carts.id, Carts.status
FROM users as Users 
INNER JOIN carts as Carts 
ON Users.id = Carts.user_id
WHERE Users.id = 1;

-- consulting all users that no have carts
SELECT Users.id User_ID, Users.name, Carts.id Cart_ID
FROM users as Users 
LEFT JOIN carts as Carts 
ON Users.id = Carts.user_id
WHERE Carts.user_id IS NULL
ORDER BY Users.id ASC;


-- relation with invoices
-- all users name with their respective invoices
SELECT Users.id, Users.name, Invoc.id, Invoc.date_placed
FROM users as Users 
INNER JOIN invoices as Invoc 
ON Users.id = Invoc.user_id;

-- specific user with his respective invoices
SELECT Users.id, Users.name, Invoc.id, Invoc.date_placed
FROM users as Users 
INNER JOIN invoices as Invoc 
ON Users.id = Invoc.user_id
WHERE Users.id = 1;

-- verifying all users have any invoices
SELECT Users.id, Users.name, Invoc.id
FROM users as Users 
LEFT JOIN invoices as Invoc 
ON Users.id = Invoc.user_id
WHERE Invoc.user_id IS NULL
ORDER BY Users.id ASC;