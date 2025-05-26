
-- DQL queries

-- a
SELECT *
	FROM products;


-- b
SELECT id, name, price
	FROM products
	WHERE price > 50000;


-- c
SELECT product_id, invoice_id, quantity
	FROM invoice_details 
	ORDER BY product_id ASC;


-- d
SELECT product_id, SUM(quantity), SUM(items_total)
	FROM invoice_details
	GROUP by product_id;	


-- e version 1
SELECT id, buyer_email
	FROM invoices
	ORDER BY buyer_email ASC;

-- e version 2
SELECT buyer_email, COUNT(buyer_email) 
	FROM invoices
	GROUP by buyer_email
	ORDER BY buyer_email ASC;
	

-- f
SELECT id, buyer_email, invoice_total
	FROM invoices
	ORDER BY invoice_total DESC;


-- g
SELECT id, invoice_number
	FROM invoices;