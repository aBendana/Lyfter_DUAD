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
    b) api_users
    c) api_contacts  


Apis:
a) api_login:
    END POINTS
    1) register (default role client, for creat administrator ):
        i. http://localhost:5000/register (POST)
        ii. body example: {
                            "name": "Michael Jordan",
                            "email": "mj@example.com",
                            "password": "mj23buLLsNC"
                          }
        iii. return: message="Successful Registration", token(to stay in the session), access token

    2) login an user:  
        i. i. http://localhost:5000/login (POST)
        ii. body example: {
                            "email": "mj@example.com",
                            "password": "mj23buLLsNC"
                          }
        iii. return message="Administrator: Successful Login!" or "User: Successful Login!" depends of the user rol, access token and refresh_token

    3) me authentication:  
        i. http://localhost:5000/me (GET)
        ii. copy access token from register or login then Authorization, Bearer Token, paste token
        iii. return: user id, user name and user role

    4) refresh token:  
        i. http://localhost:5000/me (POST)
        ii. copy refresh token from login then Authorization, Bearer Token, paste token
        iii. return: new access token



**api_users have structure CRUD**
**all end points from api_users only can be used by a user with role administrator, the authentication is do it with @admin_only decorator, this decorator works same as "me" (module decorator_authenticator)**
b) api_users:
    END POINTS:
    1) create user
    i. http://localhost:5000/users (POST)
    ii. body example: {
                        "name": "Charle Barkley",
                        "email": "cb@example.com",
                        "password": "Cb34PhoSuns",
                        "rol": administrator **default rol is cb_user for registration porpuses**
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
        iV. return all users or return a specific user using query parameters (id, name, email or role), return a specific user or users

    4) get user
    i. http://localhost:5000/users/<column>/<value> (GET)
    ii. return a specific user using path parameters (id, name, email or role), return a specific user or users

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
    ii delete an specific user 
    iii. returns "Successful deleted"
    iv. **this end point, shouldn't be use, cause all the correlations between db tables, actually gonna receive error messages. This could be useful if an user was created with an error and has no activity yet.**

    7) show login history
    i. http://localhost:5000/users/login-history?user_id=2 (GET)
    ii. show all the login history in the db, return a list of all logins
    iii. http://localhost:5000/users/login-history?user_id=2 (GET)
    iV. return all logins or return a specific login from an user, can filter logins by failed o sucessfuly, using query parameters (id, user_id, ip_address or login_status)

    8) delete a login
    i. http://localhost:5000/users/id/3 (DELETE)
    ii. delete a specific login from login history 
    iii. returns "Successful deleted"
    iv. **this end point, shouldn't be use, cause all the correlations between db tables and it is not good practice to alter important information.



**api_contacts for administrator (admin) and contact book users (cb_user) have structure CRUD**
**all end points from api_contacts/cb_user only can be used by a user with role cb_user, the authentication is do it with @cb_user_only decorator. Only can create, manipulate or modify his own contacts**
**all end points from api_contacts/admin only can be used by a user with role administrator, the authentication is do it with @admin_only decorator. Can create, manipulate or modify any contact**
**descripton of all end points it will be dual for both admin and cb_user**
c) api_contacts:
    END POINTS:
    1) create contacts
    i. http://localhost:5000/contacts/admin or /cb_user (POST)
    ii. body example: {
                        "user_id": 2
                        "name": "Charles Barkley",
                        "phone_number": "8080-8080" 
                        "email": "cb@example.com"
                        }
    iii. returns message="Successful saved", contact=contact_data

    2) create many contacts
    i. http://localhost:5000/contacts/admin or /cb_user/many (POST)
    ii. body example: [{
                        "user_id": 2
                        "name": "Charles Barkley",
                        "phone_number": "8080-8080" 
                        "email": "cb@example.com"
                        }
                        {
                        "user_id": 2
                        "name": "Carlos Barklii",
                        "phone_number": "8080-8888" 
                        "email": "cb888@example.com"
                        }]
    iii. returns message="Successful saved", contacts=contacts_data

    3) show contacts
        i. http://localhost:5000/contacts/admin or /cb_user (GET)
        ii. show all the contacts in the db, return a list of all the users
        iii. http://localhost:5000/users?id=3 (GET)
        iV. return all users or return a specific contact using query parameters (id, user_id phone_number or email), return a specific contact or contacts

    4) update contact
    i. http://localhost:5000/contacts/admin or /cb_user/<column>/<value> (PATCH)
    ii. body example: {
                        "name": "Juanito Cañas"
                        "phone_number": "2020-2121"
                        "email": "jc@example.com",
    iii. only can update name, phone_number or email, can update only one column if it´s necessary
    iv. returns "Successful updated"

    5) delete contact
    i. http://localhost:5000/contacts/admin or /cb_user/<column>/<value> (DELETE)
    ii delete an specific contact 
    iii. returns "Successful deleted"
    iv. **this end point, shouldn't be use, cause all the correlations between db tables, actually gonna receive error messages.
