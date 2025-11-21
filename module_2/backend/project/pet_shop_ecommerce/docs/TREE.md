pet_shop_ecommerce
├── app
│ ├── infrastructure
│ │ ├── cache
│ │ │ ├── cache_redis_connection.py
│ │ │ └── init.py
│ │ ├── database
│ │ │ ├── db_connection.py
│ │ │ ├── db_model.py
│ │ │ └── init.py
│ │ ├── security
│ │ │ ├── decorator_authenticator.py
│ │ │ ├── jwt_manager.py
│ │ │ ├── keys_generator.py
│ │ │ └── init.py
│ │ └── init.py
│ ├── repositories
│ │ ├── repository_carts.py
│ │ ├── repository_invoices.py
│ │ ├── repository_invoice_details.py
│ │ ├── repository_login_history.py
│ │ ├── repository_products.py
│ │ ├── repository_products_in_cart.py
│ │ ├── repository_shipping_addresses.py
│ │ ├── repository_users.py
│ │ └── init.py
│ ├── routes
│ │ ├── api_admin_users.py
│ │ ├── api_cart.py
│ │ ├── api_client_info.py
│ │ ├── api_invoice.py
│ │ ├── api_login.py
│ │ ├── api_products.py
│ │ └── init.py
│ ├── utils
│ │ ├── cache_manager.py
│ │ ├── orms_queries.py
│ │ ├── transactions.py
│ │ ├── validations.py
│ │ └── init.py
│ └── init.py
├── docs
│ ├── DER.jpg
│ ├── GENERAL_DESCRIPTION.md
│ ├── READ_ME_APIS.md
│ └── TREE.md
├── tests
│ ├── test_api_admin_users.py
│ ├── test_api_cart.py
│ ├── test_api_client_info.py
│ ├── test_api_invoice.py
│ ├── test_api_login.py
│ ├── test_api_products.py
│ ├── test_cache_manager.py
│ ├── test_cache_redis_connection.py
│ ├── test_db_connection.py
│ ├── test_db_model.py
│ ├── test_decorator_authenticator.py
│ ├── test_jwt_manager.py
│ ├── test_orms_queries.py
│ ├── test_repository_carts.py
│ ├── test_repository_invoices.py
│ ├── test_repository_invoice_details.py
│ ├── test_repository_login_history.py
│ ├── test_repository_products.py
│ ├── test_repository_products_in_cart.py
│ ├── test_repository_shipping_addresses.py
│ ├── test_repository_users.py
│ ├── test_transactions.py
│ ├── test_validations.py
│ └── init.py
├── app.py
├── dbs.env
├── private_key.pem
├── public_key.pem
├── READ_ME.md
└── init.py