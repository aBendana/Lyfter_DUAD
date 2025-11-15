import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from flask import Flask, json, g
from unittest.mock import Mock, MagicMock, patch, call
from app.routes.api_invoice import invoice_bp


class TestInvoiceApi:

    def setup_method(self):
        # Arrange
        # flask instance with admin_users_bp blueprint
        self.app = Flask(__name__)
        self.app.register_blueprint(invoice_bp)

        # test client to simulate HTTP requests to the Flask app.
        self.client = self.app.test_client()

    
    # tests for create_invoice
    # success case: create an invoice
    def test_create_invoice_success(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"

        cart_id = 10
        shipping_address_id = 5
        shipping_method = "Express"
        payment_method = "Credit Card"
        discount_rate = 10.00
        invoice_total = 107.00

        invoice_data = {
            "shipping_address_id": shipping_address_id,
            "shipping_method": shipping_method,
            "payment_method": payment_method,
            "discount": discount_rate
        }

        cart_data = [{"id": cart_id, "user_id": user_id, "status": "pending"}]
        
        products_in_cart = [
            {"product_id": 1, "quantity": 2},
            {"product_id": 2, "quantity": 1}]
        
        invoice_result = {
            "id": 100,
            "user_id": user_id,
            "cart_id": cart_id,
            "shipping_address_id": shipping_address_id,
            "date_placed": "2025-09-19 17:57:58",
            "shipping_method": shipping_method,
            "payment_method": payment_method,
            "invoice_subtotal": 100.00,
            "discount": 10.00,
            "shipping_cost": 10.00,
            "sales_taxes": 7.00,
            "invoice_total": invoice_total,
        }

        with patch("app.routes.api_invoice.cart_repo") as mock_cart_repo, \
            patch("app.routes.api_invoice.shipping_addresses_repo") as mock_shipping_repo, \
            patch("app.routes.api_invoice.products_in_cart_repo") as mock_products_repo, \
            patch("app.routes.api_invoice.invoice_details_repo") as mock_invoice_details_repo, \
            patch("app.routes.api_invoice.invoice_repo") as mock_invoice_repo, \
            patch("app.routes.api_invoice.transactions") as mock_transactions:

            # mocks
            mock_cart_repo.get_cart_by_two_values.return_value = cart_data
            mock_shipping_repo.get_address_by_two_values.return_value = [{"id": shipping_address_id, "user_id": user_id}]
            mock_products_repo.get_product_in_cart_by_value.return_value = products_in_cart
            mock_invoice_repo.create_full_invoice.return_value = invoice_result
            mock_transactions.calculate_item_total.return_value = 50.0

            # Act – simulate request context and g
            with self.app.test_request_context("/invoice", method="POST", json=invoice_data):
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_invoice import create_invoice
                response_data, status_code = create_invoice.__wrapped__()

            # Assert
            assert status_code == 200
            response_json = response_data.get_json()
            assert response_json["message"] == "Invoice created successfully"
            assert response_json["invoice"] == invoice_result
            assert response_json["user"] == user_name

            # interactions
            mock_cart_repo.get_cart_by_two_values.assert_called_once_with("user_id", "status", user_id, "pending")
            mock_shipping_repo.get_address_by_two_values.assert_called_once_with("id", "user_id", shipping_address_id, user_id)
            mock_products_repo.get_product_in_cart_by_value.assert_called_once_with("cart_id", cart_id)
            mock_invoice_repo.create_full_invoice.assert_called_once_with(user_id, cart_id, shipping_address_id, shipping_method,
                                                                        payment_method, products_in_cart, discount_rate)
            assert mock_invoice_details_repo.new_invoice_detail.call_count == 2
            mock_cart_repo.update_cart.assert_called_once_with("id", cart_id, "status", "completed")


    # failure case: no pending cart
    def test_create_invoice_no_pending_cart(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"

        invoice_data = {
            "shipping_address_id": 5,
            "shipping_method": "Express",
            "payment_method": "Credit Card",
            "discount": 10.00
        }

        # no pending cart found
        cart_data = []

        with patch("app.routes.api_invoice.cart_repo") as mock_cart_repo, \
            patch("app.routes.api_invoice.shipping_addresses_repo") as mock_shipping_repo, \
            patch("app.routes.api_invoice.products_in_cart_repo") as mock_products_repo, \
            patch("app.routes.api_invoice.invoice_details_repo") as mock_invoice_details_repo, \
            patch("app.routes.api_invoice.invoice_repo") as mock_invoice_repo, \
            patch("app.routes.api_invoice.transactions") as mock_transactions:

            mock_cart_repo.get_cart_by_two_values.return_value = cart_data # no pending cart

            # Act – simulate request context and g
            with self.app.test_request_context("/invoice", method="POST", json=invoice_data):
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_invoice import create_invoice
                response_data, status_code = create_invoice.__wrapped__()

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert response_json["error"] == "No pending cart found."

            # interactions
            mock_cart_repo.get_cart_by_two_values.assert_called_once_with("user_id", "status", user_id, "pending")
            mock_shipping_repo.get_address_by_two_values.assert_not_called()
            mock_products_repo.get_product_in_cart_by_value.assert_not_called()
            mock_invoice_repo.create_full_invoice.assert_not_called()
            mock_invoice_details_repo.new_invoice_detail.assert_not_called()
            mock_cart_repo.update_cart.assert_not_called()


    # failure case: empty cart
    def test_create_invoice_empty_cart(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"

        cart_id = 10
        shipping_address_id = 5

        invoice_data = {
            "shipping_address_id": shipping_address_id,
            "shipping_method": "Express",
            "payment_method": "Credit Card",
            "discount": 10.00
        }

        cart_data = [{"id": cart_id, "user_id": user_id, "status": "pending"}]

        # empty cart
        products_in_cart = []

        with patch("app.routes.api_invoice.cart_repo") as mock_cart_repo, \
            patch("app.routes.api_invoice.shipping_addresses_repo") as mock_shipping_repo, \
            patch("app.routes.api_invoice.products_in_cart_repo") as mock_products_repo, \
            patch("app.routes.api_invoice.invoice_details_repo") as mock_invoice_details_repo, \
            patch("app.routes.api_invoice.invoice_repo") as mock_invoice_repo, \
            patch("app.routes.api_invoice.transactions") as mock_transactions:

            mock_cart_repo.get_cart_by_two_values.return_value = cart_data
            mock_shipping_repo.get_address_by_two_values.return_value = [{"id": shipping_address_id, "user_id": user_id}]
            mock_products_repo.get_product_in_cart_by_value.return_value = products_in_cart  # empty cart

            # Act – simulate request context + g
            with self.app.test_request_context("/invoice", method="POST", json=invoice_data):
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_invoice import create_invoice
                response_data, status_code = create_invoice.__wrapped__()

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert response_json["error"] == "The cart is empty. Add products to cart before checkout."

            # interactions validation
            mock_cart_repo.get_cart_by_two_values.assert_called_once_with("user_id", "status", user_id, "pending")
            mock_shipping_repo.get_address_by_two_values.assert_called_once_with("id", "user_id", shipping_address_id, user_id)
            mock_products_repo.get_product_in_cart_by_value.assert_called_once_with("cart_id", cart_id)
            # interactions not called
            mock_invoice_repo.create_full_invoice.assert_not_called()
            mock_invoice_details_repo.new_invoice_detail.assert_not_called()
            mock_cart_repo.update_cart.assert_not_called()
            mock_transactions.calculate_item_total.assert_not_called()


    # tests for get_invoices
    # success case: show all invoices of logged customer
    def test_get_invoices_of_user_id_1(self):
        # Assert
        user_id = 1
        user_name = "Michael Jordan"
        formatted_invoices =[
                        {
                            "id": 100,
                            "user_id": 1,
                            "cart_id": 201,
                            "shipping_address_id": 30,
                            "date_placed": "2025-09-19 17:57:58",
                            "shipping_method": "Standard",
                            "payment_method": "Credit Card",
                            "invoice_subtotal": 100.00,
                            "discount": 10.00,
                            "shipping_cost": 10.00,
                            "sales_taxes": 13.00,
                            "invoice_total": 113.00
                        },
                        {
                            "id": 101,
                            "user_id": 1,
                            "cart_id": 202,
                            "shipping_address_id": 30,
                            "date_placed": "2025-09-21 10:30:00",
                            "shipping_method": "Express",
                            "payment_method": "PayPal",
                            "invoice_subtotal": 250.00,
                            "discount": 25.00,
                            "shipping_cost": 15.00,
                            "sales_taxes": 31.20,
                            "invoice_total": 271.20
                        }
                    ]
        
        with patch("app.routes.api_invoice.invoice_repo") as mock_invoice_repo:
            mock_invoice_repo.get_invoice_by_value.return_value = formatted_invoices

            # Act – simulate request context and g
            with self.app.test_request_context("/invoice", method="GET"):
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_invoice import get_invoices
                response_data, status_code = get_invoices.__wrapped__()

            # Assert
            assert status_code == 200
            response_json = response_data.get_json()
            assert response_json["invoices"] == formatted_invoices
            assert response_json["user"] == user_name
            # interactions
            mock_invoice_repo.get_invoice_by_value.assert_called_once_with("user_id", user_id)


    # success case: get a specific invoice
    def test_get_invoices_get_invoice_id_100(self):
        # Assert
        user_id = 1
        user_name = "Michael Jordan"
        formatted_invoice =[
                        {
                            "id": 100,
                            "user_id": 1,
                            "cart_id": 201,
                            "shipping_address_id": 30,
                            "date_placed": "2025-09-19 17:57:58",
                            "shipping_method": "Standard",
                            "payment_method": "Credit Card",
                            "invoice_subtotal": 100.00,
                            "discount": 10.00,
                            "shipping_cost": 10.00,
                            "sales_taxes": 13.00,
                            "invoice_total": 113.00
                        }]
        
        formatted_invoice_details = [
            {"id": 1, "invoice_id": 100, "product_id": 5, "quantity": 2, "item_total": 50.00},
            {"id": 2, "invoice_id": 100, "product_id": 6, "quantity": 1, "item_total": 50.00}
            ]

        with patch("app.routes.api_invoice.invoice_repo") as mock_invoice_repo, \
            patch("app.routes.api_invoice.invoice_details_repo") as mock_invoice_details_repo:

            mock_invoice_repo.get_invoice_by_two_values.return_value = formatted_invoice
            mock_invoice_details_repo.get_invoice_detail_by_value.return_value = formatted_invoice_details

            # Act – simulate request context and g
            with self.app.test_request_context("/invoice?id=100", method="GET"):
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_invoice import get_invoices
                response_data, status_code = get_invoices.__wrapped__()

            # Assert
            assert status_code == 200
            response_json = response_data.get_json()
            assert response_json["invoice"] == formatted_invoice
            assert response_json["invoice_details"] == formatted_invoice_details
            assert response_json["user"] == user_name

            # Interactions
            mock_invoice_repo.get_invoice_by_two_values.assert_called_once_with("id", "user_id", "100", user_id)
            mock_invoice_details_repo.get_invoice_detail_by_value.assert_called_once_with("invoice_id", 100)


    # failure case: query search parameters incomplete
    def test_get_invoices_incomplete_search_info(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"

        with patch("app.routes.api_invoice.invoice_repo") as mock_invoice_repo, \
            patch("app.routes.api_invoice.invoice_details_repo") as mock_invoice_details_repo:

            # no returns values
            mock_invoice_repo.get_invoice_by_two_values.return_value = None
            mock_invoice_details_repo.get_invoice_detail_by_value.return_value = None

            # Act
            with self.app.test_request_context("/invoice?id=", method="GET"):
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_invoice import get_invoices
                response_data, status_code = get_invoices.__wrapped__()

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert "Column or column's value info incomplete" in response_json["error"]

            # no methods called
            mock_invoice_repo.get_invoice_by_two_values.assert_not_called()
            mock_invoice_details_repo.get_invoice_detail_by_value.assert_not_called()


    # failure case: invalid search column sales_taxes
    def test_get_invoices_invalid_search_column(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"
        invalid_column = "sales_taxes"
        filter_value = "13.00"

        with patch("app.routes.api_invoice.invoice_repo") as mock_invoice_repo, \
            patch("app.routes.api_invoice.invoice_details_repo") as mock_invoice_details_repo:

            # mock side effect ValueError
            mock_invoice_repo.get_invoice_by_two_values.side_effect = ValueError(f"Column 'sales_taxes' not exists or not allowed for searches or modification.")

            # Act
            with self.app.test_request_context(f"/invoice?{invalid_column}={filter_value}", method="GET"):
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_invoice import get_invoices
                response_data, status_code = get_invoices.__wrapped__()

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert response_json["error"] == f"Column 'sales_taxes' not exists or not allowed for searches or modification."

            # Interactions: get_invoice_by_two_values fue llamado
            mock_invoice_repo.get_invoice_by_two_values.assert_called_once_with("id", "user_id", filter_value, user_id)
            mock_invoice_details_repo.get_invoice_detail_by_value.assert_not_called()



