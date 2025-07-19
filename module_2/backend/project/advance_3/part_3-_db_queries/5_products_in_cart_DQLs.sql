SET search_path TO lyfter_ecommerce_pets;

-- DQL PRODUCTS IN CART QUERIES
-- select the whole table
SELECT * FROM products_in_cart;

-- relations with products table and carts table can be find
-- in products and carts DQLs.sql

-- verifications if is missing a product or cart
-- with products
SELECT Prod.id, Prod.name, InCart.cart_id
FROM products as Prod 
RIGHT JOIN products_in_cart as InCart 
ON Prod.id = InCart.product_id
WHERE Prod.id IS NULL;

-- with carts
SELECT PrInCart.id, Cart.id Cart_ID, PrInCart.product_id, PrInCart.quantity
FROM carts as Cart 
RIGHT JOIN products_in_cart as PrInCart 
ON Cart.id = PrInCart.cart_id
WHERE Cart.id is NULL;