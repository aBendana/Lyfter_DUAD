SET search_path TO lyfter_ecommerce_pets;

-- DQL CARTS QUERIES
-- select the whole table
SELECT * FROM carts;

-- select carts by status
SELECT * FROM carts WHERE status = 'completed';


-- relation with invoices
-- carts in invoices
SELECT Cart.id Cart_ID, Invoc.id Invoice_ID, Invoc.invoice_total, Cart.status
FROM carts as Cart 
INNER JOIN invoices as Invoc 
ON Cart.id = Invoc.cart_id;

-- specific carts of a specific invoice
SELECT Cart.id Cart_ID, Invoc.id Invoice_ID, Invoc.invoice_total, Cart.status
FROM carts as Cart 
INNER JOIN invoices as Invoc 
ON Cart.id = Invoc.cart_id
WHERE Cart.id = 5;

-- carts that are not completed nor in any invoice
SELECT Cart.id Cart_ID, Invoc.id Invoice_ID, Invoc.invoice_total, Cart.status
FROM carts as Cart 
LEFT JOIN invoices as Invoc 
ON Cart.id = Invoc.cart_id
WHERE Invoc.cart_id is NULL
ORDER BY Cart.id ASC;


-- relation with products in cart
-- carts in products in cart
SELECT PrInCart.id, Cart.id Cart_ID, PrInCart.product_id, PrInCart.quantity
FROM carts as Cart 
INNER JOIN products_in_cart as PrInCart 
ON Cart.id = PrInCart.cart_id;

-- specific cart in products in cart
SELECT PrInCart.id, Cart.id Cart_ID, PrInCart.product_id, PrInCart.quantity
FROM carts as Cart 
INNER JOIN products_in_cart as PrInCart 
ON Cart.id = PrInCart.cart_id
WHERE Cart.id = 1;

-- carts that no have products
SELECT PrInCart.id, Cart.id Cart_ID, PrInCart.product_id, PrInCart.quantity
FROM carts as Cart 
LEFT JOIN products_in_cart as PrInCart 
ON Cart.id = PrInCart.cart_id
WHERE PrInCart.cart_id is NULL;


-- relation with users
-- INNER JOINs that make reference of users with carts 
-- are in 1_users_DQLs.sql
-- carts that no have an user
SELECT Users.id User_ID, Users.name, Carts.id Cart_ID, Carts.status
FROM users as Users
RIGHT JOIN carts as Carts
ON Users.id = Carts.user_id
WHERE Users.id is NULL;