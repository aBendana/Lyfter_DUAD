SET search_path TO lyfter_ecommerce_pets;

DROP TYPE IF EXISTS status_type;
CREATE TYPE status_type AS ENUM ('completed', 'pending');

CREATE TABLE lyfter_ecommerce_pets.carts
(
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL, 
    status status_type NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES lyfter_ecommerce_pets.users (id)
);

-- creation of unique partial index, for the control of only one pending cart for a user
CREATE UNIQUE INDEX only_one_pending_cart
ON lyfter_ecommerce_pets.carts(user_id)
WHERE status = 'pending';


INSERT INTO lyfter_ecommerce_pets.carts (user_id, status) VALUES
(1, 'completed'),
(2, 'completed'),
(3, 'completed'),
(4, 'completed'),
(5, 'completed'),
(6, 'completed'),
(7, 'completed'),
(8, 'completed'),
(1, 'completed'),
(2, 'completed'),
(3, 'completed'),
(1, 'pending'),
(2, 'pending'),
(3, 'pending'),
(4, 'pending');