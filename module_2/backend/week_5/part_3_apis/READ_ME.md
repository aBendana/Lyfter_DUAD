# dependencies, used softwares and other details:
    1.pip install Flask (versión 3.1.0)

    2. PostgreSQL 17.5 for data bases

    3.For testing use postman or any other similar


# api_app:
1. REST API listening in http://localhost:5000

2. END POINTS:
    a.	/     -------- home  page:
        • Use GET method
        • Return body html "<h1>Welcome to Lyfter Car Rental!</h1>"

3. This API registers all other APIs (users, cars, car_rental) via blueprints.
FROM **app_api.py** run all the others apis.


# api_users
END POINTS:

GET method:
    a) /users
        show all the users

    b) /users?status=specificstatus
        use query parameter, show a list of users by a specific ‘status’:   'active', 'inactive', 'suspended', 'blocked'

    c) /users/<column>/<parameter>
        show a specific user according the choosen column: 'id', 'user_name', 'email'.

    d) Returns:
        I.	users list, 200 OK
        II.	400 Bad Request , If the query parameter ‘status’ is incorrect, if the column is incorrect or the parameter is incorrect
        III. 500 Internal Server Error, for any other error


POST method:
    a) /users
        create a user   **'id' is autogenerate**
        body (raw JSON):
        {
        "user_name": "example",
        "email": "example@example.com",
        "password": "3xAmPl3",
        "birthdate": "1991-01-01",
        "status": "active"
        }
      
    b) Validations: 
        1. all attributes are obligatory except the 'id'
        2. email can't be repeat
        3. 'status': must be 'active', 'inactive', 'suspended' or 'blocked'

    c) Returns:
        I.	message="Successful saved", user=user_data, 200
        II.	400 Bad Request , If data is missing, email is repeait it, for wrong status or error in saving.
        III. 500 Internal Server Error, for any other error


PATCH method:
    a) /users/id/<user_id>
        update user data, 'id 'can't change
        body (raw JSON):    ***one or more attributes can be skipped***
        {
        "user_name": "example",
        "email": "example@example.com",
        "password": "3xAmPl3",
        "birthdate": "1991-01-01",
        "status": "active"
        }
      

    b) Validations:
        1. only works with column 'id' and a valid user id
        2. email can't be repeat  
        3. 'status': must be 'active', 'inactive', 'suspended' or 'blocked'

    c) Returns:
        I. message="Successful updated", user=formatted_user, 200
        II.	400 Bad Request , If email is repeait it, for wrong status or error updating.
        III. 500 Internal Server Error, for any other error


DELETE method:
    a) /users/<_id>
        delete a user using path parameter 'id'
        **this end point ain't gonna be used in this homework**
        Users should never be deleted, we can change their status to               blocked or suspended, we should keep record of all their data and transactions. 
        **Anyways if we want to delete a user**
      
    b) Validations:
        1. check a valid 'id'
        2. checks if the user is on a rental and the status on car_rental table is completed. if it is complete delete the rental and then the user

    c) Returns:
        I. user=_id, message="Successful delete", 200
        II.	400 Bad Request , wrong id, rental no completed, or error deleting.
        III. 500 Internal Server Error, for any other error


# api_cars
END POINTS:

GET method:
    a) /cars
        show all the users

    b) /cars?<column>=<parameter>
        use query parameter, show a list of cars by a specific ‘make’, 'model', 'year' or 'status'('available', 'rented', 'reserved', 'in maintenance', 'out of use')

    c) /cars/<column>/<parameter>
        show a specific car by path parameter column 'id' and specific car_id

    d) Returns:
        I.	cars list, 200 OK
        II.	400 Bad Request , If ‘make’, 'model', 'year', 'status' or 'id' not exists or is incorrect
        III. 500 Internal Server Error, for any other error


