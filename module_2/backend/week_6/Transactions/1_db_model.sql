-- schema creation
CREATE SCHEMA IF NOT EXISTS lyfter_week_6_transactions;


SET search_path TO lyfter_week_6_transactions;

-- creation of table users
CREATE TABLE IF NOT EXISTS users(
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name character varying(40) NOT NULL,
    email character varying(40) UNIQUE NOT NULL,
    password character varying(20) NOT NULL,
    address character varying(100) NOT NULL,
    phone_number character varying(10) UNIQUE NOT NULL
);

INSERT INTO users(full_name, email, password, address, phone_number) VALUES
('Carlos Vargas', 'carlosv@example.com', 'cC12Er!!', 'Cartago, Paraiso av 10', '8181-8181'),
('Ana Lopez', 'anal@example.com', 'AnL0p3z!', 'San Jose, Curridabat, calle 5', '8282-8282'),
('Pedro Ramirez', 'pedror@example.com', 'PdR4m1r@', 'Alajuela, Grecia, barrio San Roque', '8383-8383'),
('Maria Soto', 'marias@example.com', 'MrS0t0!!', 'Heredia, Barva, avenida Central', '8484-8484'),
('Jose Chaves', 'josec@example.com', 'JsChv5#$', 'Puntarenas, Esparza, El Roble', '8585-8585'),
('Laura Mora', 'lauram@example.com', 'LrM0r@7!', 'Limon, Guapiles, calle 10', '8686-8686'),
('Daniel Castro', 'danielc@example.com', 'DnCstR!!', 'Guanacaste, Nicoya, playa Samara', '8787-8787'),
('Sofía Jimenez', 'sofiaj@example.com', 'SfJmnz$$', 'San Jose, Moravia, Los Colegios', '8888-8888'),
('Andres Solis', 'andress@example.com', 'AnSlis%^', 'Cartago, La Union, Tres Rios', '8989-8989'),
('Valeria Ruiz', 'valeriar@example.com', 'VlRuz!@#', 'Alajuela, San Carlos, Ciudad Quesada', '9090-9090');



-- creation of products table
CREATE TABLE IF NOT EXISTS products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    SKU  character varying(30) NOT NULL UNIQUE,
    name character varying(35) NOT NULL,
    category character varying(15) NOT NULL,
    stock smallint NOT NULL,
    cost numeric(5,2) NOT NULL,
    price numeric(5,2) NOT NULL
);

INSERT INTO products (SKU, name, category, stock, cost, price) VALUES
('NIKE-ZAP-001', 'Nike Air Max 270', 'zapatos', 50, 75.00, 129.99),
('ADID-ZAP-002', 'Adidas Ultraboost', 'zapatos', 40, 80.00, 139.99),
('UA-CAM-003', 'Under Armour Tee', 'camisas', 60, 15.00, 29.99),
('NB-ZAP-004', 'New Balance 574', 'zapatos', 35, 65.00, 109.99),
('PUMA-ZAP-005', 'Puma RS-X', 'zapatos', 30, 70.00, 119.99),
('GYM-PES-006', 'Bowflex Dumbbells 552', 'pesas', 20, 120.00, 249.99),
('REEB-CAM-007', 'Reebok Training Shirt', 'camisas', 55, 18.00, 34.99),
('NIKE-CAM-008', 'Nike Dri-FIT Shirt', 'camisas', 50, 20.00, 39.99),
('ADID-PES-009', 'Adidas Weighted Vest', 'pesas', 15, 50.00, 89.99),



-- creation of products table
DROP TYPE IF EXISTS status_type;
CREATE TYPE status_type AS ENUM ('completed', 'returned');

CREATE TABLE IF NOT EXISTS invoices
(
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL, 
    product_id INTEGER NOT NULL,
    date_placed TIMESTAMP DEFAULT date_trunc('second', CURRENT_TIMESTAMP),
    quantity smallint NOT NULL,
    invoice_total numeric(12,2) NOT NULL,
    status status_type NOT NULL;
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id)
);