# For all apis:
    1.Dependencies: 
        a. Flask (version 3.1.0)
        b. PyJWT (version 2.10.1)
        c. SQLAlchemy (version 2.0.41)
        d. cryptography (version 45.0.5)
        e. pytest (version 8.4.2)
        f. pytest-mock (version 3.15.1)pip
        g. Others used:
            1. PostgreSQL (version 17.5.1)
            2. pgadmin4 (version 3.13.3)
            3. Postman (version 11.59.1)
            4. Redis 6.4.0

    2.For testing use postman or any other similar
    3.REST API listening in http://localhost:5000/


FROM **app_api.py** (welcome message) run all the others apis:
    a) api_login 
    b) api_admin_users 
    c) api_products 
    d) api_client_info
    e) api_cart
    f) api_invoice


Apis:
a) api_login:
    END POINTS
    1) register (default role client, for creat administrator ):
        i. http://localhost:5000/auth/register (POST)
        ii. body example: {
                            "name": "Michael Jordan",
                            "email": "mj@example.com",
                            "password": "mj23buLLsNC",
                            "phone_number": "8888-1111"
                          }
        iii. return: message="Successful Registration", token(to stay in the session), access token

    2) login an user:  
        i. i. http://localhost:5000/auth/login (POST)
        ii. body example: {
                            "email": "mj@example.com",
                            "password": "mj23buLLsNC"
                          }
        iii. return message="Administrator: Successful Login!" or "User: Successful Login!" depends of the user rol, access token and refresh_token

    3) me authentication:  
        i. http://localhost:5000/auth/me (GET)
        ii. copy access token from register or login then Authorization, Bearer Token, paste token
        iii. return: user id, user name and user role

    4) refresh token: 
        i. http://localhost:5000/auth/refresh-token (POST)
        ii. copy refresh token from login then Authorization, Bearer Token, paste refresh token
        iii. return: new access token


b) api_admin_users:
    * only can be use for administrators
    ** administrate users 
    *** see login history 
    **** read and update invoices
    END POINTS:
    1) create user
        @admin_only
        i. http://localhost:5000/admin/users (POST)
        ii. body example: {
                            "name": "Charle Barkley",
                            "email": "cb@example.com",
                            "password": "Cb34PhoSuns",
                            "phone_number": "1111-1111",
                            "role": "administrator" **default rol is client for registration porpuses**
                            }
        iii. for "create user" is obligatory to declare role
        iv. returns message="Successful saved", user=user_data

    2) create many users
        @admin_only
        i. http://localhost:5000/admin/users/many (POST)
        ii. body example: [{
                            "name": "Charle Barkley",
                            "email": "cb@example.com",
                            "password": "Cb34PhoSuns",
                            "phone_number": "1111-1111",
                            "role": "administrator"
                            }
                            {
                            "name": "John Wall",
                            "email": "jw@example.com",
                            "password": "Jw301WasWiz",
                            "phone_number": "1111-0001"
                            "role": "client"
                            }]
        iii. for "many users" is obligatory to declare role
        iV. returns message="Successful saved", users=users_data

    3) show users
        @admin_only
        i. http://localhost:5000/admin/users (GET)
        ii. show all the users in the db, return a list of all the users
        iii. http://localhost:5000/admin/users?id=3 (GET)
        iV. return all users or return a specific user using query parameters (id, name, email or role), return a specific user or users

    4) update user
        @admin_only
        i. http://localhost:5000/admin/users/<user_id> (PATCH)
        ii. column always should be id, if´s not raise ValueError
        iii. body example: {
                            "email": "JW@example.com",
                            "password": "Jw001WasWiSS"
                            "phone_number": "9999-5555"
                            }
        iv. only can update email, password or phone_number, can update only one column if it´s necessary
        v. returns "Successful updated"

    5) delete user
        @admin_only
        i. http://localhost:5000/users/<user_id> (DELETE)
        ii. column always should be id, if´s not raise ValueError
        iii delete an specific user 
        iv. returns "Successful deleted"
        v. **this end point, shouldn't be use, cause all the correlations between db tables, actually gonna receive error messages. This could be useful if an user was created with an error and has no activity yet.**

    6) show login history
        @admin_only
        i. http://localhost:5000/admin/users/login-history?user_id=2 (GET)
        ii. show all the login history in the db, return a list of all logins
        iii. http://localhost:5000/users/login-history?user_id=2 (GET)
        iV. return all logins or return a specific login from an user, can filter logins by failed o sucessfuly, using query parameters (id, user_id, ip_address or login_status)

    7) delete a login
        @admin_only
        i. http://localhost:5000/admin/users/<user_id> (DELETE)
        ii. delete a specific login from login history 
        iii. returns "Successful deleted"
        iv. **this end point, shouldn't be use, cause all the correlations between db tables and it is not good practice to alter important information.

    8) show invoices
        @admin_only
        i. http://localhost:5000/admin/invoices (GET)
        ii. show all invoices
        iii. http://localhost:5000/admin/invoices?id=2 (GET)
        iv. show all info of specific invoice by id
        V. returns (invoice=formatted_invoice, invoice_details=formatted_invoice_details, user=user_name), 200

    9) update invoice
        i. http://localhost:5000/admin/invoices/<invoice_id> (PATCH)
        ii. body example: {
                                "product_id": 9,
                                "quantity": 1,
                                "discount_rate": 10.00
                            }
            discount rate is optional **very important: if no discount rate, default is 0% no mattter if a discount in the original invoice, if there's a new discount gonna overwrite the original one**
        iii. update product stock, update products in cart, update invoice (subtotal, discount, invoice total), update invoice details
        iv. returns (message="Invoice updated", invoice=invoice_id), 200


