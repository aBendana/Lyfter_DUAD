SET search_path TO lyfter_car_rental;

DROP TYPE IF EXISTS rental_status;
CREATE TYPE rental_status AS ENUM ('rented', 'reserved', 'completed', 'cancelled', 'incident');
CREATE TABLE lyfter_car_rental.car_rental (
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    car_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rental_date TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    status rental_status NOT NULL,
    CONSTRAINT fk_car FOREIGN KEY (car_id)
        REFERENCES lyfter_car_rental.cars (id),
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES lyfter_car_rental.users (id)
);


INSERT INTO lyfter_car_rental.car_rental (car_id, user_id, status) VALUES
(1, 1, 'rented'),
(2, 2, 'completed'),
(3, 3, 'cancelled'),
(4, 4, 'reserved'),
(5, 5, 'incident'),
(6, 6, 'completed'),
(7, 7, 'rented'),
(8, 8, 'cancelled'),
(9, 9, 'reserved'),
(10, 10, 'rented'),
(11, 11, 'completed'),
(12, 12, 'rented'),
(13, 13, 'rented'),
(14, 14, 'rented'),
(15, 15, 'rented');
