0. La primera observación es que en la mayoría de las columnas se repiten o se podrían repetir datos, lo que nos da una guía para iniciar la normalización.

1. Las columnas referentes a customer (Customer Name, Customer Phone y Address), no dependen de la Columna Order ID, por lo cual se pueden separar en una tabla aparte en este caso llama "Customers" y "Adresses".

2. Item_ID conforma una llave compuesta con Order_ID, la cual evitaremos para eliminar la dependencia parcial de las columnas que estan relacionadad con el Item ID (Item ID, Item Name y Price) formando una nueva tabla Menu_Items y dejando las columnas Quantity y Special Request para una futura tabla a llamar "Order Details".

4. La tabla "Orders" queda con tres columna su propia ID, Customer ID, Adress ID y Delivery Time que depende de la Order_ID.

5. Finalmente creamos una tabla cruzada Orders Details donde hay dos relaciones de 1:N (Order_ID y  Items_ID, también se podría incluir una columna que nos diga el precio total por item, si quisieramos) a esta tabla se le agregan dos columnas que aparecen en la tabla original de orders que son Quantity y Order Details.