c) api_products:
    * administrators can use all end points (administrate products)
    ** show_products is open for administrators, clients and any visitor
    END POINTS:
    1) create product
        @admin_only
        i. http://localhost:5000/products (POST)
        ii. body example:{
                            "SKU": "DOGG-FOOD-001",
                            "name": "Canine Complete Chicken",
                            "description": "Premium dry food with real chicken for adult dogs",
                            "target_species": "dog",
                            "supplier": "PetPro Supplies",
                            "stock": 120,
                            "cost": 25.50,
                            "price": 49.99
                            }
        iii. delete cache
        iV. message="Successful saved", product=formatted_data, 200

    2) create many products
        @admin_only
        i. http://localhost:5000/products/many (POST)
        ii. body example:[
                            {
                                "SKU": "DOGG-FOOD-001",
                                "name": "Canine Complete Chicken",
                                "description": "Premium dry food with real chicken for adult dogs",
                                "target_species": "dog",
                                "supplier": "PetPro Supplies",
                                "stock": 120,
                                "cost": 25.50,
                                "price": 49.99
                            },
                            {
                                "SKU": "CATT-TOY-001",
                                "name": "Feather Wand Teaser",
                                "description": "Interactive feather wand to engage your cat",
                                "target_species": "cat",
                                "supplier": "HappyPaws Co.",
                                "stock": 250,
                                "cost": 2.25,
                                "price": 5.49
                            }
                        ]
        iii. delete cache
        iv. returns (message="Products have been successfully saved", products=products_data_list), 200

    3) show products
        **Open, anyone can use visitors, clients, admins
        i. http://localhost:5000/products (GET)
        ii. show all the products in the db, return a list of all the products
        iii. http://localhost:5000/products?id=3 (GET)
        iv. create paging cache, cache by id and all products cache
        v. return a specific product or products using query parameters (id, SKU, name, target_species or supplier), return a specific contact or contacts

    4) update product
        @admin_only
        i. http://localhost:5000/products/<product_id> (PATCH)
        ii. body example: {
                            "supplier": "Raws Co.",
                            "stock": 150,
                            "cost": 1.5,
                            "price": 3.49
                            }
        iii. can update description, supplier, stock, cost and price, can update only one column if it´s necessary
        iv. delete cache by id, page (where is the id) and all products cache
        iv. returns "Successful updated"

    5) delete product
        @admin_only
        i. http://localhost:5000/admin/products/<product_id> (DELETE)
        ii delete an specific product 
        iii. delete all paging cache, cache id and all products cache
        iv. returns "Successful deleted"
        v. **this end point, shouldn't be use, because all the correlations between db tables, actually gonna receive error messages.


