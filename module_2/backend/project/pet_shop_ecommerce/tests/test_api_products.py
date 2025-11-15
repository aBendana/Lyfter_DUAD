import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from flask import Flask, json, g, Response
from unittest.mock import Mock, MagicMock, patch, call
from sqlalchemy.exc import IntegrityError
from app.routes.api_products import products_bp


class TestProductApi:

    def setup_method(self):
        # Arrange
        # flask instance with admin_users_bp blueprint
        self.app = Flask(__name__)
        self.app.register_blueprint(products_bp)

        # test client to simulate HTTP requests to the Flask app.
        self.client = self.app.test_client()

    
    # tests for create_product
    # success case: product created successful
    def test_create_product_successful(self):
        # Arrange
        max_id = 50
        product_data = {
                "SKU": "VET-001",
                "name": "Canine Flea Treatment",
                "description": "Flea control solution for dogs of all breeds",
                "target_species": "dog",
                "supplier": "VetHealth Inc.",
                "stock": 50,
                "cost": 8.50,
                "price": 15.99
            }

        formatted_product = [{
            "id": 51,
            "name": "Canine Flea Treatment",
            "description": "Flea control solution for dogs of all breeds",
            "target_species": "dog",
            "supplier": "VetHealth Inc.",
            "stock": 50,
            "cost": 8.50,
            "price": 15.99
        }]

        with patch("app.routes.api_products.products_repo") as mock_products_repo, \
            patch("app.routes.api_products.cache_manager") as mock_cache_manager:

            mock_products_repo.get_product_max_id.return_value = max_id
            mock_products_repo.insert_product.return_value = formatted_product

            # Act – simulate request context
            with self.app.test_request_context("/products", method="POST", json=product_data):
                from app.routes.api_products import create_product
                response_data, status_code = create_product.__wrapped__()

            # Assert
            assert status_code == 200
            response_json = response_data.get_json()
            assert response_json["message"] == "Successful saved"
            assert response_json["product"] == formatted_product

            # interactions
            mock_products_repo.get_product_max_id.assert_called_once()
            mock_products_repo.insert_product.assert_called_once_with(product_data)
            mock_cache_manager.invalidate_cache_page.assert_called_once_with("products", "id", max_id)
            mock_cache_manager.delete_data_with_pattern.assert_called_once_with("products:all")

    
    # failure case: integrity error
    def test_create_product_sku_duplicate(self):
        # Arrange
        max_id = 50
        product_data = {
                "SKU": "VET-001",
                "name": "Canine Flea Treatment",
                "description": "Flea control solution for dogs of all breeds",
                "target_species": "dog",
                "supplier": "VetHealth Inc.",
                "stock": 50,
                "cost": 8.50,
                "price": 15.99
            }

        with patch("app.routes.api_products.products_repo") as mock_products_repo, \
            patch("app.routes.api_products.cache_manager") as mock_cache_manager:

            mock_products_repo.get_product_max_id.return_value = max_id
            mock_products_repo.insert_product.side_effect = ValueError("IntegrityError: duplicate SKU not allowed")

            # Act – simulate request context
            with self.app.test_request_context("/products", method="POST", json=product_data):
                from app.routes.api_products import create_product
                response_data, status_code = create_product.__wrapped__()

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert response_json["error"] == "IntegrityError: duplicate SKU not allowed"

            # interactions
            mock_products_repo.get_product_max_id.assert_called_once()
            mock_products_repo.insert_product.assert_called_once_with(product_data)
            mock_cache_manager.invalidate_cache_page.assert_not_called()
            mock_cache_manager.delete_data_with_pattern.assert_not_called()


    # tests for show_products
    # success case: show a specific product
    def test_show_products_id_1(self):
        # Arrange
        product_id = 1
        expected_product = [
                            {
                                "id": 1,
                                "SKU": "DOGG-FOOD-101",
                                "name": "Canine Complete Turkey",
                                "description": "Premium dry food with real turkey for puppy dogs",
                                "target_species": "Dog",
                                "supplier": "PetPro Supplies",
                                "stock": 100,
                                "cost": 20.5,
                                "price": 44.99
                            }
                        ]

        # mock Response object that get_and_caching returns
        mock_response = Response(json.dumps(expected_product), status=200, mimetype="application/json")

        with patch("app.routes.api_products.cache_manager") as mock_cache_manager:
            mock_cache_manager.get_and_caching.return_value = mock_response

            # Act – simulate request context
            with self.app.test_request_context(f"/products?id={product_id}", method="GET"):
                from app.routes.api_products import show_products
                response = show_products()

            # Assert
            assert response.status_code == 200
            assert response.get_json() == expected_product
            mock_cache_manager.get_and_caching.assert_called_once_with("id", str(product_id))


    # failure case: invalid column search idx
    def test_show_products_wrong_query_parameter_idx(self):
        # Arrange
        invalid_column = "idx"

        with patch("app.routes.api_products.cache_manager") as mock_cache_manager:
            mock_cache_manager.get_and_caching.side_effect = ValueError("Column 'idx' not exists or not allowed for searches or modification.")

            # Act – simulate request context
            with self.app.test_request_context(f"/products?{invalid_column}=1", method="GET"):
                from app.routes.api_products import show_products
                response = show_products()

            # Assert
            response_json, status_code = response
            assert status_code == 400
            assert response_json.get_json() == {"error":"Column 'idx' not exists or not allowed for searches or modification."}
            mock_cache_manager.get_and_caching.assert_called_once_with(invalid_column, "1")

    
    # failure case: no search id value
    def test_show_products_no_search_id_value(self):
        # Arrange
        column = "id"
        product_id = ''

        with patch("app.routes.api_products.cache_manager") as mock_cache_manager:
            mock_cache_manager.get_and_caching.side_effect = ValueError("Column or column's value info incomplete")

            # Act – simulate request context
            with self.app.test_request_context(f"/products?{column}=", method="GET"):
                from app.routes.api_products import show_products
                response = show_products()

            # Assert
            response_json, status_code = response
            assert status_code == 400
            assert response_json.get_json() == {"error":"Column or column's value info incomplete"}
            mock_cache_manager.get_and_caching.assert_called_once_with(column, '')


    # tests for update_product
    # success case: update stock from product id 1
    def test_update_product_stock_id_1(self):
        # Arrange
        product_id = 1
        update_data = {"stock": 120}

        with patch("app.routes.api_products.products_repo.update_product") as mock_update_product, \
            patch("app.routes.api_products.cache_manager.invalidate_cache_page") as mock_invalidate_page, \
            patch("app.routes.api_products.cache_manager.invalidate_cache_by_id") as mock_invalidate_by_id, \
            patch("app.routes.api_products.cache_manager.delete_data_with_pattern") as mock_delete_pattern:

            mock_update_product.return_value = None

            # Act
            with self.app.test_request_context(f"/products/{product_id}", method="PATCH", json=update_data):
                from app.routes.api_products import update_product
                response = update_product.__wrapped__(id_value=str(product_id))

            # Assert
            json_response, status_code = response
            assert status_code == 200
            assert json_response.json["message"] == "Successful updated"

            # interactions
            mock_update_product.assert_called_once_with("id", str(product_id), "stock", 120)
            mock_invalidate_page.assert_called_once_with("products", "id", int(product_id))
            mock_invalidate_by_id.assert_called_once_with("product", "id", str(product_id))
            mock_delete_pattern.assert_called_once_with("products:*")


    # failure case: invalid update column
    def test_update_product_SKU_value(self):
        # Arrange
        product_id = 1
        invalid_update_data = {"SKU": "NEW-SKU-VALUE"}

        with patch("app.routes.api_products.products_repo.update_product") as mock_update_product:
            mock_update_product.side_effect = ValueError("Column 'SKU' not exists or not allowed for searches or modification.")

            # Act
            with self.app.test_request_context(f"/products/{product_id}", method="PATCH", json=invalid_update_data):
                from app.routes.api_products import update_product
                response = update_product.__wrapped__(id_value=str(product_id))

            # Assert
            json_response, status_code = response
            assert status_code == 400
            assert json_response.json["error"] == "Column 'SKU' not exists or not allowed for searches or modification."
            mock_update_product.assert_called_once_with("id", str(product_id), "SKU", "NEW-SKU-VALUE")


    # tests for delete_product
    # success case: delete product id 1
    def test_delete_product_id_1(self):
        # Arrange
        product_id = 1

        with patch("app.routes.api_products.products_repo.delete_product") as mock_delete_product, \
            patch("app.routes.api_products.cache_manager.invalidate_cache_page") as mock_invalidate_page, \
            patch("app.routes.api_products.cache_manager.invalidate_cache_by_id") as mock_invalidate_by_id, \
            patch("app.routes.api_products.cache_manager.delete_data_with_pattern") as mock_delete_pattern:

            mock_delete_product.return_value = None

            # Act
            with self.app.test_request_context(f"/products/{product_id}", method="DELETE"):
                from app.routes.api_products import delete_product
                response = delete_product.__wrapped__(id_value=str(product_id))

            # Assert
            json_response, status_code = response
            assert status_code == 200
            assert json_response.json["product"] == str(product_id)
            assert json_response.json["message"] == "Successful deleted"

            # Verificar llamadas correctas
            mock_delete_product.assert_called_once_with("id", str(product_id))
            mock_invalidate_page.assert_called_once_with("products", "id", int(product_id))
            mock_invalidate_by_id.assert_called_once_with("product", "id", str(product_id))
            mock_delete_pattern.assert_called_once_with("products:*")
