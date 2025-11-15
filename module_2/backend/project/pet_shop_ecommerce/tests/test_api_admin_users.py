import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from flask import Flask, json
from unittest.mock import Mock, MagicMock, patch, call
from sqlalchemy.exc import ProgrammingError
from app.routes import api_admin_users
from app.routes.api_admin_users import admin_users_bp


class TestAdminUsersAPI:

    def setup_method(self):
        # Arrange
        # flask instance with admin_users_bp blueprint
        self.app = Flask(__name__)
        self.app.register_blueprint(admin_users_bp)

        # test client to simulate HTTP requests to the Flask app.
        self.client = self.app.test_client()


    # tests for create_users
    # success case: create user michael jordan
    def test_create_users_michael_jordan(self):
        # # Arrange
        # app = Flask(__name__)
        # app.register_blueprint(admin_users_bp)

        # client = app.test_client()

        # Remove admin_only wrapper, original function is available under __wrapped__.
        self.app.view_functions['admin_users.create_users'] = api_admin_users.create_users.__wrapped__

        user_data = {
            "name": "Michael Jordan",
            "email": "mj@example.com",
            "password": "mj23buLLsNC",
            "phone_number": "8888-1111",
            "role": "client"
        }

        # mock
        with patch("app.routes.api_admin_users.users_repo") as mock_users_repo:
            mock_users_repo.insert_user.return_value = None

            # Act
            response = self.client.post("/admin/users", data=json.dumps(user_data), content_type="application/json")

            # Assert
            assert response.status_code == 200
            response_json = response.get_json()
            assert response_json["message"] == "Successful saved"
            assert response_json["user"] == user_data
            mock_users_repo.insert_user.assert_called_once_with(user_data)

    
    # failure case: incomplete user data, no name
    def test_create_users_incomplete_data_no_name(self):
        # Arrange
        self.app.view_functions['admin_users.create_users'] = api_admin_users.create_users.__wrapped__
        
        incomplete_user_data = {
            "email": "mj@example.com",
            "password": "mj23buLLsNC",
            "phone_number": "8888-1111"
        }

        with patch("app.routes.api_admin_users.users_repo") as mock_users_repo:
            mock_users_repo.insert_user.side_effect = ValueError("Info missing required")

            # Act
            response = self.client.post("/admin/users", data=json.dumps(incomplete_user_data), content_type="application/json")

            # Assert
            assert response.status_code == 400
            response_json = response.get_json()
            assert "Info missing required" in response_json["error"]


    # tests for show_users
    # success case: show all users
    def test_show_users_all(self):
        # Arrange
        self.app.view_functions['admin_users.show_users'] = api_admin_users.show_users.__wrapped__

        formatted_users = [
                    {
                    "id": 1,
                    "name": "Michael Jordan",
                    "email": "mj@example.com",
                    "password": "mj23buLLsNC",
                    "phone_number": "8888-1111",
                    "role": "client"
                    },
                    {
                    "id": 2,
                    "name": "Charles Barkley",
                    "email": "cb@example.com",
                    "password": "cb3476ers",
                    "phone_number": "8888-0000",
                    "role": "administrator"
                    }
                ]

        with patch("app.routes.api_admin_users.users_repo") as mock_users_repo:
            mock_users_repo.show_users.return_value = formatted_users

            # Act
            response = self.client.get("/admin/users", data=json.dumps(formatted_users), content_type="application/json")

            # Assert
            assert response.status_code == 200
            response_json = response.get_json()
            assert response_json == formatted_users
            mock_users_repo.show_users.assert_called_once


    # success case: get user michael jordan by query parameters
    def test_show_users_get_user_michael_jordan_by_name(self):
        # Arrange
        self.app.view_functions['admin_users.show_users'] = api_admin_users.show_users.__wrapped__

        formatted_users = [{
                    "id": 1,
                    "name": "Michael Jordan",
                    "email": "mj@example.com",
                    "password": "mj23buLLsNC",
                    "phone_number": "8888-1111",
                    "role": "client"
                    }]

        with patch("app.routes.api_admin_users.users_repo") as mock_users_repo:
            mock_users_repo.get_user_by_value_for_api.return_value = formatted_users

            # Act
            response = self.client.get("/admin/users?name=Michael Jordan", data=json.dumps(formatted_users), content_type="application/json")

            # Assert
            assert response.status_code == 200
            response_json = response.get_json()
            assert response_json == formatted_users
            mock_users_repo.get_user_by_value_for_api.assert_called_once_with("name", "Michael Jordan")


    # failure case: try get a non-existent user by id, query parameters
    def test_show_users_get_non_existent_user_by_id(self):
        # Arrange
        self.app.view_functions['admin_users.show_users'] = api_admin_users.show_users.__wrapped__

        formatted_users = []

        with patch("app.routes.api_admin_users.users_repo") as mock_users_repo:
            mock_users_repo.get_user_by_value_for_api.side_effect = ValueError("Invalid value '1001' for column 'id'.")

            # Act
            response = self.client.get("/admin/users?id=1001", data=json.dumps(formatted_users), content_type="application/json")

            # Assert
            assert response.status_code == 400
            response_json = response.get_json()
            assert "Invalid value '1001' for column 'id'." in response_json["error"]


    # tests for update_user
    # success case: update email and phone number
    def test_update_user_update_email_phone_number(self):
        # Arrange
        self.app.view_functions['admin_users.update_user'] = api_admin_users.update_user.__wrapped__

        user_id = 1
        user_update_data = {
            "id": 10,   #user_data.pop("id", None), prevents changes the id (upate_user code)
            "email": "mj_new@example.com",
            "phone_number": "9999-2222",
            }

        expected_user_clean_data = {
            "email": "mj_new@example.com",
            "phone_number": "9999-2222"
        }

        with patch("app.routes.api_admin_users.users_repo") as mock_users_repo:
            mock_users_repo.update_user.return_value = None

            # Act
            response = self.client.patch(f"/admin/users/{user_id}", data=json.dumps(user_update_data), content_type="application/json")

            # Assert
            assert response.status_code == 200
            response_json = response.get_json()
            assert response_json["message1"] == "Successful updated"
            assert response_json["message2"] == "'user id', 'user name' or 'role' can't be changed"
            assert response_json["user_data_updated"] == expected_user_clean_data

            # users_repo.update_user called twice for each attribute updated
            assert mock_users_repo.update_user.call_count == 2
            mock_users_repo.update_user.assert_any_call("id", str(user_id), "email", "mj_new@example.com")
            mock_users_repo.update_user.assert_any_call("id", str(user_id), "phone_number", "9999-2222")


    # failure case: non-existent user_id
    def test_update_user_id_not_exists(self):
        # Arrange
        self.app.view_functions['admin_users.update_user'] = api_admin_users.update_user.__wrapped__

        user_id = 1001
        user_update_data = {"email": "mj_new@example.com"}

        with patch("app.routes.api_admin_users.users_repo") as mock_users_repo:
            mock_users_repo.update_user.side_effect = ValueError("Invalid value '1001' for column 'id'.")


            # Act
            response = self.client.patch(f"/admin/users/{user_id}", data=json.dumps(user_update_data), content_type="application/json")

            # Assert
            assert response.status_code == 400
            response_json = response.get_json()
            assert "Invalid value '1001' for column 'id'." in response_json["error"]
            mock_users_repo.update_user.assert_called_once_with("id", str(user_id), "email", "mj_new@example.com")


    # failure case: invalid update value integrity error
    def test_update_user_invalid_update_value_email(self):
        # Arrange
        self.app.view_functions['admin_users.update_user'] = api_admin_users.update_user.__wrapped__

        user_id = 1
        user_update_data = {"email": 22}

        with patch("app.routes.api_admin_users.users_repo") as mock_users_repo:
            mock_users_repo.update_user.side_effect = ValueError("Integrity error: invalid input syntax for type string: '22'")

            # Act
            response = self.client.patch(f"/admin/users/{user_id}", data=json.dumps(user_update_data), content_type="application/json")

            # Assert
            assert response.status_code == 400
            response_json = response.get_json()
            assert "Integrity error: invalid input syntax for type string: '22'" in response_json["error"]
            mock_users_repo.update_user.assert_called_once_with("id", str(user_id), "email", 22)


    # tests for delete_user
    # success case: delete user michael jordan
    def test_delete_user_michael_jordan_id_1(self):
        # Arrange
        self.app.view_functions['admin_users.delete_user'] = api_admin_users.delete_user.__wrapped__

        user_id = 1

        with patch("app.routes.api_admin_users.users_repo") as mock_users_repo:
            mock_users_repo.delete_user.return_value = None

            # Act
            response = self.client.delete(f"/admin/users/{user_id}")

            # Assert
            assert response.status_code == 200
            response_json = response.get_json()
            assert response_json == {"user": str(user_id), "message": "Successful delete"}
            mock_users_repo.delete_user.assert_called_once_with("id", str(user_id))


    # failure case: internal server error
    def test_delete_user_internal_server_error(self):
        # Arrange
        self.app.view_functions['admin_users.delete_user'] = api_admin_users.delete_user.__wrapped__

        user_id = 1

        with patch("app.routes.api_admin_users.users_repo") as mock_users_repo:
            mock_users_repo.delete_user.side_effect = ConnectionError("Database connection lost")

            # Act
            response = self.client.delete(f"/admin/users/{user_id}")

            # Assert
            assert response.status_code == 500
            response_json = response.get_json()
            assert "Internal server error" in response_json["error"]
            mock_users_repo.delete_user.assert_called_once_with("id", str(user_id))


    # tests for show_login_history
    # success case: show login history for user id 1
    def test_show_login_history_user_id_1(self):
        # Arrange
        user_id = 1
        formatted_login_history = [
                                    {
                                    "id": 1,
                                    "user_id": 1,
                                    "login_timestamp": "2025-09-08 19:47:41",
                                    "ip_address": "181.105.75.75",
                                    "login_status": "successful"
                                    },
                                    {
                                    "id": 2,
                                    "user_id": 1,
                                    "login_timestamp": "2025-10-08 21:47:45",
                                    "ip_address": "205.105.87.01",
                                    "login_status": "failed"
                                    }
                                ]

        self.app.view_functions['admin_users.show_login_history'] = api_admin_users.show_login_history.__wrapped__

                                

        with patch("app.routes.api_admin_users.login_repo") as mock_login_repo:
            mock_login_repo.get_login_history_by_value.return_value = formatted_login_history

            # Act
            response = self.client.get("/admin/users/login-history?user_id=1", data=json.dumps(formatted_login_history), content_type="application/json")

            # Assert
            assert response.status_code == 200
            response_json = response.get_json()
            assert response_json == formatted_login_history
            mock_login_repo.get_login_history_by_value.assert_called_once_with("user_id", str(user_id))


    # failure case: no filter value - user_id_value
    def test_show_login_history_missing_user_id_value(self):
        # Arrange
        self.app.view_functions['admin_users.show_login_history'] = api_admin_users.show_login_history.__wrapped__

        with patch("app.routes.api_admin_users.login_repo") as mock_login_repo:
            response = self.client.get("/admin/users/login-history?user_id=", content_type="application/json")

            # Assert
            assert response.status_code == 400
            response_json = response.get_json()
            assert "Column or column's value info incomplete" in response_json["error"]

            # interactions
            mock_login_repo.get_login_history_by_value.assert_not_called()
            mock_login_repo.get_login_history.assert_not_called()


    # tests for show_invoices
    # success case: show all invoices
    def test_show_invoices_all_success(self):
        # Arrange
        self.app.view_functions['admin_users.show_invoices'] = api_admin_users.show_invoices.__wrapped__

        formatted_invoices = [
                                {
                                    "id": 1,
                                    "user_id": 1,
                                    "cart_id": 10,
                                    "shipping_address_id": 5,
                                    "date_placed": "2025-10-20 14:35:42",
                                    "shipping_method": "express",
                                    "payment_method": "credit_card",
                                    "invoice_subtotal": 120.50,
                                    "discount": 10.00,
                                    "shipping_cost": 5.00,
                                    "sales_taxes": 7.00,
                                    "invoice_total": 122.50
                                },
                                {
                                    "id": 2,
                                    "user_id": 2,
                                    "cart_id": 11,
                                    "shipping_address_id": 6,
                                    "date_placed": "2025-10-21 09:12:10",
                                    "shipping_method": "standard",
                                    "payment_method": "paypal",
                                    "invoice_subtotal": 250.00,
                                    "discount": 0.00,
                                    "shipping_cost": 10.00,
                                    "sales_taxes": 7.00,
                                    "invoice_total": 267.00
                                }
                            ]

        with patch("app.routes.api_admin_users.invoices_repo") as mock_invoices_repo:
            mock_invoices_repo.show_invoices.return_value = formatted_invoices

            # Act
            response = self.client.get("/admin/invoices", content_type="application/json")

            # Assert
            assert response.status_code == 200
            response_json = response.get_json()
            assert response_json == formatted_invoices

            # interactions
            mock_invoices_repo.show_invoices.assert_called_once()
            mock_invoices_repo.get_invoice_by_value.assert_not_called()


    # success case: get a invoice with query parameters - user_id
    def test_show_invoices_by_user_id_10(self):
        # Arrange
        self.app.view_functions['admin_users.show_invoices'] = api_admin_users.show_invoices.__wrapped__

        user_id = 10

        formatted_invoices = [
            {
                "id": 1,
                "user_id": user_id,
                "cart_id": 15,
                "shipping_address_id": 8,
                "date_placed": "2025-10-20 14:35:42",
                "shipping_method": "express",
                "payment_method": "credit_card",
                "invoice_subtotal": 120.50,
                "discount": 10.00,
                "shipping_cost": 5.00,
                "sales_taxes": 7.00,
                "invoice_total": 122.50
            }
        ]

        formatted_invoice_details = [
            {
                "id": 1,
                "invoice_id": 1,
                "product_id": 101,
                "quantity": 2,
                "item_total": 40.00
            },
            {
                "id": 2,
                "invoice_id": 1,
                "product_id": 102,
                "quantity": 1,
                "item_total": 42.50
            }
        ]

        user_name = "John Doe"

        # patching
        with patch("app.routes.api_admin_users.invoices_repo") as mock_invoices_repo, \
            patch("app.routes.api_admin_users.invoice_details_repo") as mock_invoice_details_repo, \
            patch("app.routes.api_admin_users.users_repo") as mock_users_repo:
            
            mock_invoices_repo.get_invoice_by_value.return_value = formatted_invoices
            mock_invoice_details_repo.get_invoice_detail_by_value.return_value = formatted_invoice_details
            mock_users_repo.get_user_by_value_for_api.return_value = [{"name": user_name}]

            # Act
            response = self.client.get(f"/admin/invoices?user_id={user_id}", content_type="application/json")

            # Assert
            assert response.status_code == 200
            response_json = response.get_json()
            assert response_json["invoices"] == formatted_invoices
            assert response_json["invoice_details"] == formatted_invoice_details
            assert response_json["user_id"] == user_id
            assert response_json["user_name"] == user_name

            mock_invoices_repo.get_invoice_by_value.assert_called_once_with("user_id", str(user_id))
            mock_invoice_details_repo.get_invoice_detail_by_value.assert_called_once_with("invoice_id", 1)
            mock_users_repo.get_user_by_value_for_api.assert_called_once_with("id", user_id)


    # failure case: idx invalid search column
    def test_show_invoices_invalid_column_failure(self):
        # Arrange
        self.app.view_functions['admin_users.show_invoices'] = api_admin_users.show_invoices.__wrapped__

        invalid_column = "idx"
        search_value = 1

        with patch("app.routes.api_admin_users.invoices_repo") as mock_invoices_repo, \
            patch("app.routes.api_admin_users.invoice_details_repo") as mock_invoice_details_repo, \
            patch("app.routes.api_admin_users.users_repo") as mock_users_repo:

            # Simula que get_invoice_by_value lanza ValueError por columna inválida
            mock_invoices_repo.get_invoice_by_value.side_effect = ValueError("Column 'idx' not exists or not allowed for searches or modification.")

            # Act
            response = self.client.get(f"/admin/invoices?{invalid_column}={search_value}", content_type="application/json")

            # Assert
            assert response.status_code == 400
            response_json = response.get_json()
            assert "Column 'idx' not exists or not allowed for searches or modification." in response_json["error"]

            #interactions
            mock_invoices_repo.get_invoice_by_value.assert_called_once_with(invalid_column, str(search_value))
            mock_invoice_details_repo.get_invoice_detail_by_value.assert_not_called()
            mock_users_repo.get_user_by_value_for_api.assert_not_called()


    # tests for update_cart_invoice
    # success case: new_quantity
    def test_update_cart_invoice_new_quantity(self):
        # Arrange
        self.app.view_functions['admin_users.update_cart_invoice'] = api_admin_users.update_cart_invoice.__wrapped__

        invoice_id = 1
        product_id = 10
        new_quantity = 5
        discount_rate = 0.1

        product_update = {
            "product_id": product_id,
            "quantity": new_quantity,
            "discount_rate": discount_rate
        }

        with patch("app.routes.api_admin_users.invoices_repo") as mock_invoices_repo, \
            patch("app.routes.api_admin_users.products_in_cart_repo") as mock_products_in_cart_repo, \
            patch("app.routes.api_admin_users.transactions") as mock_transactions, \
            patch("app.routes.api_admin_users.cache_manager") as mock_cache_manager, \
            patch("app.routes.api_admin_users.invoice_details_repo") as mock_invoice_details_repo:

            # mocks
            # invoice
            mock_invoices_repo.get_invoice_by_value.return_value = [{"cart_id": 100, "shipping_cost": 10.00}]
            # product in cart
            mock_products_in_cart_repo.get_product_in_cart_by_two_values.return_value = [{"id": 200, "quantity": 2}]
            mock_products_in_cart_repo.get_product_in_cart_by_value.return_value = [
                {"id": 200, "product_id": 10, "quantity": new_quantity, "price": 20.00}
            ]
            # transactions logic
            mock_transactions.calculate_invoice_subtotal.return_value = 100.00
            mock_transactions.calculate_discount.return_value = 10.00
            mock_transactions.calculate_invoice_total.return_value = 107.00
            mock_transactions.calculate_item_total_for_update_detail.return_value = 50.00
            mock_invoice_details_repo.get_invoice_detail_by_two_values.return_value = [{"id": 300}]

            # Act
            response = self.client.patch(f"/admin/invoices/{invoice_id}", data=json.dumps(product_update), content_type="application/json")

            # Assert
            assert response.status_code == 200
            response_json = response.get_json()
            assert response_json["message"] == "Invoice updated"
            assert response_json["invoice"] == str(invoice_id)

            # interactions
            mock_invoices_repo.get_invoice_by_value.assert_any_call("id", str(invoice_id))
            mock_products_in_cart_repo.get_product_in_cart_by_two_values.assert_any_call("cart_id", "product_id", 100, product_id)
            mock_products_in_cart_repo.update_product_in_cart.assert_called_once_with("id", 200, "quantity", new_quantity)

            mock_transactions.calculate_invoice_subtotal.assert_called_once()
            mock_transactions.calculate_discount.assert_called_once_with(100.00, discount_rate)
            mock_transactions.calculate_invoice_total.assert_called_once_with(100.00, 10.00, 10.00)

            mock_invoices_repo.update_invoice.assert_any_call("id", str(invoice_id), "invoice_subtotal", 100.00)
            mock_invoices_repo.update_invoice.assert_any_call("id", str(invoice_id), "discount", 10.00)
            mock_invoices_repo.update_invoice.assert_any_call("id", str(invoice_id), "invoice_total", 107.00)

            mock_invoice_details_repo.update_invoice_detail.assert_any_call("id", 300, "quantity", new_quantity)
            mock_invoice_details_repo.update_invoice_detail.assert_any_call("id", 300, "item_total", 50.00)

    


