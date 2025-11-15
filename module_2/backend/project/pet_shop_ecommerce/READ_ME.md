# Pet Shop E-Commerce API

A modular and scalable **RESTful API** for managing a pet shop e-commerce platform.  
Built with **Flask**, **PostgreSQL**, and **Redis**, it supports product management, users managment, manage different types of role users (different roles have different access for different endpoints),  shopping carts, invoices, authentication, and caching.



## Features

- User authentication with JWT (roles)
- CRUD operations for users 
- CRUD operations for products and carts (with cart items)
- Invoice (with invoice details) 
- Redis-based caching  
- Modular architecture repositories
- Tested with 'pytest'



### Run app

- Run 'app' in order to run the API
- In a terminal command 'python run_tests.py' to run all the 'tests' (more details in READ_ME_TESTS.md)



#### Docs

- In 'docs' folder find:

    - DER (DB diagram)
    - General description of the project (more detailing functioning)
    - Intructions for execute APIs (routes)
    - Instructions for run tests
    - A tree path of the project



##### NOTE:
- private_key.pem not include in PR
- public_key.pem not include in PR
- dbs.env not include in PR
- dbs should have data for DBs connection PostgreSQL and Redis
- Example PostgreSQL: DATABASE_URI=postgresql://userxxx:passxxx@localhost:xxxx/dbxxxx
- Example REDIS:
        redis_host=XXXXXX.redis-cloud.com
        redis_port=11533
        redis_password=XXXXXXXXXXXXXXXXXXXX
