# For all apis:
    1.Dependencies: 
        a. Flask (version 3.1.0)
        b. PyJWT (version 2.10.1)
        c. SQLAlchemy (version 2.0.41)
        d. cryptography (version 45.0.5)
        e. Others used:
            1. PostgreSQL (version 17.5.1)
            2. pgadmin4 (version 3.13.3)
            3. Postman (version 11.59.1)

    2.For testing use postman or any other similar
    3.REST API listening in http://localhost:5000/


FROM **app_api.py** (welcome message) run all the others apis:
    a) api_login
    b) api_buying
    c) api_admin
    d) api_fruits
    e) api_users
    d) api_cart_invoice


Apis:
a) api_login:
    END POINTS
    1) register (default role client, for create an administrator api_users, create_user):
        i. http://localhost:5000/register (POST)
        ii. body example: {
                            "name": "Michael Jordan",
                            "email": "mj@example.com",
                            "password": "mj23buLLsNC"
                          }
        iii. return: message="Successful Registration", token(to stay in the session)

    2) login an user:  
        i. i. http://localhost:5000/login (POST)
        ii. body example: {
                            "email": "mj@example.com",
                            "password": "mj23buLLsNC"
                          }
        iii. return message="Administrator: Successful Login!" or "Client: Successful Login!" depends of the user rol, token(to stay in the session)

    3) me authentication:  
        i. http://localhost:5000/me (GET)
        ii. copy token from register or login then Authorization, Bearer Token, paste token
        iii. return: user id, user name and user role


**all end points for api_buying use a decorator @all_users authenticate that the user is a client or administrator, this decorator works same as "me" (module decorator_authenticator)**
b) api_buying:
    END POINTS:
    1) show fruits
        i. http://localhost:5000/buy/fruits (GET)
        ii. show all the fruits in the db, return a list of all the fruits
        iii. http://localhost:5000/buy/fruits?name=apple (GET)
        iV. return a specific fruit using query parameters (id or name), return a specific fruit

    2) get fruit
    i. http://localhost:5000/buy/fruits/<column>/<value> (GET)
    ii. return a specific fruit using path parameters (columns allow id or name), return a specific fruit

    3) cart creation
    i. http://localhost:5000/buy/fruits (POST)
    ii. body example: {
                        "fruit_id": 1,
                        "quantity": "15"
                        }
    iii. search for "pending carts" of the current user, if no "pending" cart creates a new cart, then save the fruit in "fruits in cart", but first validate the quantity of the fruit (enought quantity in the storage)
    iv. fruits are included one by one
    v. message="Cart updated" and user name

    4) show cart pending
    i. http://localhost:5000/buy/carts (GET)
    ii. show the cart of the user is in session and has status "pending"
    iii. if not exists any pending cart of the user, returns message="No pending cart found", user=user_name
    iv. if exists pending cart, returns cart, cart details and user name
    v. return cart=cart, cart_details=cart_details, user=user_name

    5) update cart
    i. http://localhost:5000/buy/carts (PATCH)
    ii. body example: {
                        "id": 1, -- this "id" is the fruit in cart
                        "quantity": "15" -- the quantity of the fruit of that id
                        }
    iii. search the cart that is correlate with id fruit in cart, check the cart status is still pending, if not pending raise a ValueError("The shopping cart has already been processed and completed."), if the cart is pending take this new quantity make the validations wiht the fruit storage and finally update the fruit in the cart.
    iv. return message="Cart updated", quantity=new_quantity, user=user_name

    6) create invoice
    i. http://localhost:5000/buy/carts (PATCH)
    ii. body example: {
                        "shipping_address": "San José, Hatillo 6 casa 7.1"
                        }
    iii. search the pending cart using g.user_id, create the invoice (invoice_total=0) , recolect that data for create the invoice details (invoice_id and fruits in cart), calculate each item_total and finally udpate the invoice_total in the invoice. 
    iv. return message="Invoice Ready!", invoice=invoice_id, user=user_name

    7) get invoices
    i. http://localhost:5000/buy/invoices (GET)
    ii. return all the invoices of g.user_id. message="Your invoices:", invoices, invoice_details, user=user_name


