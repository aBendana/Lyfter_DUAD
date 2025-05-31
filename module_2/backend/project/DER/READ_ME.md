1. En la tabla "users" para que un email no se repita, la tabla se debe crear con la restricción UNIQUE en la columna "email".

2. Para que un user tenga múltiple roles se crea una tabla cruz entre la tabla "users" y la tabla "rol_types".

3. En la tabla "products" para que un SKU no se repita, la tabla se debe crear con la restricción UNIQUE en la columna "SKU".

4. Los usuarios pueden tener múltiples carritos pero un carrito solo puede tener un usuario, relación (1:N).

5. La tabla en cruz "products_in_cart" muestra la relación (N:N) entre "carts" y "products"

6. La tabla "carts" tiene una relación (1:1) con la tabla "invoices", por cada carrito solo puede existir un factura, cuando la venta esta finalizada el "status" del carrito pasaría a ser "invoiced" con la columna "status" es BOOLEAN sería al equivalente a un 0.

7. Para logar que un usuario solamente tenga un carrito activo se debe hacer por medio de lógica, por lo investigado sería con un TRIGGER ya que un usuario puede tener varios carritos que ya fueron procesados y quedaron inactivos.

8. Las facturas solo pueden tener un usuario pero los usuarios pueden tener varias facturas. Relación (1:N) de la tabla "users" hacia la tabla "invoices"