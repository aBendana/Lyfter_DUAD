SET search_path TO lyfter_ecommerce_pets;

-- DQL PRODUCTS QUERIES
-- select the whole table
SELECT * FROM products;

-- select different atrributes of the products
SELECT SKU, name, stock FROM products;

-- select a specific product by id or SKU
SELECT SKU, name FROM products WHERE id = 10;
SELECT id, name, SKU FROM products WHERE SKU = 'BRD-TOY-001';

-- select products by a specific attribute
SELECT id, SKU, name, target_species FROM products WHERE target_species = 'Cat';

SELECT id, SKU, name, cost FROM products 
WHERE cost >= 10
ORDER BY cost ASC


-- relation with products in cart
-- all products in carts
SELECT Prod.id, Prod.name, InCart.cart_id, InCart.quantity
FROM products as Prod 
INNER JOIN products_in_cart as InCart 
ON Prod.id = InCart.product_id;

-- a specific product in different carts
SELECT Prod.id, Prod.name, InCart.cart_id, InCart.quantity
FROM products as Prod 
INNER JOIN products_in_cart as InCart 
ON Prod.id = InCart.product_id
WHERE Prod.id = 10;

-- products that are not in any cart
SELECT Prod.id, Prod.name, InCart.cart_id
FROM products as Prod 
LEFT JOIN products_in_cart as InCart 
ON Prod.id = InCart.product_id
WHERE InCart.product_id IS NULL
ORDER BY Prod.id ASC;


-- relation with invoice details
-- all products in invoice details
SELECT Prod.id, Prod.name, InvcDeta.invoice_id, InvcDeta.quantity, InvcDeta.item_total
FROM products as Prod 
INNER JOIN invoice_details as InvcDeta 
ON Prod.id = InvcDeta.product_id;

-- a specific product in different invoices
SELECT Prod.id, Prod.name, InvcDeta.invoice_id, InvcDeta.quantity, InvcDeta.item_total
FROM products as Prod 
INNER JOIN invoice_details as InvcDeta 
ON Prod.id = InvcDeta.product_id
WHERE Prod.id = 5;

-- products that are not in any invoice
SELECT Prod.id, Prod.name, InvcDeta.id, InvcDeta.invoice_id, 
FROM products as Prod 
LEFT JOIN invoice_details as InvcDeta 
ON Prod.id = InvcDeta.product_id
WHERE InvcDeta.product_id IS NULL
ORDER BY Prod.id ASC