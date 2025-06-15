0. La primera observación es que en varias las columnas se repiten datos, lo que nos da una guía para iniciar la normalización.

1. Owner_ID conforma una llave compuesta con VIN, la cuál sería la llave única para Cars, la cual evitaremos para eliminar la dependencia parcial de las columnas que estan relacionadad con el Owner ID (Owner ID, Owner Name, Owner_Phone), formando una nueva tabla Owners

2. Las columnas referentes al modelo del carro (Make, Model, Year y Color), no tienen que ver estrictamente con el VIN del auto, por lo cual se pueden separar en una tabla aparte en este caso llama "Models".

3. Models a su vez se pude descomponer en diferentes tablas tomando en cuenta que las columnas Make, Year y Color se pueden repetir indefinademente en los diferents modelos, como ejemplo se agregaron mas filas en todas estas tablas, esta versitavilidad nos permitira reutilizar estas caractericticas sin necesidad de crear y utilizar espacios extras e innecesarios en la base de datos (consumiendo memoria). Cabe mencionar y es importante que aunque el nombre del modelo se puede repetir varias veces, es una cualidad que es mas exclusiva especialmente en la relación con el Maker.

4. Las columnas Insurance Company y Insurance Policy son dependencias transitivas, lo cual nos permite crear la tabla Insurances Policies, con una relación de 1:N de Insurance Company a Insurance Policy (las Insurance Policy solo pueden tener un sola identificación).

5. Finalmente creamos una tabla cruzada CARS_OWNERS_INSURANCE_POLICIES donde hay relaciones de 1:N (Car_ID, Owner_ID y Insurance_Policy_ID). Esta es la tabla que nos permite relacionar los tres aspectos que son mencionados en la tabla Cars inicial
