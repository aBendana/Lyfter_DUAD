SET search_path TO lyfter_ecommerce_pets;

-- DQL INVOICE DETAILS QUERIES
-- select the whole table
SELECT * FROM invoice_details;

-- details for a specific invoice
SELECT * FROM invoice_details WHERE invoice_id = 1;


-- relations with products table and invoices table can be find
-- in products and invoices DQLs.sql

-- verifications if is missing product or invoice
-- with products
SELECT Prod.id Product_ID, Prod.name, Prod.SKU, InDet.invoice_id, InDet.item_total
FROM products as Prod 
RIGHT JOIN invoice_details as InDet 
ON Prod.id = InDet.product_id
WHERE Prod.id IS NULL;

-- with invoices
SELECT Invc.id Invoice_ID, Invc.user_id, InDet.id, InDet.product_id
FROM invoices as Invc 
RIGHT JOIN invoice_details as InDet 
ON Invc.id = InDet.invoice_id
WHERE Invc.id is NULL;