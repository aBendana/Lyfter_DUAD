SET search_path TO lyfter_ecommerce_pets;

DROP TYPE IF EXISTS shipping_method_type;
CREATE TYPE shipping_method_type AS ENUM ('Standard', 'Express', 'Overnight');

DROP TYPE IF EXISTS payment_method_type;
CREATE TYPE payment_method_type AS ENUM ('debit card', 'credit card', 'SINPE', 'bank transfer');

CREATE TABLE lyfter_ecommerce_pets.invoices
(
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL, 
    cart_id INTEGER NOT NULL, 
    shipping_address_id INTEGER NOT NULL, 
    date_placed TIMESTAMP DEFAULT date_trunc('second', CURRENT_TIMESTAMP),
    shipping_method shipping_method_type NOT NULL,
    payment_method payment_method_type NOT NULL,
    invoice_total numeric(12,2) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES lyfter_ecommerce_pets.users (id),
    CONSTRAINT fk_cart FOREIGN KEY (cart_id) REFERENCES lyfter_ecommerce_pets.carts (id),
    CONSTRAINT fk_shipping_address_id FOREIGN KEY (shipping_address_id) REFERENCES lyfter_ecommerce_pets.shipping_address (id)
);


INSERT INTO lyfter_ecommerce_pets.invoices (user_id, cart_id, shipping_address_id, shipping_method, payment_method, invoice_total) VALUES
(1, 1, 1, 'Standard', 'debit card', 49.20),
(2, 2, 3, 'Standard', 'debit card', 65.98),
(3, 3, 5, 'Standard', 'debit card', 17.58),
(4, 4, 7, 'Standard', 'debit card', 119.81),
(5, 5, 8, 'Standard', 'SINPE', 67.80),
(6, 6, 9, 'Standard', 'SINPE', 46.34),
(7, 7, 10, 'Express', 'credit card', 157.27),
(8, 8, 11, 'Express', 'credit card', 59.60),
(1, 9, 2, 'Standard', 'credit card', 158.18),
(2, 10, 4, 'Overnight', 'bank transfer', 34.46),
(3, 11, 6, 'Overnight', 'bank transfer', 140.20);