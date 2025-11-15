import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from flask import Flask, json, g
from unittest.mock import Mock, MagicMock, patch, call
from sqlalchemy.exc import IntegrityError
from app.routes.api_client_info import client_info_bp


class TestClientInfoApi:

    def setup_method(self):
        # Arrange
        # flask instance with admin_users_bp blueprint
        self.app = Flask(__name__)
        self.app.register_blueprint(client_info_bp)

        # test client to simulate HTTP requests to the Flask app.
        self.client = self.app.test_client()


    # tests for show_personal_info
    # success case: retrieve personal info
    def test_show_personal_info_success(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"
        formatted_user = {
            "id": user_id,
            "name": user_name,
            "email": "mj@example.com",
            "password": "m23bulls",
            "phone_number": "8888-1111",
            "role": "client"
        }

        with patch("app.routes.api_client_info.users_repo") as mock_users_repo:
            mock_users_repo.get_user_by_value_for_api.return_value = formatted_user

            # Act – simulate request context and g
            with self.app.test_request_context("/client/info/personal-data", method="GET"):
                g.user_id = user_id

                from app.routes.api_client_info import show_personal_info
                response_data, status_code = show_personal_info.__wrapped__()

            # Assert
            assert status_code == 200
            response_json = response_data.get_json()
            assert response_json == formatted_user
            mock_users_repo.get_user_by_value_for_api.assert_called_once_with("id", user_id)


    # failure case: invalid value for "id"
    def test_show_personal_info_invalid_column_value(self):
        # Arrange
        user_id = 1000

        with patch("app.routes.api_client_info.users_repo") as mock_users_repo:
            mock_users_repo.get_user_by_value_for_api.side_effect = ValueError("Invalid value '1000' for column 'id'")

            # Act – simulate request context and g
            with self.app.test_request_context("/client/info/personal-data", method="GET"):
                g.user_id = user_id

                from app.routes.api_client_info import show_personal_info
                response_data, status_code = show_personal_info.__wrapped__()

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert "Invalid value" in response_json["error"]
            assert "Invalid value '1000' for column 'id'" in response_json["error"]
            mock_users_repo.get_user_by_value_for_api.assert_called_once_with("id", user_id)


    # tests for update_personal_info
    # failure case: Integrity Error
    def test_update_personal_info_integrity_error(self):
        # Arrange
        user_id = 1
        personal_data = {"email": "duplicate@example.com"}

        with patch("app.routes.api_client_info.users_repo") as mock_users_repo:
            mock_users_repo.update_user.side_effect = ValueError("IntegrityError: duplicate email not allowed")

            # Act – simulate request context and g
            with self.app.test_request_context("/client/info/personal-data", method="PATCH", json=personal_data):
                g.user_id = user_id

                from app.routes.api_client_info import update_personal_info
                response_data, status_code = update_personal_info.__wrapped__()

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert "IntegrityError" in response_json["error"]
            assert "duplicate email not allowed" in response_json["error"]
            mock_users_repo.update_user.assert_called_with("id", user_id, "email", "duplicate@example.com")


    # tests for create_address
    # success case: create new address
    def test_create_address_success(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"
        address_data = {
                        "address": "Avenida 2, Calles 1 y 3, frente al Teatro Nacional",
                        "canton": "San José",
                        "province": "San José",
                        "postal_code": "10101"
                }

        formatted_address = {
                        "id": 1,
                        "user_id": 1,
                        "address": "Avenida 2, Calles 1 y 3, frente al Teatro Nacional",
                        "canton": "San José",
                        "province": "San José",
                        "postal_code": "10101"
                        }

        with patch("app.routes.api_client_info.addresses_repo") as mock_addresses_repo:
            mock_addresses_repo.insert_address.return_value = formatted_address

            # Act – simulate request context and g
            with self.app.test_request_context("/client/info/shipping-addresses", method="POST", json=address_data):
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_client_info import create_address
                response_data, status_code = create_address.__wrapped__()

            # Assert
            assert status_code == 200
            response_json = response_data.get_json()
            assert response_json["message"] ==  "Michael Jordan your shipping address has been successfully saved"
            assert response_json["address"] == formatted_address
            # address data passed to insert_address includes user_id
            expected_address_data = address_data
            expected_address_data["user_id"] = user_id
            mock_addresses_repo.insert_address.assert_called_once_with(expected_address_data)


    # failure case: Integrity Error, integer instead of string on postal code
    def test_create_address_integrity_error(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"
        address_data = {
                        "address": "Avenida 2, Calles 1 y 3, frente al Teatro Nacional",
                        "canton": "San José",
                        "province": "San José",
                        "postal_code": 10101
                    }
        
        with patch("app.routes.api_client_info.addresses_repo") as mock_addresses_repo:
            mock_addresses_repo.insert_address.side_effect =  ValueError("Integrity Error: invalid input syntax for type character varying: \"60601\"", None, None)

            # Act – simulate request context and g
            with self.app.test_request_context("/client/info/shipping-addresses", method="POST", json=address_data):
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_client_info import create_address
                response_data, status_code = create_address.__wrapped__()

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert "Integrity Error: invalid input syntax for type character varying: \"60601\"" in response_json["error"]
            # address data passed to insert_address includes user_id
            expected_address_data = address_data
            expected_address_data["user_id"] = user_id
            mock_addresses_repo.insert_address.assert_called_once_with(expected_address_data)


    # tests for show_addresses
    # success case: check all personal addresses for user_id = 1
    def test_show_addresses_for_user_id_1(self):
        # Arrange
        user_id = 1
        addresses = [{
                        "id": 1,
                        "user_id": 1,
                        "address": "Avenida 2, Calles 1 y 3, frente al Teatro Nacional",
                        "canton": "San José",
                        "province": "San José",
                        "postal_code": "10101"
                    },
                    {
                        "id": 2,
                        "user_id": 1,
                        "address": "Universidad Nacional, Campus Omar Dengo",
                        "canton": "Heredia",
                        "province": "Heredia",
                        "postal_code": "40101"
                    }
                ]

        with patch("app.routes.api_client_info.addresses_repo") as mock_addresses_repo:
            mock_addresses_repo.show_addresses.return_value = addresses

            # Act – simulate request context and g
            with self.app.test_request_context("/client/info/shipping-addresses", method="GET"):
                g.user_id = user_id

                from app.routes.api_client_info import show_addresses
                response_data, status_code = show_addresses.__wrapped__()

            # Assert
            assert status_code == 200
            response_json = response_data.get_json()
            assert response_json == addresses
            mock_addresses_repo.show_addresses.assert_called_once_with(user_id)


    # failure case: incomplete query parameters
    def test_show_addresses_failure_incomplete_query_params(self):
        # Arrange
        user_id = 1

        with patch("app.routes.api_client_info.addresses_repo") as mock_addresses_repo:
            # Act – simulate request context and g with empty filter value
            with self.app.test_request_context("/client/info/shipping-addresses?city=", method="GET"):
                g.user_id = user_id

                from app.routes.api_client_info import show_addresses
                response_data, status_code = show_addresses.__wrapped__()

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert "Column or column's value info incomplete" in response_json["error"]
            # interactions not called
            mock_addresses_repo.get_address_by_value.assert_not_called()
            mock_addresses_repo.show_addresses.assert_not_called()


    # tests for update_address
    # success case: update province and postal code
    def test_update_address_success(self):
        # Arrange
        user_id = 1
        user_name = "Michael Jordan"
        address_id = "10"
        update_data = {
            "province": "San Jose",
            "postal_code": "10001"
        }

        with patch("app.routes.api_client_info.addresses_repo") as mock_addresses_repo:
            # simulate address ownership check
            mock_addresses_repo.get_address_by_value.return_value = [{"id": int(address_id), "user_id": user_id}]
            
            # Act – simulate request context and g
            with self.app.test_request_context(f"/client/info/shipping-addresses/{address_id}", method="PATCH", json=update_data):
                g.user_id = user_id
                g.user_name = user_name

                from app.routes.api_client_info import update_address
                response_data, status_code = update_address.__wrapped__(address_id)

            # Assert
            assert status_code == 200
            response_json = response_data.get_json()
            assert response_json["message"] == "Successful updated"

            # interactions
            mock_addresses_repo.get_address_by_value.assert_called_once_with("id", "user_id", address_id, user_id)
            mock_addresses_repo.update_address.assert_any_call("id", address_id, "province", "San Jose")
            mock_addresses_repo.update_address.assert_any_call("id", address_id, "postal_code", "10001")
            assert mock_addresses_repo.update_address.call_count == 2


    # failure case: address not found or not owned by user
    def test_update_address_not_found(self):
        # Arrange
        user_id = 1
        address_id = "10"
        update_data = {
            "canton": "San Jose",
            "postal_code": "10001"
        }

        with patch("app.routes.api_client_info.addresses_repo") as mock_addresses_repo:
            # Simulate address not found
            mock_addresses_repo.get_address_by_value.return_value = []

            # Act – simulate request context and g
            with self.app.test_request_context(f"/client/info/shipping-addresses/{address_id}", method="PATCH", json=update_data):
                g.user_id = user_id

                from app.routes.api_client_info import update_address
                response_data, status_code = update_address.__wrapped__(address_id)

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert "Address not found or not owned by user" 
            # interactions
            mock_addresses_repo.get_address_by_value.assert_called_once_with("id", "user_id", address_id, user_id)
            mock_addresses_repo.update_address.assert_not_called()


    # tests for delete_address
    # success case: delete address id 10
    def test_delete_address_success(self):
        # Arrange
        user_id = 1
        address_id = "10"
        
        address_data_verified = [{
            "id": 10,
            "user_id": user_id,
            "address": "Calle 123",
            "canton": "San José",
            "province": "San José",
            "postal_code": "10101"
        }]

        with patch("app.routes.api_client_info.addresses_repo") as mock_addresses_repo:
            # mocks
            mock_addresses_repo.get_address_by_value.return_value = address_data_verified
            mock_addresses_repo.delete_address.return_value = None

            # Act - simulate request context and g
            with self.app.test_request_context(f"/client/info/shipping-addresses/{address_id}", method="DELETE"):
                g.user_id = user_id

                from app.routes.api_client_info import delete_address
                response_data, status_code = delete_address.__wrapped__(address_id)

            # Assert
            assert status_code == 200
            response_json = response_data.get_json()
            assert response_json["address"] == address_id
            assert response_json["message"] == "Successful deleted"

            # interactions
            mock_addresses_repo.get_address_by_value.assert_called_once_with("id", "user_id", address_id, user_id)
            mock_addresses_repo.delete_address.assert_called_once_with("id", address_id)


    # failure case: wrong search column idx
    def test_delete_address_wrong_search_column_idx(self):
        # Arrange
        user_id = 1
        address_id = "10"

        with patch("app.routes.api_client_info.addresses_repo") as mock_addresses_repo:
            # Simulate invalid column error
            mock_addresses_repo.get_address_by_value.side_effect = ValueError("Column 'idx' not exists or not allowed for searches or modification.")

            # Act - simulate request context and g
            with self.app.test_request_context(f"/client/info/shipping-addresses/{address_id}", method="DELETE"):
                g.user_id = user_id

                from app.routes.api_client_info import delete_address
                response_data, status_code = delete_address.__wrapped__(address_id)

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert "Column 'idx' not exists or not allowed for searches or modification." in response_json["error"]

            # interactions
            mock_addresses_repo.get_address_by_value.assert_called_once_with("id", "user_id", address_id, user_id)
            mock_addresses_repo.delete_address.assert_not_called()


    # failure case: invalid address_id value
    def test_delete_address_invalid_address_id(self):
        # Arrange
        user_id = 1
        address_id = 1000

        with patch("app.routes.api_client_info.addresses_repo") as mock_addresses_repo:
            mock_addresses_repo.get_address_by_value.side_effect = ValueError(f"Invalid value '1000' for column 'id'.")

            # Act – simulate request context and g
            with self.app.test_request_context(f"/client/info/shipping-addresses/{address_id}", method="DELETE"):
                from flask import g
                g.user_id = user_id

                from app.routes.api_client_info import delete_address
                response_data, status_code = delete_address.__wrapped__(address_id)

            # Assert
            assert status_code == 400
            response_json = response_data.get_json()
            assert f"Invalid value '1000' for column 'id'." in response_json["error"]

            # interactions
            mock_addresses_repo.get_address_by_value.assert_called_once_with("id", "user_id", address_id, user_id)
            mock_addresses_repo.delete_address.assert_not_called()
    


