import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from flask import Flask, json, g
from unittest.mock import Mock, MagicMock, patch, call
from app.routes.api_cart import cart_bp


class TestAdminUsersAPI:

    def setup_method(self):
        # Arrange
        # flask instance with admin_users_bp blueprint
        self.app = Flask(__name__)
        self.app.register_blueprint(cart_bp)

        # test client to simulate HTTP requests to the Flask app.
        self.client = self.app.test_client()


    # test for create_and_fill_cart
    # success case: 1st product in cart
    def test_for_create_and_fill_cart_1st_product_in_cart(self):
        # Arrange
        product_data = {"product_id": 5, "quantity": 2}
        user_id = 1
        user_name = "Michael Jordan"

        with patch("app.routes.api_cart.carts_repo") as mock_carts_repo, \
            patch("app.routes.api_cart.products_repo") as mock_products_repo, \
            patch("app.routes.api_cart.products_in_cart_repo") as mock_products_in_cart_repo, \
            patch("app.routes.api_cart.transactions") as mock_transactions, \
            patch("app.routes.api_cart.cache_manager") as mock_cache_manager:

            # no pending cart exists initially
            mock_carts_repo.get_cart_by_two_values.return_value = None
            mock_carts_repo.new_cart.return_value = {"id": 10, "user_id": user_id, "status": "pending"}
            # product exists in cache
            mock_cache_manager.check_key.return_value = True

            # Act - use test_request_context to set g
            with self.app.test_request_context('/cart', method='POST', json=product_data):
                
                g.user_id = user_id
                g.user_name = user_name
                
                # call the unwrapped function directly
                from app.routes.api_cart import create_and_fill_cart
                response_data, status_code = create_and_fill_cart.__wrapped__()

            # Assert
            assert status_code == 200
            assert response_data.get_json()["message"] == "Product added to shopping cart"
            assert response_data.get_json()["user"] == user_name

            # interactions
            mock_carts_repo.get_cart_by_two_values.assert_called_once_with("user_id", "status", user_id, "pending")
            mock_carts_repo.new_cart.assert_called_once_with({"user_id": user_id, "status": "pending"})
            mock_transactions.update_take_from_stock.assert_called_once_with(5, 2)
            mock_products_in_cart_repo.new_product_in_cart.assert_called_once_with({"cart_id": 10, "product_id": 5, "quantity": 2})


    # failure case: no product quantity
    def test_create_and_fill_cart_no_quantity_given(self):
        # Arrange
        product_data = {"product_id": 5}  # missing quantity
        user_id = 1
        user_name = "Michael Jordan"

        # Act - use test_request_context to set g
        with self.app.test_request_context('/cart', method='POST', json=product_data):
            g.user_id = user_id
            g.user_name = user_name
            
            # call the unwrapped function directly
            from app.routes.api_cart import create_and_fill_cart
            response_data, status_code = create_and_fill_cart.__wrapped__()

        # Assert
        assert status_code == 400
        response_json = response_data.get_json()
        assert "Product id and quantity are required" in response_json["error"]


    # tests for show_actual_cart
    # success case: show pending cart
    def test_show_actual_cart_with_pending_cart(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"
        cart_id = 10
        
        cart_data = [{"id": cart_id, "user_id": user_id, "status": "pending"}]
        cart_details = [
            {"id": 1, "cart_id": cart_id, "product_id": 5, "quantity": 2},
            {"id": 2, "cart_id": cart_id, "product_id": 3, "quantity": 1}
        ]

        with patch("app.routes.api_cart.carts_repo") as mock_carts_repo, \
            patch("app.routes.api_cart.products_in_cart_repo") as mock_products_in_cart_repo:

            # Mock cart and cart details
            mock_carts_repo.get_cart_by_two_values.return_value = cart_data
            mock_products_in_cart_repo.get_product_in_cart_by_value.return_value = cart_details

            # Act - use test_request_context to set g
            with self.app.test_request_context('/cart', method='GET'):
                g.user_id = user_id
                g.user_name = user_name
                
                # call the unwrapped function directly
                from app.routes.api_cart import show_actual_cart
                response_data, status_code = show_actual_cart.__wrapped__()

            # Assert
            assert status_code == 200
            response_json = response_data.get_json()
            assert response_json["cart"] == cart_data
            assert response_json["cart_details"] == cart_details
            assert response_json["user"] == user_name

            # interactions
            mock_carts_repo.get_cart_by_two_values.assert_called_once_with("user_id", "status", user_id, "pending")
            mock_products_in_cart_repo.get_product_in_cart_by_value.assert_called_once_with("cart_id", cart_id)


    # failure case: no pending cart
    def test_show_actual_cart_without_pending_cart(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"

        with patch("app.routes.api_cart.carts_repo") as mock_carts_repo, \
            patch("app.routes.api_cart.products_in_cart_repo") as mock_products_in_cart_repo:

            # mocks
            mock_carts_repo.get_cart_by_two_values.return_value = None

            # Act - usar test_request_context para establecer g
            with self.app.test_request_context('/cart', method='GET'):
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_cart import show_actual_cart
                response_data, status_code = show_actual_cart.__wrapped__()

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert "Michael Jordan doesn't have an active cart" in response_json["error"]

            # interactions
            mock_carts_repo.get_cart_by_two_values.assert_called_once_with("user_id", "status", user_id, "pending")
            mock_products_in_cart_repo.get_product_in_cart_by_value.assert_not_called()


    # tests for update_quantity_item
    # success case: update quantity of product in cart
    def test_update_quantity_item_success(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"
        cart_id = 10
        product_id = 5
        new_quantity = 3
        product_in_cart_id = 100
        current_quantity = 2
        product_update = {"product_id": product_id, "quantity": new_quantity}

        cart_data = [{"id": cart_id, "user_id": user_id, "status": "pending"}]
        product_in_cart_data = [{"id": product_in_cart_id, "cart_id": cart_id, "product_id": product_id, "quantity": current_quantity}]

        with patch("app.routes.api_cart.carts_repo") as mock_carts_repo, \
            patch("app.routes.api_cart.products_in_cart_repo") as mock_products_in_cart_repo, \
            patch("app.routes.api_cart.transactions") as mock_transactions, \
            patch("app.routes.api_cart.cache_manager") as mock_cache_manager:

            mock_carts_repo.get_cart_by_two_values.return_value = cart_data
            mock_products_in_cart_repo.get_product_in_cart_by_two_values.return_value = product_in_cart_data

            # Act - simulate request context and g
            with self.app.test_request_context('/cart/item', method='PATCH', json=product_update):
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_cart import update_quantity_item
                response_data, status_code = update_quantity_item.__wrapped__()

            # Assert
            assert status_code == 200
            response_json = response_data.get_json()
            assert response_json["message"] == "Item's quantity updated"
            assert response_json["user"] == user_name

            # interactions
            mock_carts_repo.get_cart_by_two_values.assert_called_once_with("user_id", "status", user_id, "pending")
            mock_products_in_cart_repo.get_product_in_cart_by_two_values.assert_called_once_with("cart_id", "product_id", cart_id, product_id)
            mock_transactions.stock_logic.assert_called_once_with(current_quantity, new_quantity, product_id, product_in_cart_id)
            mock_cache_manager.invalidate_cache_page.assert_called_once_with("products", "id", product_id)
            mock_cache_manager.invalidate_cache_by_id.assert_called_once_with("product", "id", product_id)
            mock_cache_manager.delete_data_with_pattern.assert_called_once_with("products:*")


    # failure case: invalid columnn search for cart
    def test_update_quantity_item_invalid_column_statusx(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"
        product_id = 5
        new_quantity = 3

        product_update = {"product_id": product_id, "quantity": new_quantity}

        # patchs
        with patch("app.routes.api_cart.carts_repo") as mock_carts_repo, \
            patch("app.routes.api_cart.products_in_cart_repo") as mock_products_in_cart_repo, \
            patch("app.routes.api_cart.transactions") as mock_transactions, \
            patch("app.routes.api_cart.cache_manager") as mock_cache_manager:

            mock_carts_repo.get_cart_by_two_values.side_effect = ValueError("Column 'statusx' not exists or not allowed for searches or modification.")

            # Act - g context
            with self.app.test_request_context('/cart/item', method='PATCH', json=product_update):
                from flask import g
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_cart import update_quantity_item
                response_data, status_code = update_quantity_item.__wrapped__()

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert "Column 'statusx' not exists or not allowed for searches or modification." in response_json["error"]

            # interactions
            mock_carts_repo.get_cart_by_two_values.assert_called_once_with("user_id", "status", user_id, "pending")
            # no execute
            mock_products_in_cart_repo.get_product_in_cart_by_two_values.assert_not_called()
            mock_transactions.stock_logic.assert_not_called()
            mock_cache_manager.invalidate_cache_page.assert_not_called()

    
    # tests for delete_item_for_cart
    # success case: item deleted from cart
    def test_delete_item_from_cart_success(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"
        cart_id = 10
        product_id = "5"
        product_in_cart_id = 100
        current_quantity = 2
        cart_data = [{"id": cart_id, "user_id": user_id, "status": "pending"}]
        products_in_cart_data = [{"id": product_in_cart_id, "cart_id": cart_id, "product_id": int(product_id), "quantity": current_quantity}]

        with patch("app.routes.api_cart.carts_repo") as mock_carts_repo, \
            patch("app.routes.api_cart.products_in_cart_repo") as mock_products_in_cart_repo, \
            patch("app.routes.api_cart.transactions") as mock_transactions, \
            patch("app.routes.api_cart.cache_manager") as mock_cache_manager:

            mock_carts_repo.get_cart_by_two_values.return_value = cart_data
            mock_products_in_cart_repo.get_product_in_cart_by_two_values.return_value = products_in_cart_data

            # Act – simulate request context and g
            with self.app.test_request_context(f"/cart/item/{product_id}", method="DELETE"):
                from flask import g
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_cart import delete_item_from_cart
                response_data, status_code = delete_item_from_cart.__wrapped__(product_id)

            # Assert
            assert status_code == 200
            response_json = response_data.get_json()
            assert response_json["message"] == "Product removed from cart"
            assert response_json["user"] == user_name

            # interactions
            mock_carts_repo.get_cart_by_two_values.assert_called_once_with("user_id", "status", user_id, "pending")
            mock_products_in_cart_repo.get_product_in_cart_by_two_values.assert_called_once_with("cart_id", "product_id", cart_id, product_id)
            mock_transactions.update_add_to_stock.assert_called_once_with(product_id, current_quantity)
            mock_cache_manager.invalidate_cache_page.assert_called_once_with("products", "id", int(product_id))
            mock_cache_manager.invalidate_cache_by_id.assert_called_once_with("product", "id", product_id)
            mock_cache_manager.delete_data_with_pattern.assert_called_once_with("products:*")
            mock_products_in_cart_repo.delete_product_in_cart.assert_called_once_with("id", product_in_cart_id)


    # failure case: product not in cart
    def test_delete_item_from_cart_product_not_found(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"
        cart_id = 10
        product_id = "5"
        cart_data = [{"id": cart_id, "user_id": user_id, "status": "pending"}]

        with patch("app.routes.api_cart.carts_repo") as mock_carts_repo, \
            patch("app.routes.api_cart.products_in_cart_repo") as mock_products_in_cart_repo, \
            patch("app.routes.api_cart.transactions") as mock_transactions, \
            patch("app.routes.api_cart.cache_manager") as mock_cache_manager:

            mock_carts_repo.get_cart_by_two_values.return_value = cart_data
            mock_products_in_cart_repo.get_product_in_cart_by_two_values.return_value = None

            # Act – simulate request context and g
            with self.app.test_request_context(f"/cart/item/{product_id}", method="DELETE"):
                from flask import g
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_cart import delete_item_from_cart
                response_data, status_code = delete_item_from_cart.__wrapped__(product_id)

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert "Product not found in the cart" in response_json["error"]

            # interactions
            mock_carts_repo.get_cart_by_two_values.assert_called_once_with("user_id", "status", user_id, "pending")
            mock_products_in_cart_repo.get_product_in_cart_by_two_values.assert_called_once_with("cart_id", "product_id", cart_id, product_id)
            # interactions that don't happen
            mock_transactions.update_add_to_stock.assert_not_called()
            mock_cache_manager.invalidate_cache_page.assert_not_called()
            mock_cache_manager.invalidate_cache_by_id.assert_not_called()
            mock_cache_manager.delete_data_with_pattern.assert_not_called()
            mock_products_in_cart_repo.delete_product_in_cart.assert_not_called()





