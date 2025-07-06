SET search_path TO lyfter_ecommerce_pets;

CREATE TABLE lyfter_ecommerce_pets.invoice_details
(
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    invoice_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity smallint NOT NULL,
    discount numeric(5,2) NOT NULL,
    sale_taxes numeric(5,2) NOT NULL,
    shipping_cost numeric(6,2) NOT NULL,
    item_total numeric(12,2) NOT NULL,
    CONSTRAINT fk_invoice FOREIGN KEY (invoice_id) REFERENCES lyfter_ecommerce_pets.invoices (id),
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES lyfter_ecommerce_pets.products (id)
);


INSERT INTO lyfter_ecommerce_pets.invoice_details (invoice_id, product_id, quantity, discount, sale_taxes, shipping_cost, item_total) VALUES
(1, 1, 1, 0.00, 10.00, 0.00, 8.68),
(1, 2, 2, 50.00,  10.00, 0.00, 40.52),
(2, 3, 1, 0.00, 10.00, 0.00, 65.98),
(3, 4, 1, 10.00, 10.00, 0.00, 17.58),
(4, 5, 1, 0.00, 10.00, 0.00, 5.60),
(4, 6, 3, 0.00, 10.00, 0.00, 114.21),
(5, 7, 2, 0.00, 10.00, 0.00, 67.80),
(6, 8, 1, 0.00, 10.00, 0.00, 46.34),
(7, 9, 3, 0.00, 10.00, 7.00, 157.27),
(8, 10, 1, 30.00, 10.00, 7.00, 59.60),
(9, 11, 2, 0.00, 10.00, 0.00, 158.18),
(10, 12, 1, 10.00, 10.00, 15.00, 34.46),
(11, 13, 2, 10.00, 10.00, 15.00, 140.20);
