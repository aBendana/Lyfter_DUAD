FROM **app_api.py** run all the others apis.
    a. /users
    b. /products
    c. /invoices
    d. /register
    e. /login

for more details of methods and parameters read below


# app_api:
    1.Dependencies: 
        a.pip install Flask (versión 3.1.0)

    2.For testing use postman or any other similar

    3.REST API listening in http://localhost:5000

    4.	END POINTS:
        a.	/     -------- home  page:
            • Use GET method
            • Return Body HTML <h1>>Welcome to Frisby Pet Shop!</h1>
 

# users_api
1.	Dependencies: 
a.	pip install Flask (versión 3.1.0)

2.	For testing use postman or any other similar 

3.	REST API listening in http://localhost:5000

4.	END POINTS:

a.	/     -------- home  page:
•	Use GET method
•	Return Body HTML <h1>Rocky Pet Shop!</h1>


b.	/ users    -------- show the users:
•	Use GET method
•	Use query parameter (optional), show users by ‘type’,  administrator or customer
•	Returns:
I.	users list, 200 OK
II.	400 Bad Request , If the query parameter ‘type’ is incorrect
III.	404 File Not Found , If users.json does not exists
IV.	500 Internal Server Error, for any other error


c.	/ users /<user_id>   -------- show a specific user:
•	Use GET method
•	Path parameter ‘user_id’ identifier for only one and specific user 
•	Returns:
I.	user, 200 OK
II.	400 Bad Request , If the user_id does not exist
III.	404 File Not Found , If users.json does not exists
IV.	500, for any other error


d.	/ users    -------- save user:
•	Use POST method
•	Body JSON:
{
  "user_id": "abc123",
  "password": "secret",
  "type": "customer",
  "name": "Juan Blanco",
  "email": "juan@example.com",
  "address": "Calle Fallas"
}

•	Validations:
I.	All attributes are obligatory
II.	‘user_id’ can’t be repeat 
III.	type must be  ‘administrator’ or ‘customer’

•	Returns:
I.	‘Successful saved’, 200 OK
II.	400 Bad Request, If user info is incomplete or wrong
III.	500 Internal Server Error, for any other error


e.	/ user/<user_id>       -------- update user:
•	Use PATCH method
•	Path parameter: ‘user_id’
•	Body JSON:     ***one or more attributes can be skipped***
{
  "user_id": "abc123",
  "password": "secret",
  "type": "customer",
  "name": "Juan Blanco",
  "email": "juan@example.com",
  "address": "Calle Fallas"
}

•	Validations:
I.	correct ‘user_id’
II.	‘type’ still has to be ‘administrator’ or ‘customer’

•	Returns:
I.	user, 200 OK
II.	400 Bad Request , If user id does not exist
III.	400 Bad Request, If ‘type’ is wrong
IV.	404 File Not Found, If users.json does not exist
V.	500 Internal Server Error, for any other error


f.	/ users /<user_id>   -------- delete a specific user:
•	Use DELETE method
•	Path parameter ‘user_id’ identifier for only one and specific user 
•	Validations:
I.	correct ‘user_id’

•	Returns:
I.	“Successful delete”, users list, 200 OK
II.	400 Bad Request , If user id does not exist
III.	404 File Not Found, if users.json file does not exist
IV.	500 Internal Server Error, for any other error




# products_api
1.	Dependencies: 
a.	pip install Flask (versión 3.1.0)

2.	For testing use postman or any other similar 

3.	REST API listening in http://localhost:5000

4.	END POINTS:

a.	/     -------- home page:
•	Use GET method
•	Return Body HTML <h1> Rocky Pet Shop Products!</h1>