POST method:
    a) /cars
        create a car    **'id' is autogenerate**
        body (raw JSON):
        {
        "make": "manufacturer",
        "model": "elegant",
        "year": "1994",
        "status": "available"
        }
      
    b) Validations: 
        1. all attributes are obligatory except the 'id'
        2. 'status': must be 'available', 'rented', 'reserved', 'in maintenance', 'out of use'

    c) Returns:
        I.	message="Successful saved", car=car_data, 200
        II.	400 Bad Request , If data is missing, for wrong status or error in saving.
        III. 500 Internal Server Error, for any other error


PATCH method:
    a) /cars/id/<car_id>
        update car data, 'id 'can't change
        body (raw JSON):    ***one or more attributes can be skipped***
        {
        "make": "manufacturer",
        "model": "elegant",
        "year": "1994",
        "status": "available"
        }
      

    b) Validations:
        1. only works with column 'id' and a valid car id
        2. 'status': must be 'available', 'rented', 'reserved', 'in maintenance', 'out of use'

    c) Returns:
        I. message="Successful updated", car=formatted_car, 200
        II.	400 Bad Request , for wrong status or error updating.
        III. 500 Internal Server Error, for any other error


DELETE method:
    a) /cars/<_id>
        delete car using path parameter 'id'
        **this end point ain't gonna be used in this homework**
        Cars should never be deleted, we can change their status to               'out of use', we should keep record of all their data. 
        **Anyways if we want to delete a car**
      
    b) Validations:
        1. check a valid 'id'
        2. checks if the car is on a rental and the status on car_rental table is completed. if it is complete delete the rental and then the car

    c) Returns:
        I. car=_id, message="Successful delete", 200
        II.	400 Bad Request , wrong id, rental no completed, or error deleting.
        III. 500 Internal Server Error, for any other error


# api_rentals
END POINTS:

GET method:
    a) /rentals
        show all the rentals

    b) /rentals?<column>=<parameter>
        use query parameter, show a list of rentals by a specific ‘car_id’, 'user_id', or 'status'('rented', 'reserved', 'completed', 'cancelled', 'incident')

    c) /rentals/id/<rental_id>
        show a specific rental by path parameter column 'id' and specific rental_id

    d) Returns:
        I.	rentals list, 200 OK
        II.	400 Bad Request , If ‘car_id’, 'user_id', or 'status' not exists, is incorrect or not has rentals
        III. 500 Internal Server Error, for any other error


POST method:
    a) /cars
        create a rental    **'id' is autogenerate**
        body (raw JSON):
        {
        "car_id": "manufacturer",
        "user_id": "elegant",
        "status": "completed"
        }
      
    b) Validations: 
        1. all attributes are obligatory except the 'id'
        2. car (check by car_id) must exists
        3. user (check by user_id) must exists
        4. check if car is 'available'
        5. check if user is 'active'
        6. 'status': must be 'rented', 'reserved', 'completed', 'cancelled', 'incident'

    c) Returns:
        I.	message="Successful saved", rental=rental_data, 200
        II.	400 Bad Request , wrong status or error saving.
        III. 500 Internal Server Error, for any other error


PATCH method:
    a) /rentals/id/<rental_id>
        update rental data, 'id 'can't change
        body (raw JSON):    ***one or more attributes can be skipped***
        {
        "make": "manufacturer",
        "model": "elegant",
        "year": "1994",
        "status": "available"
        }
      

    b) Validations:
        1. only works with column 'id' and a valid rental id
        2. 'status': 'rented', 'reserved', 'completed', 'cancelled', 'incident'

    c) Returns:
        I. message="Successful updated", rental=formatted_rental, 200
        II.	400 Bad Request , for wrong status or error updating.
        III. 500 Internal Server Error, for any other error


DELETE method:
    a) /rentals/<_id>
        delete rental using path parameter 'id'
        **this end point ain't gonna be used in this homework**
        Keep car rentals info is a good practice (set status completed)
        **Anyways if we want to delete a car**
      
    b) Validations:
        1. check a valid 'id'

    c) Returns:
        I. rental=_id, message="Successful delete", 200
        II.	400 Bad Request , wrong id or error deleting.
        III. 500 Internal Server Error, for any other error


