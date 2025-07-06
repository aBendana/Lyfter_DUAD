1. Se crearon todo tipo de consultas por tabla, utilizando también JOINs del tipo INNER, LEFT y RIGHT según el diagrama ER.

2. Algunos de estos queries no devuelven ningún valor, lo cuál es correcto para ciertas consultas por ejemplo: se espera que en la table invoice_details al hacer un RIGHT JOIN con la tabla invoices, no exista ningún valor de invoice_id en NULL, pero por otro lado haciendo un LEFT JOIN de products con invoice_details si esperamos que muchos productos no esten en ningún invoice details, osea que el id de invoice_details es NULL junto con los otros atributos.

3. En la parte 4 (db_screenshots), veremos algunas tomas en la base de datos de los queries de la parte.