**api_fruits and api_users have the same structure (CRUD, basically only changes the necessary body for Create or Update)**
**all endpoints for these apis only can be used by a user with role administrator, (EXCEPTIONS SHOW_FRUITS AND GET_FRUIT these are open to visitors) the authentication is do it with @admin_only decorator, this decorator works same as "me" (module decorator_authenticator)**
c) api_fruits:
    END POINTS:
    1) create fruit
    i. http://localhost:5000/fruits (POST)
    ii. body example: {
                        "name": "apple",
                        "price": 0.99,
                        "entry_date": "2025-08-19",
                        "quantity": 500
                        }
    iii. invalidate last page cache
    iv. returns message="Successful saved", fruit=fruits_data

    2) create many fruits
    i. http://localhost:5000/fruits/many (POST)
    ii. body example: [{
                        "name": "apple",
                        "price": 0.99,
                        "entry_date": "2025-08-19",
                        "quantity": 500
                        }
                        {
                        "name": "orange",
                        "price": 0.35,
                        "entry_date": "2025-08-19",
                        "quantity": 2000
                        }]
    iii. returns message="Successful saved", fruit=fruits_data

    3) show fruits
        i. http://localhost:5000/fruits (GET)
        ii. show all the fruits in the db, return a list of all the fruits
        iii. http://localhost:5000/fruits?page=1 (GET)
        iv. create or access cache of a specific page
        v. http://localhost:5000/fruits?id=15 (GET)
        vi. iv. create or access cache of a specific fruit by id
        vii. http://localhost:5000/fruits?name=apple (GET)
        viii. return a specific fruit using query parameters (id or name), return a specific fruit

    4) get fruit
    i. http://localhost:5000/fruits/<column>/<value> (GET)
    ii. return a specific fruit using path parameters (columns allow id or name), return a specific fruit

    5) update fruit
    i. http://localhost:5000/fruits/<id_value> (PATCH)
    ii. body example: {
                        "price": 0.99,
                        "entry_date": "2025-08-19",
                        "quantity": 700
    iii. id or name can´t be updated, can update only one column if it´s necessary
    iv. invalidate indiviual cache by id and invalidate a page of cache where is the id
    v. returns "Successful updated"

    6) delete fruit
    i. http://localhost:5000/fruits/<id_value> (DELETE)
    ii. delete a specific cache by id and all the pages of cache
    iii  returns "Successful deleted"
    iv. **this end point, shouldn't be use, cause all the correlations between db tables, actually gonna receive error messages, could be helpfull if a fruit was create it with an error and no have no activity yet**


d) api_users:
    END POINTS:
    1) create user
    i. http://localhost:5000/users (POST)
    ii. body example: {
                        "name": "Charle Barkley",
                        "email": "cb@example.com",
                        "password": "Cb34PhoSuns",
                        "rol": administrator **default rol is client for registration porpuses**
                        }
    iii. returns message="Successful saved", user=user_data

    2) create many users
    i. http://localhost:5000/users/many (POST)
    ii. body example: [{
                        "name": "Charle Barkley",
                        "email": "cb@example.com",
                        "password": "Cb34PhoSuns",
                        "rol": administrator
                        }
                        {
                        "name": "John Wall",
                        "email": "jw@example.com",
                        "password": "Jw301WasWiz"
                        }]
    iii. returns message="Successful saved", users=users_data

    3) show users
        i. http://localhost:5000/users (GET)
        ii. show all the users in the db, return a list of all the users
        iii. http://localhost:5000/users?id=3 (GET)
        iV. return a specific user using query parameters (id, rol or name), return a specific user or users

    4) get user
    i. http://localhost:5000/fruits/<column>/<value> (GET)
    ii. return a specific user using path parameters (columns allow id rol or name), return a specific user

    5) update user
    i. http://localhost:5000/users/<column>/<value> (PATCH)
    ii. body example: {
                        "email": "JW@example.com",
                        "password": "Jw001WasWiSS"
                        }
    iii. only can update email or password, can update only one column if it´s necessary
    iv. returns "Successful updated"

    6) delete user
    i. http://localhost:5000/users/<column>/<value> (DELETE)
    ii iv. returns "Successful deleted"
    iii. **this end point, shouldn't be use, cause all the correlations between db tables, actually gonna receive error messages, could be helpfull if an user was create it with an error and no have no activity yet**


