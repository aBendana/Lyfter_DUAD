GENERAL DESCRIPTION:

1. The project works and save data with PostgreSQL.

2. The way to access, write and read to db is with the module orms_queries

3. Connection to db is do it with db_connection, this module connects via a URI that is hidden in a .env file, which is not uploaded to the repository.

4. The api_login works with jwt_manager coding and decoding users. Works with private and public keys (R256 algorithim), which are not uploaded to the repository.

5. Counts with login history.

6. Counts with repositories from each table in the db. These repositories use orms_queries module and validations module to make CRUD and depends of the needs the repository can have more methods.

7. Transactions module manage the maths and stock of carts, invoices and products.

8. Uses Redis for cache products (endpoints that get products and cache is deleted in different endpoints: create, update and delete) and caches info of users once in login.

9. APIs: 
    a) api_login: register, login, me and refresh token. **decorator_authenticator module used for manage roles**
    
    b) api_admin_users: endpoints only permits users with administrator role, CRUD of users, reads login history, show invoices, and can update an invoice if it's necessary.
    
    c) api_products: CRUD of products for administrator, except for show products, this endpoint is open for visitors, admins and register clients.

    d) api_client_info: onlyf for clients, show and update personal data and CRUD for theirs shipping addresses

    e) api_cart: endpoints for clients create, fill, show and update (products in cart) pending cart of the client logged.

    f) api_invoices: for clients, create invoice and invoice details taking base of pending cart and the products in it, can show invoices and specific invoice with it invoice details.

    g) api_app: manage all apis through blueprints.

