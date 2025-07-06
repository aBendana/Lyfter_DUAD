SET search_path TO lyfter_ecommerce_pets;

CREATE TABLE lyfter_ecommerce_pets.products_in_cart
(
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cart_id INTEGER NOT NULL, 
    product_id INTEGER NOT NULL, 
    quantity SMALLINT NOT NULL,
    CONSTRAINT fk_cart FOREIGN KEY (cart_id) REFERENCES lyfter_ecommerce_pets.carts (id),
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES lyfter_ecommerce_pets.products (id)
);


INSERT INTO lyfter_ecommerce_pets.products_in_cart (cart_id, product_id, quantity) VALUES
(1, 1, 1),
(1, 2, 2),
(2, 3, 1),
(3, 4, 1),
(4, 5, 1),
(4, 6, 3),
(5, 7, 2),
(6, 8, 1),
(7, 9, 3),
(8, 10, 1),
(9, 11, 2),
(10, 12, 1),
(11, 13, 2),
(12, 14, 1),
(12, 15, 3),
(12, 16, 4),
(13, 17, 4),
(14, 18, 1),
(15, 19, 3);