b.	/ products    -------- show the products:
•	Use GET method
•	Use query parameter (optional), show products by ‘category’ ("food", "toys", "pharmacy", "accessories" or by ‘target species’ (dog, cat, fish, birds, etc.)
•	Returns:
I.	products list, 200 OK
II.	400 Bad Request, If the query parameter category of target species is incorrect
III.	404 File Not Found, If products.json does not exists
IV.	500 Internal Server Error, for any other error


c.	/ products /<products_id>   -------- show a specific product:
•	Use GET method
•	Path parameter ‘product_id’ identifier for only one and specific product 
•	Returns:
I.	product, 200 OK
II.	400 Bad Request, If the product_id does not exist
III.	404 File Not Found, If products.json does not exists
IV.	500, for any other error


d.	/ products    -------- save product:
•	Use POST method
•	Body JSON:
    {
        "product_id": "P001",
        "name": "Canine Digestive Kibble",
        "category": "food",
        "description": "Easily digestible dry food for adult dogs.",
        "target_species": "Dog",
        "supplier": "NutriPet",
        "stock": 80,
        "cost": 7.25,
        "price": 15.99
    }
•	Validations:
I.	All attributes are obligatory
II.	‘product_id’ can’t be repeat 
III.	‘category’ must be “food", "toys", "pharmacy", "accessories"
IV.	‘stock’ must be an integer
V.	‘cost’ and ‘price’ must be float

•	Returns:
I.	‘Successful saved’, 200 OK
II.	400 Bad Request, If ‘product id’ is repeat
III.	400 Bad Request, If ‘category’ is wrong
IV.	400 Bad Request, If ‘stock’ has a wrong type
V.	400 Bad Request, If ‘cost’ or ‘price’ has a wrong type
VI.	500 Internal Server Error, for any other error


e.	/ products/<product_id>    -------- update product:
•	Use PATCH method
•	Path parameter: ‘product_id’
•	Body JSON:     ***one or more attributes can be skipped***
    {
        "product_id": "P001",
        "name": "Canine Digestive Kibble",
        "category": "food",
        "description": "Easily digestible dry food for adult dogs.",
        "target_species": "Dog",
        "supplier": "NutriPet",
        "stock": 80,
        "cost": 7.25,
        "price": 15.99
    }

•	Validations:
I.	correct ‘product_id’
II.	‘category’ must be “food", "toys", "pharmacy", "accessories"
III.	‘stock’ must be an integer
IV.	‘cost’ and ‘price’ must be float

•	Returns:
I.	‘Successful updated’, product, 200 OK
II.	400 Bad Request, If ‘product id’ does not exist
III.	400 Bad Request, If ‘category’ is wrong
IV.	400 Bad Request, If ‘stock’ has a wrong type
V.	400 Bad Request, If ‘cost’ or ‘price’ has a wrong type
VI.	404 File Not Found, If products.json does not exist
VII.	500 Internal Server Error, for any other error


f.	/ products/<product_id>   -------- delete a specific product:
•	Use DELETE method
•	Path parameter ‘product_id’ identifier for only one and specific user 
•	Validations:
I.	correct ‘product_id’

•	Returns:
I.	“Successful delete”, products list, 200 OK
II.	400 Bad Request , If product id does not exist
III.	404 File Not Found, if products.json file does not exist
IV.	500 Internal Server Error, for any other error





# invoices_api
1. Dependencies: 
a.	pip install Flask (versión 3.1.0)

2. For testing use postman or any other similar 

3. REST API listening in http://localhost:5000

4 . END POINTS:

g.	/     -------- home page:
•	Use GET method
•	Return Body HTML <h1> Invoice Control</h1>


h.	/ invoices    -------- show the invoices:
•	Use GET method
•	Use query parameter (optional), show products by ‘email’ or shipping method "Standard", "Express", "Overnight"
•	Returns:
I.	Invoices list, 200 OK
II.	400 Bad Request, If the query parameter ‘email’ or ‘shipping_method’ are wrong
III.	404 File Not Found, If invocies.json does not exists
IV.	500 Internal Server Error, for any other error


i.	/ invoices/<invoice_id>   -------- show a specific invoice:
•	Use GET method
•	Path parameter ‘invoice_id’ identifier for only one and specific invoice 
•	Returns:
I.	invoice, 200 OK
II.	400 Bad Request, If the invoice_id does not exist or if is wrong
III.	404 File Not Found, If invoices.json does not exists
IV.	500, for any other error


j.	/ invoices    -------- save invoice:
•	Use POST method
•	Body JSON:
    {
        "invoice_id": "prueba22",
        "date_placed": "06/05/2025 02:30 PM",
        "shipping_method": "Express",
        "shipping_address": {
            "address": "San Francisco de dos rios, av 10, house# 501",
            "canton": "Central",
            "province": "San Jose",
            "postal_code": "11111"
            },
        "phone_number": "8555-1234",
        "email": "rugalde@example.com",
        "payment_method": "card",
        "items": [
            {
                "product_id": "d201",
                "product_name": "Ball toy",
                "quantity": 2,
                "price": 41.98,
                "discount": 0.0,
                "sales_tax": 3.8,
                "shipping_cost": 8.0,
                "total": 53.78
            },
            {
                "product_id": "c301",
                "product_name": "Fipronil Spot-On 3ml",
                "quantity": 1,
                "price": 19.99,
                "discount": 2.0,
                "sales_tax": 1.17,
                "shipping_cost": 4.0,
                "total": 23.16
            }
        ],
        "invoice_total": 76.94
    }

•	Validations:
I.	All attributes are obligatory
II.	‘invoice_id’ can’t be repeat 
III.	‘shipping_method’ must be "Standard", "Express", "Overnight"
IV.	'payment_method’ must be debit card", "credit card", "SINPE", "bank transfer”
V.	‘quantity’ must be an integer
VI.	"price", "discount", "sales_tax", "shipping_cost", "total" and “invoice_total” must be float

•	Returns:
I.	‘Successful saved’, invoices list, 200 OK
II.	400 Bad Request, If ‘product id’ is repeat
III.	400 Bad Request, If ‘shipping_method’ is wrong
IV.	400 Bad Request, If ‘payment_method’ is wrong
V.	400 Bad Request, If ‘quantity’ has a wrong type
VI.	400 Bad Request, If ‘"price", "discount", "sales_tax", "shipping_cost", "total" or “invoice_total” has a wrong type
VII.	500 Internal Server Error, for any other error


k.	/ invoices/<invoice_id>      -------- update invoices:
•	Use PATCH method
•	Path parameter: ‘invoice_id’
•	Body JSON:     ***one or more attributes can be skipped***
***However, if the shipping address dictionary needs to be update, all attributes of the shipping address must remain whether with new or the same information; the update can’t skip any attribute of it.*** Same happens with the items list (each item is a dictionary), whether with new or the same information, the update can't skip any attribute neither.***If you don’t need to update shipping address or any item, feel free to skip the whole attribute without any problem.***
    {
        "invoice_id": "prueba22",
        "date_placed": "06/05/2025 02:30 PM",
        "shipping_method": "Express",
        "shipping_address": {
            "address": "San Francisco de dos rios, av 10, house# 501",
            "canton": "Central",
            "province": "San Jose",
            "postal_code": "11111"
            },
        "phone_number": "8555-1234",
        "email": "rugalde@example.com",
        "payment_method": "card",
        "items": [
            {
                "product_id": "d201",
                "product_name": "Ball toy",
                "quantity": 2,
                "price": 41.98,
                "discount": 0.0,
                "sales_tax": 3.8,
                "shipping_cost": 8.0,
                "total": 53.78
            },
            {
                "product_id": "c301",
                "product_name": "Fipronil Spot-On 3ml",
                "quantity": 1,
                "price": 19.99,
                "discount": 2.0,
                "sales_tax": 1.17,
                "shipping_cost": 4.0,
                "total": 23.16
            }
        ],
        "invoice_total": 76.94
    }

•	Validations:
I.	correct ‘invoice_id’
II.	‘shipping_method’ must be "Standard", "Express", "Overnight"
III.	'payment_method’ must be debit card", "credit card", "SINPE", "bank transfer”
IV.	‘quantity’ must be an integer
V.	"price", "discount", "sales_tax", "shipping_cost", "total" and “invoice_total” must be float

•	Returns:
I.	‘Successful updated’, invoice, 200 OK
II.	400 Bad Request, If ‘invoice id’ is does not exist or is wrong
III.	400 Bad Request, If ‘shipping_method’ is wrong
IV.	400 Bad Request, If ‘payment_method’ is wrong
V.	400 Bad Request, If ‘quantity’ has a wrong type
VI.	400 Bad Request, If ‘"price", "discount", "sales_tax", "shipping_cost", "total" or “invoice_total” has a wrong type
VII.	404 File Not Found, If invoices.json does not exist
VIII.	500 Internal Server Error, for any other error


l.	/ invoices/<invoice_id>   -------- delete a specific invoice:
•	Use DELETE method
•	Path parameter ‘invoice_id’ identifier for only one and specific user 
•	Validations:
II.	correct ‘product_id’

•	Returns:
V.	“Successful delete”, products list, 200 OK
VI.	400 Bad Request , If invoice id does not exist
VII.	404 File Not Found, if invoices.json file does not exist
VIII.	500 Internal Server Error, for any other error





# singup_login_api
1. Dependencies: 
a. pip install Flask (versión 3.1.0)

2. For testing use postman or any other similar 

3. REST API listening in http://localhost:5000

4 . END POINTS:

a.	/ register    -------- register an user:
•	Use POST method
•	The registration logic remains pending for future developments
•	Return ‘message: Successful registration’, 201

b.	/login    -------- login an user:
•	Use POST method
•	The login logic remains pending for future developments
•	Return ‘message: Successful login’, 200


 	
