SET search_path TO lyfter_car_rental;

DROP TYPE IF EXISTS car_status;
CREATE TYPE car_status AS ENUM ('available', 'rented', 'reserved', 'in maintenance', 'out of use');

CREATE TABLE lyfter_car_rental.cars
(
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    make character varying(30) NOT NULL,
    model character varying(30) NOT NULL,
    year character varying(4) NOT NULL,
    status car_status NOT NULL
);


INSERT INTO lyfter_car_rental.cars (make, model, year, status) VALUES
('Buick', 'Century', 1992, 'rented'),
('GMC', 'Sierra 1500', 2001, 'rented'),
('Hyundai', 'Genesis Coupe', 2013, 'rented'),
('BMW', '6 Series', 2005, 'rented'),
('Mercury', 'Grand Marquis', 1992, 'rented'),
('Oldsmobile', '88', 1997, 'rented'),
('Ferrari', '599 GTB Fiorano', 2009, 'rented'),
('Chevrolet', 'Malibu', 2008, 'rented'),
('Mitsubishi', 'Galant', 2000, 'rented'),
('Ford', 'F-Series Super Duty', 2009, 'rented'),
('Chevrolet', 'Cavalier', 2003, 'rented'),
('Mazda', 'B-Series Plus', 2001, 'rented'),
('Mazda', 'Mazda6', 2012, 'rented'),
('Chrysler', 'Concorde', 1994, 'rented'),
('Plymouth', 'Voyager', 1997, 'rented'),
('Chrysler', 'Pacifica', 2005, 'reserved'),
('GMC', 'Suburban 2500', 1999, 'reserved'),
('Mercury', 'Milan', 2006, 'available'),
('Lexus', 'ES', 1996, 'rented'),
('Pontiac', 'Sunbird', 1984, 'in maintenance'),
('Ford', 'Edge', 2011, 'available'),
('Hyundai', 'Tiburon', 1997, 'in maintenance'),
('Ford', 'Thunderbird', 1984, 'available'),
('Mazda', 'Millenia', 1996, 'available'),
('Chevrolet', 'Caprice Classic', 1994, 'reserved'),
('Oldsmobile', 'Bravada', 1994, 'rented'),
('Lexus', 'LX', 1998, 'reserved'),
('Saturn', 'L-Series', 2003, 'in maintenance'),
('Ford', 'LTD Crown Victoria', 1991, 'reserved'),
('Buick', 'LaCrosse', 2010, 'available'),
('Pontiac', '6000', 1985, 'reserved'),
('Lincoln', 'Town Car', 1987, 'available'),
('Oldsmobile', 'Bravada', 2002, 'available'),
('Toyota', 'Highlander', 2009, 'available'),
('Ford', 'F-Series', 1990, 'reserved'),
('Lotus', 'Esprit Turbo', 1984, 'reserved'),
('Hyundai', 'Elantra', 2007, 'out of use'),
('Ford', 'Thunderbird', 1988, 'in maintenance'),
('Pontiac', 'Tempest', 1965, 'reserved'),
('Audi', 'A8', 2009, 'available'),
('BMW', 'X5', 2002, 'in maintenance'),
('Lincoln', 'Town Car', 2009, 'rented'),
('Chevrolet', 'Cavalier', 1992, 'out of use'),
('Volkswagen', 'Touareg 2', 2008, 'out of use'),
('Honda', 'Prelude', 1998, 'out of use'),
('Saab', '9000', 1998, 'reserved'),
('Chevrolet', 'Cobalt', 2006, 'out of use'),
('Audi', 'A8', 2003, 'rented'),
('Ford', 'Thunderbird', 1995, 'reserved'),
('Dodge', 'Grand Caravan', 2009, 'out of use');