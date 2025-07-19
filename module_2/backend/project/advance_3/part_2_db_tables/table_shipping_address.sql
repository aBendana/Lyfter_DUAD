SET search_path TO lyfter_ecommerce_pets;

CREATE TABLE lyfter_ecommerce_pets.shipping_address
(
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL, 
    address character varying(95) NOT NULL,
    canton character varying(20) NOT NULL,
    province character varying(10) NOT NULL,
    postal_code character varying(10) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES lyfter_ecommerce_pets.users (id)
);


INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('1', 'Del Parque de Guápiles, 200 metros al sur, casa con muro.', 'Pococí', 'Limón', '70401');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('1', 'Frente a la terminal de buses, 475 metros al suroeste, casa con jardín.', 'Alajuela', 'Alajuela', '20101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('2', 'Contiguo a estación de gasolina, casa de dos plantas, azul.', 'San Ramón', 'Alajuela', '20201');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('2', 'Barrio San Francisco, Calle 117, apartamento #683.', 'Heredia', 'Heredia', '40101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('3', 'Del Parque de Oriental, 525 metros al noreste, casa con jardín.', 'Cartago', 'Cartago', '30101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('3', 'De la Estación de Bomberos 200 metros al este, casa con jardín.', 'Goicoechea', 'San José', '10801');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('4', 'Barrio Los Ángeles, Calle 88, apartamento #220.', 'Turrialba', 'Cartago', '30501');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('5', 'Avenida 24 # 771, San Antonio, Alajuela.', 'Alajuela', 'Alajuela', '20101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('6', 'Barrio La Granja, Avenida 44, casa #624.', 'Curridabat', 'San José', '11801');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('7', 'Frente a la terminal de buses, 475 metros al sur, casa esquinera.', 'Liberia', 'Guanacaste', '50101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('8', 'Del Parque de Paraíso, 200 metros al sur, casa con jardín.', 'Paraíso', 'Cartago', '30201');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('8', 'Calle Las Palmas # 526, San Francisco, Heredia.', 'Heredia', 'Heredia', '40101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('9', 'De la Pulpería 475 metros al sureste, casa blanca.', 'Santa Cruz', 'Guanacaste', '50601');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('9', 'Frente a la clínica, 150 metros al noreste, apartamento con muro.', 'Puntarenas', 'Puntarenas', '60101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('10', 'Del Parque de Bribri, 300 metros al norte, casa de madera.', 'Talamanca', 'Limón', '70401');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('11', 'De la Escuela 100 metros al este, casa con jardín.', 'Escazú', 'San José', '10201');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('12', 'Barrio San Juan, Avenida 21, local #233.', 'Tibás', 'San José', '10901');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('13', 'Del Parque de Palmares, 250 metros al sureste, apartamento de madera.', 'Palmares', 'Alajuela', '20701');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('14', 'Avenida 87 # 474, San Isidro, Heredia.', 'San Isidro', 'Heredia', '40601');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('15', 'Contiguo a parque, casa de dos plantas, con jardín.', 'Heredia', 'Heredia', '40101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('16', 'De la Iglesia 275 metros al este, casa azul.', 'Cartago', 'Cartago', '30101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('17', 'Barrio San Francisco, Calle 117, apartamento #867.', 'Goicoechea', 'San José', '10801');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('18', 'Frente a la clínica, 500 metros al oeste, local con jardín.', 'Limón', 'Limón', '70101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('19', 'Del Parque de San Juan, 375 metros al sur, casa esquinera.', 'Poás', 'Alajuela', '20801');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('20', 'De la Iglesia 500 metros al suroeste, casa con muro.', 'Desamparados', 'San José', '10301');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('21', 'Calle Principal # 806, San Cayetano, Desamparados.', 'Desamparados', 'San José', '10301');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('22', 'Barrio El Cedro, Calle 123, casa #687.', 'Quepos', 'Puntarenas', '60601');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('23', 'Del Parque de San Rafael, 150 metros al oeste, casa con jardín.', 'Escazú', 'San José', '10201');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('24', 'De la Pulpería 125 metros al sur, apartamento esquinero.', 'Alajuela', 'Alajuela', '20101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('25', 'Barrio San Juan, Avenida 24, apartamento #642.', 'Tibás', 'San José', '10901');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('26', 'Del Parque de San Ramón, 575 metros al sur, casa con muro.', 'San Ramón', 'Alajuela', '20201');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('27', 'Calle 52 # 99, San Francisco, Heredia.', 'Heredia', 'Heredia', '40101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('28', 'De la Escuela 225 metros al sur, casa azul.', 'Heredia', 'Heredia', '40101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('29', 'Barrio La Granja, Avenida 35, local #126.', 'Curridabat', 'San José', '11801');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('30', 'De la Iglesia 350 metros al este, casa blanca.', 'Grecia', 'Alajuela', '20301');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('31', 'Calle 43 Avenida 17 casa#834', 'Goicoechea', 'San José', '10801');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('32', 'De la Pulpería 425 metros al este, apartamento esquinero.', 'Santa Cruz', 'Guanacaste', '50601');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('33', 'Barrio San Cayetano, Calle 119, casa #19.', 'Desamparados', 'San José', '10301');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('34', 'Avenida 75 # 962, Nicoya, Guanacaste.', 'Nicoya', 'Guanacaste', '50201');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('35', 'De la Clínica 300 metros al sur, casa con muro.', 'Puntarenas', 'Puntarenas', '60101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('36', 'Del Parque de Bribri, 250 metros al este, casa con muro.', 'Talamanca', 'Limón', '70401');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('37', 'Frente a la estación de gasolina, 150 metros al este, apartamento con jardín.', 'Barva', 'Heredia', '40401');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('38', 'Barrio San Bosco, Avenida 16, casa #687.', 'San José', 'San José', '10101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('39', 'Contiguo a estación de gasolina, local de dos plantas, con jardín.', 'Belén', 'Heredia', '40901');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('40', 'Del Parque de La Suiza, 275 metros al sur, apartamento con muro.', 'Turrialba', 'Cartago', '30501');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('40', 'De la Clínica 50 metros al este, local esquinero.', 'Montes de Oca', 'San José', '11501');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('41', 'Frente a la clínica, 350 metros al oeste, apartamento blanca.', 'Liberia', 'Guanacaste', '50101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('42', 'Del Parque de Tres Ríos, 175 metros al noreste, casa con jardín.', 'La Unión', 'Cartago', '30301');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('43', 'De la Escuela 425 metros al sur, casa de madera.', 'Quepos', 'Puntarenas', '60601');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('44', 'Avenida 28 # 734, San Antonio, Belén.', 'Belén', 'Heredia', '40901');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('45', 'Contiguo a estación de gasolina, apartamento de dos plantas, con muro.', 'Carrillo', 'Guanacaste', '50901');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('46', 'De la Clínica 475 metros al suroeste, local esquinero.', 'Siquirres', 'Limón', '70301');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('47', 'Frente a la clínica, 375 metros al sur, local de madera.', 'Esparza', 'Puntarenas', '60201');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('48', 'Del Parque de San Antonio, 500 metros al sur, casa de madera.', 'Escazú', 'San José', '10201');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('49', 'Barrio San Juan, Avenida 27, casa #412.', 'Tibás', 'San José', '10901');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('50', 'Del Parque de Heredia, 325 metros al suroeste, casa esquinera.', 'Heredia', 'Heredia', '40101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('50', 'Contiguo a clínica, apartamento de dos plantas, con muro.', 'Alajuela', 'Alajuela', '20101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('1', 'De la Escuela 500 metros al norte, apartamento blanca.', 'Curridabat', 'San José', '11801');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('2', 'Barrio Los Yoses, Calle 149, casa #133.', 'Montes de Oca', 'San José', '11501');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('3', 'Del Parque de Heredia, 400 metros al norte, casa esquinera.', 'Heredia', 'Heredia', '40101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('4', 'Frente a la clínica, 50 metros al noreste, casa con jardín.', 'Alajuela', 'Alajuela', '20101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('5', 'Barrio Los Yoses, Calle 117, apartamento #474.', 'Montes de Oca', 'San José', '11501');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('6', 'Del Parque de Santa Rosa, 100 metros al norte, local esquinero.', 'Santo Domingo', 'Heredia', '40301');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('7', 'De la Escuela 150 metros al este, casa azul.', 'Alajuela', 'Alajuela', '20101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('8', 'Del Parque de Heredia, 575 metros al sur, apartamento con jardín.', 'Heredia', 'Heredia', '40101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('9', 'Del Parque de Escazú, 400 metros al oeste, apartamento de madera.', 'Escazú', 'San José', '10201');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('10', 'Avenida 6 # 349, San Juan, Tibás.', 'Tibás', 'San José', '10901');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('11', 'Calle Las Palmas # 12, Naranjo, Alajuela.', 'Naranjo', 'Alajuela', '20601');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('12', 'Barrio San Juan, Calle 128, casa #198.', 'Tibás', 'San José', '10901');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('13', 'Del Parque de Nicoya, 575 metros al oeste, casa esquinera.', 'Nicoya', 'Guanacaste', '50201');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('14', 'Contiguo a parque, casa de dos plantas, con muro.', 'Poás', 'Alajuela', '20801');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('15', 'De la Pulpería 150 metros al oeste, casa esquinera.', 'Paraíso', 'Cartago', '30201');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('16', 'Del Parque de Heredia, 200 metros al sur, casa con jardín.', 'Heredia', 'Heredia', '40101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('17', 'De la Escuela 425 metros al sur, local de madera.', 'Puntarenas', 'Puntarenas', '60101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('18', 'Contiguo a parque, apartamento de dos plantas, con jardín.', 'Golfito', 'Puntarenas', '60701');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('19', 'Del Parque de Guadalupe, 375 metros al suroeste, casa de madera.', 'Goicoechea', 'San José', '10801');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('20', 'Barrio Los Yoses, Calle 70, apartamento #127.', 'Montes de Oca', 'San José', '11501');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('21', 'Frente a la clínica, 400 metros al oeste, casa esquinera.', 'Esparza', 'Puntarenas', '60201');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('22', 'Avenida 67 # 971, Santa Cruz, Guanacaste.', 'Santa Cruz', 'Guanacaste', '50601');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('23', 'Del Parque de Alajuela, 350 metros al este, apartamento esquinero.', 'Alajuela', 'Alajuela', '20101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('24', 'De la Pulpería 125 metros al oeste, casa con muro.', 'Liberia', 'Guanacaste', '50101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('25', 'Barrio San Cayetano, Avenida 12, casa #525.', 'Desamparados', 'San José', '10301');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('26', 'Del Parque de Guadalupe, 500 metros al sur, apartamento con muro.', 'Goicoechea', 'San José', '10801');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('27', 'De la Escuela 425 metros al sur, apartamento blanca.', 'Santo Domingo', 'Heredia', '40301');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('28', 'De la Pulpería 525 metros al sur, local esquinero.', 'Pococí', 'Limón', '70401');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('29', 'Barrio San Bosco, Avenida 70, local #166.', 'San José', 'San José', '10101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('30', 'Del Parque de Barva, 275 metros al sur, casa con muro.', 'Barva', 'Heredia', '40401');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('31', 'Contiguo a clínica, local de dos plantas, con jardín.', 'Cartago', 'Cartago', '30101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('32', 'Calle 100 Avenida 12 casa#987', 'San José', 'San José', '10101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('33', 'Contiguo a estación de gasolina, casa de dos plantas, con muro.', 'Grecia', 'Alajuela', '20301');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('34', 'De la Pulpería 450 metros al este, casa con muro.', 'Cartago', 'Cartago', '30101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('35', 'Del Parque de Limón, 50 metros al oeste, apartamento esquinero.', 'Limón', 'Limón', '70101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('36', 'Barrio Los Yoses, Avenida 1, casa #735.', 'Montes de Oca', 'San José', '11501');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('37', 'Del Parque de Tres Ríos, 550 metros al sureste, casa blanca.', 'La Unión', 'Cartago', '30301');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('38', 'Avenida 73 # 276, San José, Alajuela.', 'Alajuela', 'Alajuela', '20101');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('39', 'Del Parque de Siquirres, 125 metros al sur, local de madera.', 'Siquirres', 'Limón', '70301');
INSERT INTO lyfter_ecommerce_pets.shipping_address (user_id, address, canton, province, postal_code) VALUES
('40', 'Barrio Los Mangos, Calle 41, casa #69.', 'Carrillo', 'Guanacaste', '50901');