SET search_path TO lyfter_car_rental;

-- a. add a new user
INSERT INTO lyfter_car_rental.users (user_name, email, password, birth_date, status) 
    VALUES ('Richard Colmena', 'colmena88@gmail.com', 'ColmUh,@ff22', '2000-04-23', 'inactive');


-- b. add a new car
INSERT INTO lyfter_car_rental.cars (make, model, year, status) 
    VALUES ('Lexus', 'LFA', 2011, 'available');


-- c. change user status
UPDATE lyfter_car_rental.users
SET status = 'blocked'
WHERE id = 50;


-- d. change car status
UPDATE lyfter_car_rental.cars
SET status = 'in maintenance'
WHERE id = 50;


-- e. add a new rental
INSERT INTO lyfter_car_rental.car_rental (car_id, user_id, status) 
    VALUES (40, 40, 'rented');


-- f. completion of a rental, placing the car as available 
--    and completing the rental status
UPDATE lyfter_car_rental.car_rental
SET status = 'completed'
WHERE id = 1;

UPDATE lyfter_car_rental.cars
SET status = 'available'
WHERE id = 1;


-- g. make a car not available for rent
UPDATE lyfter_car_rental.cars
SET status = 'out of use'
WHERE id = 41;


-- h. list of all rented cars and other list wih all available cars
SELECT * FROM lyfter_car_rental.cars
WHERE status = 'rented';

SELECT * FROM lyfter_car_rental.cars
WHERE status = 'available';



