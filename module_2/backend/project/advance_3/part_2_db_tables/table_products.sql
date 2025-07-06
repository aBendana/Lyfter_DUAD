SET search_path TO lyfter_ecommerce_pets;

CREATE TABLE lyfter_ecommerce_pets.products
(
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    SKU  character varying(30) NOT NULL UNIQUE,
    name character varying(35) NOT NULL,
    description character varying(60) NOT NULL,
    target_species character varying(12) NOT NULL,
    supplier character varying(35) NOT NULL,
    stock smallint NOT NULL,
    cost numeric(5,2) NOT NULL,
    price numeric(5,2) NOT NULL
);


INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('AQUA-FLAKE-001', 'Fish Flakes', 'Nutrient-rich flake food for tropical freshwater fish', 'Fish', 'AquaNutraXYZ', 200, 3.1, 7.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-001', 'Dog Kibble', 'Premium Kibble for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-001', 'Deluxe Catnip Toy', 'Engaging Catnip Toy for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-001', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-001', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-001', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-001', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-001', 'Dog Joint Supplement', 'Essential Joint Supplement for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-001', 'Cat Bowl', 'Practical and comfy Bowl for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-001', 'Bird Bell Toy', 'Stimulating Bell Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-001', 'Fish Aquarium Decor', 'High-quality Aquarium Decor for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-001', 'Reptile Heat Lamp', 'Essential Heat Lamp for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-001', 'Small Mammal Pellets', 'Complete Pellets for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-001', 'Dog Shampoo', 'Gentle Shampoo for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-001', 'Cat Hairball Remedy', 'Specialized Hairball Remedy for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-001', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-001', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEALTH-001', 'Reptile Vitamin Dust', 'Dietary supplement for reptile bone health', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-001', 'Small Mammal Rabbit Hutch', 'Secure and spacious Rabbit Hutch for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-001', 'Dog Bowl', 'Stylish and comfortable Bowl for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-001', 'Cat Wet Food', 'Delicious Wet Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-001', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-002', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-001', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-001', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-001', 'Dog Ball', 'Durable and fun Ball for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-001', 'Cat Brush', 'Perfect Brush for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-001', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-002', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-002', 'Reptile Substrate', 'Comfortable Substrate for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-001', 'Small Mammal Water Bottle', 'Practical Water Bottle for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-002', 'Dog Wet Food', 'Premium Wet Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 497, 4.41, 12.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-002', 'Deluxe Laser Pointer', 'Engaging Laser Pointer for endless cat fun', 'Cat', 'CritterCare Co.', 145, 17.65, 39.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-002', 'Bird Cage', 'Spacious Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 458, 29.21, 57.06);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-003', 'Fish Frozen Food', 'Premium Frozen Food for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 211, 23.36, 51.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-002', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'ReptileRealm LLC', 490, 4.56, 13.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-002', 'Paper Bedding', 'Soft and absorbent Paper Bedding for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 179, 14.73, 43.68);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-002', 'Dog Flea & Tick Treatment', 'Essential Flea & Tick Treatment for dog well-being', 'Dog', 'Global Pet Supplies', 170, 23.51, 60.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-002', 'Cat Bed', 'Practical and comfy Cat Bed for cats', 'Cat', 'Nature''s Best Pet', 151, 30.73, 79.16);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-002', 'Bird Perch', 'Stimulating Perch for playful birds', 'Bird', 'Paws & Claws Corp', 221, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-003', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-003', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-002', 'Small Mammal Hay', 'Complete Hay for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-002', 'Dog Brush', 'Gentle Brush for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-002', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-002', 'Bird Fruit Treats', 'Nutritious Fruit Treats for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-002', 'Fish Water Conditioner', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-002', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-002', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-002', 'Dog Leash', 'Stylish and comfortable Leash for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-002', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-002', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-004', 'Fish Bottom Feeder Wafers', 'Premium Bottom Feeder Wafers for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-003', 'Reptile Frozen Rodents', 'Specialized Frozen Rodents for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-002', 'Small Mammal Chew Blocks', 'Fun Chew Blocks for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-002', 'Dog Plush Toy', 'Durable and fun Plush Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-002', 'Cat Nail Clippers', 'Perfect Nail Clippers for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-002', 'Bird Bath', 'Essential Bird Bath for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-004', 'Fish Gravel', 'High-quality Gravel for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-004', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-002', 'Small Mammal Food Dish', 'Practical Food Dish for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-003', 'Dog Treats', 'Premium Treats for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 497, 4.41, 12.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-003', 'Deluxe Feather Wand', 'Engaging Feather Wand for endless cat fun', 'Cat', 'CritterCare Co.', 145, 17.65, 39.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-003', 'Bird Cage', 'Spacious Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 458, 29.21, 57.06);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-HEALTH-001', 'Fish Fungus Treatment', 'Aids in fish recovery from common ailments', 'Fish', 'DeepBlue Aquatics', 211, 23.36, 51.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-003', 'Reptile Heat Lamp', 'Essential Heat Lamp for reptile environment control', 'Reptile', 'ReptileRealm LLC', 490, 4.56, 13.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-003', 'Paper Bedding', 'Soft and absorbent Paper Bedding for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 179, 14.73, 43.68);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-003', 'Dog Joint Supplement', 'Essential Joint Supplement for dog well-being', 'Dog', 'Global Pet Supplies', 170, 23.51, 60.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-003', 'Cat Litter Box', 'Practical and comfy Litter Box for cats', 'Cat', 'Nature''s Best Pet', 151, 30.73, 79.16);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-003', 'Bird Swinging Toy', 'Stimulating Swinging Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-005', 'Fish Gravel', 'High-quality Gravel for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-005', 'Reptile Substrate', 'Comfortable Substrate for thriving reptiles', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-003', 'Small Mammal Treat Sticks', 'Complete Treat Sticks for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-003', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-003', 'Cat Hairball Remedy', 'Specialized Hairball Remedy for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-003', 'Bird Seed Mix', 'Nutritious Seed Mix for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-003', 'Fish Water Conditioner', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-004', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-003', 'Small Mammal Rabbit Hutch', 'Secure and spacious Rabbit Hutch for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-003', 'Dog Collar', 'Stylish and comfortable Collar for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-003', 'Cat Treats', 'Delicious Treats for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-003', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-005', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-005', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-003', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-003', 'Dog Interactive Toy', 'Durable and fun Interactive Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-003', 'Cat Shampoo', 'Perfect Shampoo for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-003', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-006', 'Fish Aquarium Decor', 'High-quality Aquarium Decor for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-006', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-003', 'Small Mammal Food Dish', 'Practical Food Dish for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-004', 'Puppy Food', 'Premium Puppy Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-004', 'Deluxe Scratching Post', 'Engaging Scratching Post for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-004', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-006', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-007', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-004', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-004', 'Dog Flea & Tick Treatment', 'Essential Flea & Tick Treatment for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-004', 'Cat Bowl', 'Practical and comfy Bowl for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-004', 'Bird Perch', 'Stimulating Perch for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-007', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-004', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-004', 'Small Mammal Hay', 'Complete Hay for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-004', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-004', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-004', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-004', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEALTH-002', 'Reptile Vitamin Dust', 'Dietary supplement for reptile bone health', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-004', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-004', 'Dog Bed', 'Stylish and comfortable Bed for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-004', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-004', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-007', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-006', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-004', 'Small Mammal Chew Blocks', 'Fun Chew Blocks for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-004', 'Dog Ball', 'Durable and fun Ball for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-004', 'Cat Brush', 'Perfect Brush for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-004', 'Bird Bath', 'Essential Bird Bath for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-008', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-008', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-004', 'Small Mammal Water Bottle', 'Practical Water Bottle for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-005', 'Dog Kibble', 'Premium Kibble for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-005', 'Deluxe Catnip Toy', 'Engaging Catnip Toy for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-005', 'Bird Cage', 'Spacious Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-008', 'Fish Frozen Food', 'Premium Frozen Food for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-009', 'Reptile Substrate', 'Comfortable Substrate for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-005', 'Paper Bedding', 'Soft and absorbent Paper Bedding for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-005', 'Dog Joint Supplement', 'Essential Joint Supplement for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-005', 'Cat Litter Box', 'Practical and comfy Litter Box for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-005', 'Bird Bell Toy', 'Stimulating Bell Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-009', 'Fish Aquarium Decor', 'High-quality Aquarium Decor for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-005', 'Reptile Heat Lamp', 'Essential Heat Lamp for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-005', 'Small Mammal Treat Sticks', 'Complete Treat Sticks for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-005', 'Dog Shampoo', 'Gentle Shampoo for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-005', 'Cat Hairball Remedy', 'Specialized Hairball Remedy for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-005', 'Bird Seed Mix', 'Nutritious Seed Mix for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-005', 'Fish Water Conditioner', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-007', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-005', 'Small Mammal Rabbit Hutch', 'Secure and spacious Rabbit Hutch for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-005', 'Dog Collar', 'Stylish and comfortable Collar for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-005', 'Cat Dry Food', 'Delicious Dry Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-005', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-009', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-008', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-005', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-005', 'Dog Plush Toy', 'Durable and fun Plush Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-005', 'Cat Brush', 'Perfect Brush for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-005', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-010', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-010', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-005', 'Small Mammal Food Dish', 'Practical Food Dish for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-006', 'Dog Wet Food', 'Premium Wet Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 497, 4.41, 12.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-006', 'Deluxe Laser Pointer', 'Engaging Laser Pointer for endless cat fun', 'Cat', 'CritterCare Co.', 145, 17.65, 39.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-006', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 458, 29.21, 57.06);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-HEALTH-002', 'Fish Fungus Treatment', 'Aids in fish recovery from common ailments', 'Fish', 'DeepBlue Aquatics', 211, 23.36, 51.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-006', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'ReptileRealm LLC', 490, 4.56, 13.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-006', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 179, 14.73, 43.68);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-006', 'Dog Flea & Tick Treatment', 'Essential Flea & Tick Treatment for dog well-being', 'Dog', 'Global Pet Supplies', 170, 23.51, 60.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-006', 'Cat Bed', 'Practical and comfy Cat Bed for cats', 'Cat', 'Nature''s Best Pet', 151, 30.73, 79.16);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-006', 'Bird Swinging Toy', 'Stimulating Swinging Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-011', 'Fish Gravel', 'High-quality Gravel for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-011', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-006', 'Small Mammal Pellets', 'Complete Pellets for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-006', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-006', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-006', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-006', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-009', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-006', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-006', 'Dog Leash', 'Stylish and comfortable Leash for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-006', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-006', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-010', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-010', 'Reptile Frozen Rodents', 'Specialized Frozen Rodents for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-006', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-006', 'Dog Interactive Toy', 'Durable and fun Interactive Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-006', 'Cat Shampoo', 'Perfect Shampoo for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-006', 'Bird Bath', 'Essential Bird Bath for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-012', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-012', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-006', 'Small Mammal Food Dish', 'Practical Food Dish for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-007', 'Dog Kibble', 'Premium Kibble for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-007', 'Deluxe Catnip Toy', 'Engaging Catnip Toy for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-007', 'Bird Cage', 'Spacious Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-011', 'Fish Frozen Food', 'Premium Frozen Food for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-013', 'Reptile Substrate', 'Comfortable Substrate for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-007', 'Paper Bedding', 'Soft and absorbent Paper Bedding for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-007', 'Dog Joint Supplement', 'Essential Joint Supplement for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-007', 'Cat Litter Box', 'Practical and comfy Litter Box for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-007', 'Bird Bell Toy', 'Stimulating Bell Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-013', 'Fish Aquarium Decor', 'High-quality Aquarium Decor for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-007', 'Reptile Heat Lamp', 'Essential Heat Lamp for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-007', 'Small Mammal Treat Sticks', 'Complete Treat Sticks for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-007', 'Dog Shampoo', 'Gentle Shampoo for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-007', 'Cat Hairball Remedy', 'Specialized Hairball Remedy for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-007', 'Bird Seed Mix', 'Nutritious Seed Mix for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-007', 'Fish Water Conditioner', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-011', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-007', 'Small Mammal Rabbit Hutch', 'Secure and spacious Rabbit Hutch for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-007', 'Dog Collar', 'Stylish and comfortable Collar for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-007', 'Cat Dry Food', 'Delicious Dry Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-007', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-012', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-012', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-007', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-007', 'Dog Interactive Toy', 'Durable and fun Interactive Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-007', 'Cat Shampoo', 'Perfect Shampoo for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-007', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-014', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-014', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-007', 'Small Mammal Food Dish', 'Practical Food Dish for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-008', 'Puppy Food', 'Premium Puppy Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-008', 'Deluxe Scratching Post', 'Engaging Scratching Post for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-008', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-013', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-015', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-008', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-008', 'Dog Flea & Tick Treatment', 'Essential Flea & Tick Treatment for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-008', 'Cat Bowl', 'Practical and comfy Bowl for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-008', 'Bird Perch', 'Stimulating Perch for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-015', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-008', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-008', 'Small Mammal Hay', 'Complete Hay for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-008', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-008', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-008', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-008', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEALTH-003', 'Reptile Vitamin Dust', 'Dietary supplement for reptile bone health', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-008', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-008', 'Dog Bed', 'Stylish and comfortable Bed for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-008', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-008', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-014', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-013', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-008', 'Small Mammal Chew Blocks', 'Fun Chew Blocks for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-008', 'Dog Ball', 'Durable and fun Ball for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-008', 'Cat Brush', 'Perfect Brush for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-008', 'Bird Bath', 'Essential Bird Bath for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-016', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-016', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-008', 'Small Mammal Water Bottle', 'Practical Water Bottle for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-009', 'Dog Wet Food', 'Premium Wet Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 497, 4.41, 12.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-009', 'Deluxe Laser Pointer', 'Engaging Laser Pointer for endless cat fun', 'Cat', 'CritterCare Co.', 145, 17.65, 39.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-009', 'Bird Cage', 'Spacious Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 458, 29.21, 57.06);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-HEALTH-003', 'Fish Fungus Treatment', 'Aids in fish recovery from common ailments', 'Fish', 'DeepBlue Aquatics', 211, 23.36, 51.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-009', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'ReptileRealm LLC', 490, 4.56, 13.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-009', 'Paper Bedding', 'Soft and absorbent Paper Bedding for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 179, 14.73, 43.68);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-009', 'Dog Flea & Tick Treatment', 'Essential Flea & Tick Treatment for dog well-being', 'Dog', 'Global Pet Supplies', 170, 23.51, 60.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-009', 'Cat Bed', 'Practical and comfy Cat Bed for cats', 'Cat', 'Nature''s Best Pet', 151, 30.73, 79.16);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-009', 'Bird Swinging Toy', 'Stimulating Swinging Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-017', 'Fish Gravel', 'High-quality Gravel for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-017', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-009', 'Small Mammal Pellets', 'Complete Pellets for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-009', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-009', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-009', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-009', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-014', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-009', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-009', 'Dog Leash', 'Stylish and comfortable Leash for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-009', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-009', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-015', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-015', 'Reptile Frozen Rodents', 'Specialized Frozen Rodents for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-009', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-009', 'Dog Interactive Toy', 'Durable and fun Interactive Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-009', 'Cat Shampoo', 'Perfect Shampoo for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-009', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-018', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-018', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-009', 'Small Mammal Food Dish', 'Practical Food Dish for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-010', 'Dog Kibble', 'Premium Kibble for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-010', 'Deluxe Catnip Toy', 'Engaging Catnip Toy for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-010', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-016', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-019', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-010', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-010', 'Dog Joint Supplement', 'Essential Joint Supplement for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-010', 'Cat Bowl', 'Practical and comfy Bowl for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-010', 'Bird Bell Toy', 'Stimulating Bell Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-019', 'Fish Aquarium Decor', 'High-quality Aquarium Decor for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-010', 'Reptile Heat Lamp', 'Essential Heat Lamp for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-010', 'Small Mammal Hay', 'Complete Hay for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-010', 'Dog Shampoo', 'Gentle Shampoo for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-010', 'Cat Hairball Remedy', 'Specialized Hairball Remedy for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-010', 'Bird Fruit Treats', 'Nutritious Fruit Treats for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-010', 'Fish Water Conditioner', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-016', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-010', 'Small Mammal Rabbit Hutch', 'Secure and spacious Rabbit Hutch for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-010', 'Dog Bowl', 'Stylish and comfortable Bowl for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-010', 'Cat Wet Food', 'Delicious Wet Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-010', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-017', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-017', 'Reptile Frozen Rodents', 'Specialized Frozen Rodents for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-010', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-010', 'Dog Ball', 'Durable and fun Ball for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-010', 'Cat Brush', 'Perfect Brush for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-010', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-020', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-021', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-010', 'Small Mammal Water Bottle', 'Practical Water Bottle for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-011', 'Puppy Food', 'Premium Puppy Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-011', 'Deluxe Scratching Post', 'Engaging Scratching Post for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-011', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-018', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-020', 'Reptile Substrate', 'Comfortable Substrate for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-011', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-011', 'Dog Flea & Tick Treatment', 'Essential Flea & Tick Treatment for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-011', 'Cat Bowl', 'Practical and comfy Bowl for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-011', 'Bird Perch', 'Stimulating Perch for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-021', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-011', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-011', 'Small Mammal Hay', 'Complete Hay for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-011', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-011', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-011', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-011', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEALTH-004', 'Reptile Vitamin Dust', 'Dietary supplement for reptile bone health', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-011', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-011', 'Dog Bed', 'Stylish and comfortable Bed for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-011', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-011', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-019', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-018', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-011', 'Small Mammal Chew Blocks', 'Fun Chew Blocks for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-011', 'Dog Ball', 'Durable and fun Ball for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-011', 'Cat Brush', 'Perfect Brush for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-011', 'Bird Bath', 'Essential Bird Bath for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-022', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-120', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-011', 'Small Mammal Water Bottle', 'Practical Water Bottle for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-012', 'Dog Wet Food', 'Premium Wet Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 497, 4.41, 12.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-012', 'Deluxe Laser Pointer', 'Engaging Laser Pointer for endless cat fun', 'Cat', 'CritterCare Co.', 145, 17.65, 39.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-012', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 458, 29.21, 57.06);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-HEALTH-004', 'Fish Fungus Treatment', 'Aids in fish recovery from common ailments', 'Fish', 'DeepBlue Aquatics', 211, 23.36, 51.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-012', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'ReptileRealm LLC', 490, 4.56, 13.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-012', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 179, 14.73, 43.68);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-012', 'Dog Flea & Tick Treatment', 'Essential Flea & Tick Treatment for dog well-being', 'Dog', 'Global Pet Supplies', 170, 23.51, 60.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-012', 'Cat Bed', 'Practical and comfy Cat Bed for cats', 'Cat', 'Nature''s Best Pet', 151, 30.73, 79.16);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-012', 'Bird Swinging Toy', 'Stimulating Swinging Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-023', 'Fish Gravel', 'High-quality Gravel for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-121', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-012', 'Small Mammal Pellets', 'Complete Pellets for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-012', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-012', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-012', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-012', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-118', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-012', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-012', 'Dog Leash', 'Stylish and comfortable Leash for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-012', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-012', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-020', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-019', 'Reptile Frozen Rodents', 'Specialized Frozen Rodents for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-012', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-012', 'Dog Interactive Toy', 'Durable and fun Interactive Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-012', 'Cat Shampoo', 'Perfect Shampoo for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-012', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-024', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-022', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-012', 'Small Mammal Food Dish', 'Practical Food Dish for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-013', 'Dog Kibble', 'Premium Kibble for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-013', 'Deluxe Catnip Toy', 'Engaging Catnip Toy for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-013', 'Bird Cage', 'Spacious Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-021', 'Fish Frozen Food', 'Premium Frozen Food for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-122', 'Reptile Substrate', 'Comfortable Substrate for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-013', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-013', 'Dog Joint Supplement', 'Essential Joint Supplement for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-013', 'Cat Litter Box', 'Practical and comfy Litter Box for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-013', 'Bird Bell Toy', 'Stimulating Bell Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-025', 'Fish Aquarium Decor', 'High-quality Aquarium Decor for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-013', 'Reptile Heat Lamp', 'Essential Heat Lamp for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-013', 'Small Mammal Treat Sticks', 'Complete Treat Sticks for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-013', 'Dog Shampoo', 'Gentle Shampoo for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-013', 'Cat Hairball Remedy', 'Specialized Hairball Remedy for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-013', 'Bird Seed Mix', 'Nutritious Seed Mix for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-013', 'Fish Water Conditioner', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-020', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-013', 'Small Mammal Rabbit Hutch', 'Secure and spacious Rabbit Hutch for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-013', 'Dog Collar', 'Stylish and comfortable Collar for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-013', 'Cat Dry Food', 'Delicious Dry Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-013', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-022', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-021', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-013', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-013', 'Dog Interactive Toy', 'Durable and fun Interactive Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-013', 'Cat Shampoo', 'Perfect Shampoo for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-013', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-026', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-023', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-013', 'Small Mammal Food Dish', 'Practical Food Dish for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-014', 'Puppy Food', 'Premium Puppy Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-014', 'Deluxe Scratching Post', 'Engaging Scratching Post for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-014', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-023', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-123', 'Reptile Substrate', 'Comfortable Substrate for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-014', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-014', 'Dog Flea & Tick Treatment', 'Essential Flea & Tick Treatment for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-014', 'Cat Bowl', 'Practical and comfy Bowl for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-014', 'Bird Perch', 'Stimulating Perch for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-027', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-014', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-014', 'Small Mammal Hay', 'Complete Hay for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-014', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-014', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-014', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-014', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEALTH-005', 'Reptile Vitamin Dust', 'Dietary supplement for reptile bone health', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-014', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-014', 'Dog Bed', 'Stylish and comfortable Bed for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-014', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-014', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-024', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-022', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-014', 'Small Mammal Chew Blocks', 'Fun Chew Blocks for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-014', 'Dog Ball', 'Durable and fun Ball for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-014', 'Cat Brush', 'Perfect Brush for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-014', 'Bird Bath', 'Essential Bird Bath for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-028', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-024', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-014', 'Small Mammal Water Bottle', 'Practical Water Bottle for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-015', 'Dog Wet Food', 'Premium Wet Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 497, 4.41, 12.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-015', 'Deluxe Laser Pointer', 'Engaging Laser Pointer for endless cat fun', 'Cat', 'CritterCare Co.', 145, 17.65, 39.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-015', 'Bird Cage', 'Spacious Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 458, 29.21, 57.06);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-HEALTH-005', 'Fish Fungus Treatment', 'Aids in fish recovery from common ailments', 'Fish', 'DeepBlue Aquatics', 211, 23.36, 51.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-015', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'ReptileRealm LLC', 490, 4.56, 13.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-015', 'Paper Bedding', 'Soft and absorbent Paper Bedding for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 179, 14.73, 43.68);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-015', 'Dog Flea & Tick Treatment', 'Essential Flea & Tick Treatment for dog well-being', 'Dog', 'Global Pet Supplies', 170, 23.51, 60.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-015', 'Cat Bed', 'Practical and comfy Cat Bed for cats', 'Cat', 'Nature''s Best Pet', 151, 30.73, 79.16);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-015', 'Bird Swinging Toy', 'Stimulating Swinging Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-029', 'Fish Gravel', 'High-quality Gravel for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-025', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-015', 'Small Mammal Pellets', 'Complete Pellets for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-015', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-015', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-015', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-015', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-222', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-015', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-015', 'Dog Leash', 'Stylish and comfortable Leash for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-015', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-015', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-025', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-023', 'Reptile Frozen Rodents', 'Specialized Frozen Rodents for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-015', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-015', 'Dog Interactive Toy', 'Durable and fun Interactive Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-015', 'Cat Shampoo', 'Perfect Shampoo for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-015', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-030', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-026', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-015', 'Small Mammal Food Dish', 'Practical Food Dish for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-016', 'Dog Kibble', 'Premium Kibble for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-016', 'Deluxe Catnip Toy', 'Engaging Catnip Toy for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-016', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-026', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-027', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-016', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-016', 'Dog Joint Supplement', 'Essential Joint Supplement for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-016', 'Cat Bowl', 'Practical and comfy Bowl for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-016', 'Bird Bell Toy', 'Stimulating Bell Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-031', 'Fish Aquarium Decor', 'High-quality Aquarium Decor for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-016', 'Reptile Heat Lamp', 'Essential Heat Lamp for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-016', 'Small Mammal Hay', 'Complete Hay for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-016', 'Dog Shampoo', 'Gentle Shampoo for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-016', 'Cat Hairball Remedy', 'Specialized Hairball Remedy for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-016', 'Bird Fruit Treats', 'Nutritious Fruit Treats for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-016', 'Fish Water Conditioner', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-223', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-016', 'Small Mammal Rabbit Hutch', 'Secure and spacious Rabbit Hutch for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-016', 'Dog Bowl', 'Stylish and comfortable Bowl for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-016', 'Cat Wet Food', 'Delicious Wet Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-016', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-027', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-024', 'Reptile Frozen Rodents', 'Specialized Frozen Rodents for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-016', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-016', 'Dog Ball', 'Durable and fun Ball for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-016', 'Cat Brush', 'Perfect Brush for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-016', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-032', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-028', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-016', 'Small Mammal Water Bottle', 'Practical Water Bottle for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-017', 'Puppy Food', 'Premium Puppy Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-017', 'Deluxe Scratching Post', 'Engaging Scratching Post for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-017', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-028', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-029', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-017', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-017', 'Dog Joint Supplement', 'Essential Joint Supplement for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-017', 'Cat Bowl', 'Practical and comfy Bowl for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-017', 'Bird Perch', 'Stimulating Perch for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-033', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-017', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-017', 'Small Mammal Hay', 'Complete Hay for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-017', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-017', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-017', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-017', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEALTH-006', 'Reptile Vitamin Dust', 'Dietary supplement for reptile bone health', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-017', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-017', 'Dog Bed', 'Stylish and comfortable Bed for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-017', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-017', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-029', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-025', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-017', 'Small Mammal Chew Blocks', 'Fun Chew Blocks for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-017', 'Dog Ball', 'Durable and fun Ball for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-017', 'Cat Brush', 'Perfect Brush for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-017', 'Bird Bath', 'Essential Bird Bath for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-034', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-929', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-017', 'Small Mammal Water Bottle', 'Practical Water Bottle for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-018', 'Dog Wet Food', 'Premium Wet Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 497, 4.41, 12.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-018', 'Deluxe Laser Pointer', 'Engaging Laser Pointer for endless cat fun', 'Cat', 'CritterCare Co.', 145, 17.65, 39.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-018', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 458, 29.21, 57.06);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-HEALTH-006', 'Fish Fungus Treatment', 'Aids in fish recovery from common ailments', 'Fish', 'DeepBlue Aquatics', 211, 23.36, 51.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-018', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'ReptileRealm LLC', 490, 4.56, 13.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-018', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 179, 14.73, 43.68);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-018', 'Dog Flea & Tick Treatment', 'Essential Flea & Tick Treatment for dog well-being', 'Dog', 'Global Pet Supplies', 170, 23.51, 60.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-018', 'Cat Bed', 'Practical and comfy Cat Bed for cats', 'Cat', 'Nature''s Best Pet', 151, 30.73, 79.16);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-018', 'Bird Swinging Toy', 'Stimulating Swinging Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-035', 'Fish Gravel', 'High-quality Gravel for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-030', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-018', 'Small Mammal Pellets', 'Complete Pellets for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-018', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-018', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-018', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-018', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-225', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-018', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-018', 'Dog Leash', 'Stylish and comfortable Leash for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-018', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-018', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-030', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-026', 'Reptile Frozen Rodents', 'Specialized Frozen Rodents for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-018', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-018', 'Dog Interactive Toy', 'Durable and fun Interactive Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-018', 'Cat Shampoo', 'Perfect Shampoo for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-018', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-036', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-031', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-018', 'Small Mammal Food Dish', 'Practical Food Dish for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-019', 'Dog Kibble', 'Premium Kibble for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-019', 'Deluxe Catnip Toy', 'Engaging Catnip Toy for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-019', 'Bird Cage', 'Spacious Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-031', 'Fish Frozen Food', 'Premium Frozen Food for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-032', 'Reptile Substrate', 'Comfortable Substrate for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-019', 'Paper Bedding', 'Soft and absorbent Paper Bedding for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-019', 'Dog Joint Supplement', 'Essential Joint Supplement for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-019', 'Cat Litter Box', 'Practical and comfy Litter Box for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-019', 'Bird Bell Toy', 'Stimulating Bell Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-037', 'Fish Aquarium Decor', 'High-quality Aquarium Decor for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-019', 'Reptile Heat Lamp', 'Essential Heat Lamp for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-019', 'Small Mammal Treat Sticks', 'Complete Treat Sticks for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-019', 'Dog Shampoo', 'Gentle Shampoo for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-019', 'Cat Hairball Remedy', 'Specialized Hairball Remedy for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-019', 'Bird Seed Mix', 'Nutritious Seed Mix for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-019', 'Fish Water Conditioner', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-126', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-019', 'Small Mammal Rabbit Hutch', 'Secure and spacious Rabbit Hutch for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-019', 'Dog Collar', 'Stylish and comfortable Collar for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-019', 'Cat Dry Food', 'Delicious Dry Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-019', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-032', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-027', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-019', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-019', 'Dog Interactive Toy', 'Durable and fun Interactive Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-019', 'Cat Shampoo', 'Perfect Shampoo for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-019', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-038', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-033', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-019', 'Small Mammal Food Dish', 'Practical Food Dish for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-020', 'Dog Kibble', 'Premium Kibble for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-020', 'Deluxe Catnip Toy', 'Engaging Catnip Toy for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-020', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-033', 'Fish Frozen Food', 'Premium Frozen Food for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-034', 'Reptile Substrate', 'Comfortable Substrate for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-020', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-020', 'Dog Joint Supplement', 'Essential Joint Supplement for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-020', 'Cat Bowl', 'Practical and comfy Bowl for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-020', 'Bird Bell Toy', 'Stimulating Bell Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-039', 'Fish Aquarium Decor', 'High-quality Aquarium Decor for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-020', 'Reptile Heat Lamp', 'Essential Heat Lamp for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-020', 'Small Mammal Hay', 'Complete Hay for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-020', 'Dog Shampoo', 'Gentle Shampoo for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-020', 'Cat Hairball Remedy', 'Specialized Hairball Remedy for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-020', 'Bird Fruit Treats', 'Nutritious Fruit Treats for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-020', 'Fish Water Conditioner', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-127', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-020', 'Small Mammal Rabbit Hutch', 'Secure and spacious Rabbit Hutch for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-020', 'Dog Bowl', 'Stylish and comfortable Bowl for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-020', 'Cat Wet Food', 'Delicious Wet Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-020', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-034', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-028', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-020', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-020', 'Dog Ball', 'Durable and fun Ball for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-020', 'Cat Brush', 'Perfect Brush for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-020', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-040', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-035', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-020', 'Small Mammal Water Bottle', 'Practical Water Bottle for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-021', 'Puppy Food', 'Premium Puppy Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-021', 'Deluxe Scratching Post', 'Engaging Scratching Post for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-021', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-035', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-036', 'Reptile Substrate', 'Comfortable Substrate for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-021', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-021', 'Dog Joint Supplement', 'Essential Joint Supplement for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-021', 'Cat Bowl', 'Practical and comfy Bowl for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-021', 'Bird Perch', 'Stimulating Perch for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-041', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-021', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-021', 'Small Mammal Hay', 'Complete Hay for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-021', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-021', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-021', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-021', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEALTH-007', 'Reptile Vitamin Dust', 'Dietary supplement for reptile bone health', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-021', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-021', 'Dog Bed', 'Stylish and comfortable Bed for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-021', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-021', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-036', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-128', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-021', 'Small Mammal Chew Blocks', 'Fun Chew Blocks for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-021', 'Dog Ball', 'Durable and fun Ball for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-021', 'Cat Brush', 'Perfect Brush for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-021', 'Bird Bath', 'Essential Bird Bath for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-042', 'Fish Filter', 'High-quality Filter for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-236', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-021', 'Small Mammal Water Bottle', 'Practical Water Bottle for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-022', 'Dog Wet Food', 'Premium Wet Food for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 497, 4.41, 12.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-022', 'Deluxe Laser Pointer', 'Engaging Laser Pointer for endless cat fun', 'Cat', 'CritterCare Co.', 145, 17.65, 39.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-022', 'Bird Travel Cage', 'Spacious Travel Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 458, 29.21, 57.06);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-HEALTH-007', 'Fish Fungus Treatment', 'Aids in fish recovery from common ailments', 'Fish', 'DeepBlue Aquatics', 211, 23.36, 51.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-022', 'Reptile UVB Bulb', 'Essential UVB Bulb for reptile environment control', 'Reptile', 'ReptileRealm LLC', 490, 4.56, 13.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-022', 'Wood Shavings', 'Soft and absorbent Wood Shavings for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 179, 14.73, 43.68);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-022', 'Dog Flea & Tick Treatment', 'Essential Flea & Tick Treatment for dog well-being', 'Dog', 'Global Pet Supplies', 170, 23.51, 60.52);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-022', 'Cat Bed', 'Practical and comfy Cat Bed for cats', 'Cat', 'Nature''s Best Pet', 151, 30.73, 79.16);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-022', 'Bird Swinging Toy', 'Stimulating Swinging Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-043', 'Fish Gravel', 'High-quality Gravel for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-037', 'Reptile Terrarium', 'Comfortable Terrarium for thriving reptiles', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-022', 'Small Mammal Pellets', 'Complete Pellets for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-022', 'Dog Nail Clippers', 'Gentle Nail Clippers for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-022', 'Cat Flea & Tick Treatment', 'Specialized Flea & Tick Treatment for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-022', 'Bird Pellets', 'Nutritious Pellets for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-022', 'Fish Algae Remover', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-029', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-022', 'Small Mammal Hamster Cage', 'Secure and spacious Hamster Cage for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-022', 'Dog Leash', 'Stylish and comfortable Leash for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-022', 'Kitten Food', 'Delicious Kitten Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-022', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-037', 'Fish Flakes', 'Premium Flakes for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-030', 'Reptile Frozen Rodents', 'Specialized Frozen Rodents for carnivorous reptiles', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-022', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-022', 'Dog Interactive Toy', 'Durable and fun Interactive Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-022', 'Cat Shampoo', 'Perfect Shampoo for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-022', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-044', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-038', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-ACCESSORIES-022', 'Small Mammal Food Dish', 'Practical Food Dish for daily small mammal care', 'Small Mammal', 'WildLife Essentials', 100, 2.54, 5.14);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-FOOD-023', 'Dog Kibble', 'Premium Kibble for dogs, packed with nutrients', 'Dog', 'PetPal Foods', 170, 24.31, 38.64);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-TOY-023', 'Deluxe Catnip Toy', 'Engaging Catnip Toy for endless cat fun', 'Cat', 'CritterCare Co.', 274, 30.68, 59.98);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-CAGE-023', 'Bird Cage', 'Spacious Cage for a happy bird', 'Bird', 'FeatheredFriends Inc.', 483, 11.23, 17.58);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-038', 'Fish Frozen Food', 'Premium Frozen Food for healthy fish growth', 'Fish', 'DeepBlue Aquatics', 270, 2.76, 5.09);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-338', 'Reptile Substrate', 'Comfortable Substrate for thriving reptiles', 'Reptile', 'ReptileRealm LLC', 121, 15.65, 34.61);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-BEDDING-023', 'Paper Bedding', 'Soft and absorbent Paper Bedding for comfy small mammal', 'Small Mammal', 'MammalMart Intl', 175, 12.87, 30.82);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-HEALTH-023', 'Dog Joint Supplement', 'Essential Joint Supplement for dog well-being', 'Dog', 'Global Pet Supplies', 376, 21.36, 42.13);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-ACCESSORIES-023', 'Cat Litter Box', 'Practical and comfy Litter Box for cats', 'Cat', 'Nature''s Best Pet', 151, 19.98, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-TOY-023', 'Bird Bell Toy', 'Stimulating Bell Toy for playful birds', 'Bird', 'Paws & Claws Corp', 221, 23.36, 68.32);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-045', 'Fish Aquarium Decor', 'High-quality Aquarium Decor for clear fish tanks', 'Fish', 'WildLife Essentials', 119, 39.81, 71.9);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HEATING_LIGHTING-023', 'Reptile Heat Lamp', 'Essential Heat Lamp for reptile environment control', 'Reptile', 'PetPal Foods', 407, 7.82, 19.46);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-FOOD-023', 'Small Mammal Treat Sticks', 'Complete Treat Sticks for small mammal nutrition', 'Small Mammal', 'CritterCare Co.', 128, 23.95, 62.6);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-GROOMING-023', 'Dog Shampoo', 'Gentle Shampoo for a shiny dog coat', 'Dog', 'FeatheredFriends Inc.', 486, 2.08, 4.49);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-HEALTH-023', 'Cat Hairball Remedy', 'Specialized Hairball Remedy for cat health', 'Cat', 'DeepBlue Aquatics', 261, 3.29, 9.87);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-FOOD-023', 'Bird Seed Mix', 'Nutritious Seed Mix for vibrant birds', 'Bird', 'ReptileRealm LLC', 10, 24.38, 51.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-WATER_TREATMENT-023', 'Fish Water Conditioner', 'Keeps fish water pristine and safe', 'Fish', 'MammalMart Intl', 203, 14.54, 30.56);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-330', 'Reptile Pellets', 'Specialized Pellets for carnivorous reptiles', 'Reptile', 'Global Pet Supplies', 26, 21.0, 48.01);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-CAGE-023', 'Small Mammal Rabbit Hutch', 'Secure and spacious Rabbit Hutch for small mammals', 'Small Mammal', 'Nature''s Best Pet', 188, 30.29, 58.74);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-ACCESSORIES-023', 'Dog Collar', 'Stylish and comfortable Collar for dogs', 'Dog', 'Paws & Claws Corp', 222, 18.06, 38.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-FOOD-023', 'Cat Dry Food', 'Delicious Dry Food for picky cat eaters', 'Cat', 'WildLife Essentials', 101, 3.25, 6.77);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-HEALTH-023', 'Bird Vitamin Drops', 'Supportive Vitamin Drops for bird vitality', 'Bird', 'PetPal Foods', 497, 30.08, 68.65);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-FOOD-039', 'Fish Pellets', 'Premium Pellets for healthy fish growth', 'Fish', 'CritterCare Co.', 37, 24.46, 52.12);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-FOOD-031', 'Reptile Live Feeder Insects', 'Specialized Live Feeder Insects for carnivorous repti', 'Reptile', 'FeatheredFriends Inc.', 483, 31.95, 78.89);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('SML-TOY-023', 'Small Mammal Exercise Wheel', 'Fun Exercise Wheel for active small mammals', 'Small Mammal', 'DeepBlue Aquatics', 260, 23.36, 45.45);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('DOG-TOY-023', 'Dog Interactive Toy', 'Durable and fun Interactive Toy for playful dogs', 'Dog', 'ReptileRealm LLC', 290, 39.81, 62.48);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('CAT-GROOMING-023', 'Cat Shampoo', 'Perfect Shampoo for a pristine cat coat', 'Cat', 'MammalMart Intl', 363, 2.5, 6.1);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('BRD-ACCESSORIES-023', 'Bird Feeder', 'Essential Feeder for bird comfort', 'Bird', 'Global Pet Supplies', 170, 27.56, 55.43);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('FSH-TANK_SUPPLIES-046', 'Fish Heater', 'High-quality Heater for clear fish tanks', 'Fish', 'Nature''s Best Pet', 173, 10.97, 26.5);
INSERT INTO lyfter_ecommerce_pets.products (SKU, name, description, target_species, supplier, stock, cost, price) VALUES
('RPT-HABITAT-039', 'Reptile Hiding Spot', 'Comfortable Hiding Spot for thriving reptiles', 'Reptile', 'Paws & Claws Corp', 315, 36.63, 76.54);
