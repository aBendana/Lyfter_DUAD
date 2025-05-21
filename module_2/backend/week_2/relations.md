Relaciones:

1.	La tabla PRODUCTS se relaciona de manera (N:N) con la tabla INVOICES, un producto puede existir en varias facturas y una factura puede tener varios productos

2.	La tabla PRODUCTS se relaciona de (1:N) con INVOICE_DETAILS, un producto puede existir en diferentes detalles de una factura, pero ese detalle es único para cada producto.

3.	La tabla INVOCIES se relaciona de (1:N) con INVOICE_ DETAILS, una factura puede tener diferente detalle de productos y su respectiva cantidad, pero ese especifico detalle es único para cada factura.

4.	La tabla PRODUCTS se relaciona de manera (N:N) con la tabla CART, un producto puede existir en varios carritos de compra y un carrito de compras puede tener varios productos.

5.	La tabla PRODUCTS se relaciona de (1:N) con PRODUCTS_IN CART, un tipo de producto puede existir en diferentes carritos, pero un específico producto(s) (tomando en cuenta que se puede incluir 1 o más del mismo tipo) solo puede existir en un carrito.

6.	La tabla CART se relaciona de (1:N) con PRODUCTS_IN CART, un carrito puede tener varios detalles de los productos que contiene, pero ese detalle específico del carrito es solo para dicho carrito de compras.

7.	Finalmente, y aunque en los diagramas no se incluyó si se pidiera crear una relación entre la tabla CART y la tabla INVOCIES sería una relación (1:1), basándonos en que un carrito puede generar una única factura. Se puede agregar en la tabla INVOCIES una columna con el FK Cart_ID