d) api_client_info:
    * clients can update or delete his own info
    END POINTS:
    1) show personal data
        @client_only
        i. http://localhost:5000/client/info/personal-data (GET)
        ii. return formatted user, 200 (the personal data belongs to the user logged)

    2) update personal data
        @client_only
        i. http://localhost:5000/client/info/personal-data (PATCH)
        ii. body example: {
                            "email": "bigwilson@lyfter.com",
                            "password": "wil11",
                            "phone_number": "2221-2424"
                            }
        iii. can update email, password, phone_number. Can update only one column if it´s necessary
        iv. returns "Successful updated"  

    3) create shipping address
        @client_only
        i. http://localhost:5000/client/info/shipping-addresses (POST)
        ii. body example:   {
                                "address": "Condominio Monte Verde",
                                "canton": "Santa Bárbara",
                                "province": "heredia",
                                "postal_code": "40201"
                            }
        iii.  return (message=f"{user_name} your shipping address has been successfully saved", address=formatted_address), 200

    4) create many shipping addresses
        @client_only
        i. http://localhost:5000/client/info/shipping-addresses/many (POST)
        ii. body example:[
                                {
                                "user_id": 2,
                                "address": "Urbanización San Rafael",
                                "canton": "Goicoechea",
                                "province": "san_jose",
                                "postal_code": "10801"
                                },
                                {
                                "user_id": 2,
                                "address": "Residencial La Floresta",
                                "canton": "La Unión",
                                "province": "cartago",
                                "postal_code": "30301"
                                }
                        ]
        iii. return jsonify(message=f"{user_name} your shipping addresses have been successfully saved", addresses=addresses_data_list), 200

    5) show shipping addresses
        @client_only
        i. http://localhost:5000/client/info/shipping-addresses (GET)
        ii. show all the addresses that belongs to the user logged, returns a list of addresses
        iii. http://localhost:5000/shipping-addresses?id=3 (GET)
        iV. returns a specific address  using query parameters (id, user_id), 

    6) update shipping address
        @client_only
        i. http://localhost:5000/client/info/shipping-addresses/<address_id> (PATCH)
        ii. body example: {
                            "address": "Residencial La Floresta",
                            "canton": "La Unión",
                            "province": "Cartago",
                            "postal_code": "30301"
                            }
        iii. can update address, canton, province, postal_code. Can update only one column if it´s necessary
        iv. returns "Successful updated"

    7) delete shipping address
        @client_only
        i. http://localhost:5000/client/info/shipping-addresses/<address_id> (DELETE)
        ii delete an specific shipping address
        iii. returns "Successful deleted"
        iv. **this end point, shouldn't be use, because all the correlations between db tables, actually gonna receive error messages.


e) api_cart:
    * used for clients to fill carts and update cart items
    END POINTS:
    1) create cart and fill it
        @client_only
        i. http://localhost:5000/cart (POST)
        ii. body example:   {
                                "product_id": 15,
                                "quantity": 4
                            }
        iii. validate if product exits (1st in cache if not in DB)
        iv. look for a pending cart, if not create a new cart
        v. update product stock 
        vi. delete cache
        vii. returns (message="Product added to shopping cart", user=user_name), 200

    2) show current user's pending cart
        @client_only
        i. http://localhost:5000/cart (GET)
        ii. shows info, owner and items of a current shopping cart
        returns (cart=cart, cart_details=cart_details, user=user_name), 200 

    3) update cart
        @client_only
        i. http://localhost:5000/cart/item (PATCH)
        ii. body example: {
                                "product_id": 15,
                                "quantity": 2,
                            }
        iii. update product stock
        iv. delete cache
        iii. updates an item's quantity, if updates to quantity 0, delete the item in the cart (updates item´s stock)
        iv. returns (message="Cart item updated", user=user_name), 200

    4) deletes cart item
        @client_only
        i. http://localhost:5000/cart/item/<product_id> (DELETE)
        ii updates product stock
        iii delete cache
        ii deletes a specific item in cart
        iii. returns (user=user_name, message="Product removed from cart"), 200


f) api_invoice:
    * endpoints for clients
    ** create a invoice based on a "pending" cart
    *** customer can see invoices
    END POINTS:
    1) create_invoice
        @client_only
        i. http://localhost:5000/invoice (POST)
        ii. body example:   {
                                "shipping_address_id": 5,
                                "shipping_method": "express",
                                "payment_method": "credit_card",
                                "discount": 10.00
                            }
        iii. Calculations using the transactions module to complete the rest of the necessary invoice information.
        iv. Creates invoice_details
        v. returns (message="Invoice created successfully", invoice=invoice, user=user_name), 200

    2) show current user's pending cart
        @client_only
        i. http://localhost:5000/invoice (GET)
        ii.1. shows all invoices of the current client logged
        ii.2. returns (invoices=formatted_invoices, user=user_name), 200
        iii.1. http://localhost:5000/invoice?id=3 (GET)
        iii.2. select the invoice, verifying that the logged user is the owner
        iii.3. get invoice_details for that specific invoice
        iii.4. returns (invoice=formatted_invoice, invoice_details=formatted_invoice_details, user=user_name), 200


NOTES:
    1) all endpoints using decorator authenticator for verify user's role, cache user data for 15 minutes