**all end points for these apis only can be used by a user with role administrator, the authentication is do it with @admin_only decorator, this decorator works same as "me" (module decorator_authenticator)**
e) api_cart_invoice:
    END POINTS:
    1) show carts
        i. http://localhost:5000/admin/carts (GET)
        ii. show all the carts in the db, return a list of all the carts

    2) get cart
    i. http://localhost:5000/admin/carts<column>/<value> (GET) (columns allow only id)
    ii. return a specific cart using path parameters 

    3) show invoices
    i. http://localhost:5000/admin/invoices (GET)
    ii. show all the invoices in the db

    4) get invoice
    i. http://localhost:5000/admin_invoices<column>/<value> (GET) (columns allow only id)
    ii. return a specific invoice using path parameters (columns allow only id)

    **this endpoint if for a customer that need a change in his invoice**
    5) update cart and invoice 
    i. http://localhost:5000/admin/cart_invoice/<column>/<value> (PATCH (columns allow only id)
    ii. body example: {
                        "id": 1, -- this "id" is the fruit in cart
                        "quantity": "15" -- the quantity that want be change it
                        }
    iii. search the cart that is correlate with id fruit in cart,, if not pending raise a ValueError("Missing fruit_id or fruit quantity"), next validations are make with the new quantity and the fruit storage and finally update the fruit in the cart, update the invoice details and item total and finally the invoice total.
    iv. invoice=invoice_id, message="Successful updated"
    v. **delete is not included for correlations in db but could be include, the process should be: 1. delete invoice_details, delete_invoice, delete fruits_in_cart details, update fruits(storage) and last delete the cart.**


**IMPORTANT for Value Error, Exceptions and Server Erros, all these these types of returns exits in the different methods and functions and are call it from different modules and in different endpoints, for example in module orms_queries.py exist a decorator with possible errors**
        except IntegrityError as error:
            print("\033[91mIntegrity error:\033[0m", error)
            msg = str(error.orig) if hasattr(error, 'orig') else str(error)
            raise ValueError(f"Integrity error: {msg}")

        except ProgrammingError as error:
            print("\033[91mSyntax error:\033[0m", error)
            msg = str(error.orig) if hasattr(error, 'orig') else str(error)
            raise ValueError(f"Syntax error: {msg}")

        except OperationalError as error:
            print("\033[91mConnection error:\033[0m", error)
            msg = str(error.orig) if hasattr(error, 'orig') else str(error)
            raise ConnectionError(f"Connection error: {msg}")

        except DatabaseError as error:
            print("\033[91mDatabase error:\033[0m", error)
            msg = str(error.orig) if hasattr(error, 'orig') else str(error)
            raise ValueError(f"Database error: {msg}")
        
        except SQLAlchemyError as error:
            print("\033[91mSQLAlchemy error:\033[0m", error)
            msg = str(error.orig) if hasattr(error, 'orig') else str(error)
            raise RuntimeError(f"SQLAlchemy error: {msg}")

        except ValueError as error:
            print("\033[91mValue error:\033[0m", error)
            raise

        except Exception as error:
            print("\033[91mUnexpected error:\033[0m", error)
            raise RuntimeError(f"Unexpected error: {str(error)}")
**error like IntegrityError happens when you try to do something that the constraints of a table don´t allow like overwrite a primary key. Other case is the login end point that calls get_user_by_credentials in repository_users and this calls complete_info from validations module.**
        except ValueError as error:
        msg = str(error)
        if "Info missing required" in msg:
            return jsonify(error = msg), 422
        elif "Wrong credentials" in msg:
            return jsonify(error = msg), 403
        else:
            return jsonify(error = msg), 400
    except Exception as error:
        return jsonify(error = str(error)), 500


**NOTE: api_admin was an idea to make an api to call other apis using library requests but that response was slow, therefore it was discarded, however I left the beginning of the code as a sample**



