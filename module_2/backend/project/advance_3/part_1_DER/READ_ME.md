Normalización:

1. Con respecto a la versión original de la tabla users, eliminamos la columna user_id es una redundancia con respecto a la PK 'id', una llave compuesta innecesaria.

2. La columna 'address' de la tabla users fue eliminada, contamos con la tabla shipping_addresses donde un mismo user puede tener varias direcciones. La tabla de 'shipping_adresses' se divide en varias columnas aplicando datos atómicos indivisibles.

3. Con respecto a la tabla 'rol_types' y la tabla cruz "user_rol_types", han sido eliminadas, solo se utilizaran dos tipos de roles en la base de datos, por lo cuál es innecesario tener estas tablas.

4. En la tabla 'invoices' contabamos con una dependencia parcial que no pertenecía a la tabla en sí. Con una FK user_id y una referencia a email, lo cuál es incompletamente innecesario por lo cuál la columna email fue eliminada, en todo caso se podría hacer referencia al email por medio del FK del 'user_id'.

5. Las tablas cuentan con un solo 'id' y sus columnas son propiedades referentes a su descripción ('id'). Por ejemplo la tabla users cuenta con las columnas:  PK id, name, e_mail, password, phone_number, rol_type, todas propiedades únicas de un user.


Relaciones:

1. users con:
    carts (1:N)
    invoices (1:N)
    shipping_addresses (1:N)

2. products con:
    products_in_cart (1:N)
    invoice_details (1:N)

3. carts con:
    products_in_cart (1:N)
    invoices (1:1)

4. products_in_cart:
    tabla cruz (N:N), Relaciona N productos con N carritos

5. invoices con:
    invoice_details (1:N)


Este DER permite:
    1. Usuario con rol type: administrator o client
    2. Registro de usuarios con diferentes direcciones.
    3. Carrito de compras (en progreso o finalizado).
    4. Facturación detallado.
    5. Historial de pedidos (invoices, carts).
    6. Validación en stock y otros detalles precios, impuestos, y costos por producto.
    7. Multi-producto por carrito y por factura.
