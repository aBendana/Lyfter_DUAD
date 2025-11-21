import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from flask import Flask, json, g
from unittest.mock import Mock, MagicMock, patch, call
from app.routes.api_login import logins_bp


class TestLoginApi:

    def setup_method(self):
        # Arrange
        # flask instance with admin_users_bp blueprint
        self.app = Flask(__name__)
        self.app.register_blueprint(logins_bp)

        # test client to simulate HTTP requests to the Flask app.
        self.client = self.app.test_client()


    # tests case for register
    # success case: register a client
    def test_register_a_client(self):
        # Arrange
        user_data = {
            "name": "Michael Jordan",
            "email": "mjordan@example.com",
            "password": "mj23bulls",
            "phone_number": "8888-1111"
            # "role": "client" is default for registration
        }
        expected_user_id = 1    # id
        expected_role = "client"
        expected_token = "mocked.jwt.token"

        with patch("app.routes.api_login.users_repo") as mock_users_repo, \
            patch("app.routes.api_login.login_repo") as mock_login_repo, \
            patch("app.routes.api_login.jwt_manager") as mock_jwt_manager:

            # mock return values
            mock_users_repo.insert_user_register.return_value = [expected_user_id, expected_role]
            mock_login_repo.login_status_verification.return_value = None
            mock_jwt_manager.encode.return_value = expected_token

            # Act – simulate /auth/register (POST)
            response = self.client.post("/auth/register", json=user_data)

            # Assert
            assert response.status_code == 201
            response_json = response.get_json()
            assert response_json["message"] == "Successful Registration"
            assert response_json["token"] == expected_token

            # interactions
            mock_users_repo.insert_user_register.assert_called_once_with(user_data)
            mock_login_repo.login_status_verification.assert_called_once_with(expected_user_id, True)
            mock_jwt_manager.encode.assert_called_once_with({"id": expected_user_id, "role": expected_role})


    # failure case: integrity erros in user data phone_number is a int instead of str
    def test_register_wrong_phone_number_type(self):
        # Arrange
        user_data = {
            "name": "Michael Jordan",
            "email": "mjordan@example.com",
            "password": "secret123",
            "phone_number": 88881111,  # should be a string
        }

        with patch("app.routes.api_login.users_repo") as mock_users_repo, \
            patch("app.routes.api_login.login_repo"), \
            patch("app.routes.api_login.jwt_manager"):

            # mock value error
            mock_users_repo.insert_user_register.side_effect = ValueError("Integrity error: invalid input syntax for type int: '8888-1111'")

            # Act
            response = self.client.post("/auth/register", json=user_data)

            # Assert
            assert response.status_code == 400
            response_json = response.get_json()
            assert response_json["error"] == "Integrity error: invalid input syntax for type int: '8888-1111'" in response_json["error"]

            # Interactions
            mock_users_repo.insert_user_register.assert_called_once_with(user_data)


    # failure case: encode error
    def test_register_encode_failed(self):
        # Arrange
        user_data = {
            "name": "Michael Jordan",
            "email": "mjordan@example.com",
            "password": "secret123",
            "phone_number": "8888-1111"
        }

        result = [1, "client"]  # user_id, role_type

        with patch("app.routes.api_login.users_repo") as mock_users_repo, \
            patch("app.routes.api_login.login_repo") as mock_login_repo, \
            patch("app.routes.api_login.jwt_manager") as mock_jwt_manager:

            mock_users_repo.insert_user_register.return_value = result
            mock_login_repo.login_status_verification.return_value = None
            # mock encode error
            mock_jwt_manager.encode.side_effect = ValueError("JWT encode error: invalid key")

            # Act
            response = self.client.post("/auth/register", json=user_data)

            # Assert
            assert response.status_code == 400
            response_json = response.get_json()
            assert "JWT encode error: invalid key" in response_json["error"]

            # interactions
            mock_users_repo.insert_user_register.assert_called_once_with(user_data)
            mock_login_repo.login_status_verification.assert_called_once_with(1, True)
            mock_jwt_manager.encode.assert_called_once_with({"id": 1, "role": "client"})


    # tests for login
    # success case: login an administrator
    def test_login_administrator_success(self):
        # Arrange
        user_data = {"email": "admin@example.com", "password": "securepass"}

        user_exists = [{"id": 10, "email": "admin@example.com"}]
        result = [{"id": 10, "role": MagicMock(value="administrator")}]

        access_token = "mock.access.jwt.token"
        refresh_token = "mock.refresh.jwt.token"

        with patch("app.routes.api_login.users_repo") as mock_users_repo, \
            patch("app.routes.api_login.login_repo") as mock_login_repo, \
            patch("app.routes.api_login.jwt_manager") as mock_jwt_manager:

            # Configurar mocks
            mock_users_repo.get_user_by_value_login.return_value = user_exists
            mock_users_repo.get_user_by_credentials.return_value = result
            mock_login_repo.login_status_verification.return_value = None
            mock_jwt_manager.encode.side_effect = [access_token, refresh_token]

            # Act
            response = self.client.post("/auth/login", json=user_data)

            # Assert
            assert response.status_code == 200
            response_json = response.get_json()
            assert response_json["message"] == "Administrator: Successful Login!"
            assert response_json["access_token"] == access_token
            assert response_json["refresh_token"] == refresh_token

            # interactions
            mock_users_repo.get_user_by_value_login.assert_called_once_with("email", "admin@example.com")
            mock_users_repo.get_user_by_credentials.assert_called_once_with(
                user_data, 'email', 'password', 'admin@example.com', 'securepass')
            mock_login_repo.login_status_verification.assert_called_once_with(10, True)
            mock_jwt_manager.encode.assert_any_call({'id': 10, 'role': result[0]["role"]})
            mock_jwt_manager.encode.assert_any_call({'id': 10, 'role': result[0]["role"]}, expires_in=604800, is_refresh=True)


    # failure case: wrong password 403
    def test_login_wrong_password(self):
        # Arrange
        user_data = {"email": "mj@example.com", "password": "wrongpass"}
        user_exists = [{"id": 1, "email": "mj@example.com"}]

        with patch("app.routes.api_login.users_repo") as mock_users_repo, \
            patch("app.routes.api_login.login_repo") as mock_login_repo, \
            patch("app.routes.api_login.jwt_manager") as mock_jwt_manager:

            # mocks
            mock_users_repo.get_user_by_value_login.return_value = user_exists
            mock_users_repo.get_user_by_credentials.return_value = []
            mock_login_repo.login_status_verification.side_effect = ValueError("Invalid credentials: Wrong password")

            # Act
            response = self.client.post("/auth/login", json=user_data)

            # Assert
            assert response.status_code == 403
            response_json = response.get_json()
            assert "Invalid credentials: Wrong password" in response_json["error"]

            # interactions
            mock_users_repo.get_user_by_value_login.assert_called_once_with("email", "mj@example.com")
            mock_users_repo.get_user_by_credentials.assert_called_once_with(
                user_data, "email", "password", "mj@example.com", "wrongpass")
            mock_login_repo.login_status_verification.assert_called_once_with(1, False)
            mock_jwt_manager.encode.assert_not_called()


    # failure case: info missing
    def test_login_missing_info(self):
        # Arrange
        user_data = {"email": "mj@example.com"} # no password

        with patch("app.routes.api_login.users_repo") as mock_users_repo, \
            patch("app.routes.api_login.login_repo") as mock_login_repo, \
            patch("app.routes.api_login.jwt_manager") as mock_jwt_manager:

            # Act
            response = self.client.post("/auth/login", json=user_data)

            # Assert
            assert response.status_code == 422
            response_json = response.get_json()
            assert response_json["error"] == "Info missing required"

            # no interactions
            mock_users_repo.get_user_by_value_login.assert_not_called()
            mock_users_repo.get_user_by_credentials.assert_not_called()
            mock_login_repo.login_status_verification.assert_not_called()
            mock_jwt_manager.encode.assert_not_called()


    # tests for me
    # success case: token verified
    def test_me_token_verified(self):
        # Arrange
        mock_decoded_token = {"id": 1, "role": "client"}
        mock_user = [{"id": 1, "name": "Michael Jordan"}]

        with patch("app.routes.api_login.jwt_manager.decode") as mock_decode, \
            patch("app.routes.api_login.users_repo.get_user_by_value") as mock_get_user:
            # mocks
            mock_decode.return_value = mock_decoded_token
            mock_get_user.return_value = mock_user

            headers = {"Authorization": "Bearer valid_token"}

            # Act
            response = self.client.get("/auth/me", headers=headers)

            # Assert
            assert response.status_code == 200
            data = response.get_json()
            assert data["id"] == 1
            assert data["role"] == "client"
            assert data["username"] == "Michael Jordan"

            mock_decode.assert_called_once_with("valid_token")
            mock_get_user.assert_called_once_with("id", 1)


    # failure case: token nor provided
    def test_me_no_token(self):
        # Act
        response = self.client.get("/auth/me")  # sin header Authorization

        # Assert
        assert response.status_code == 403
        assert response.data.decode("utf-8") == "Token not provided"
        assert response.content_type == "text/plain"


    # failure case: expired token
    def test_me_token_expired(self):
        # Arrange
        expired_token = "Bearer expiredtoken123"

        with patch("app.routes.api_login.jwt_manager.decode") as mock_decode:
            mock_decode.return_value = None

            # Act
            response = self.client.get("/auth/me", headers={"Authorization": expired_token})

        # Assert
        assert response.status_code == 401
        assert response.data.decode("utf-8") == "Invalid or expired token"
        assert response.content_type == "text/plain"
        mock_decode.assert_called_once_with("expiredtoken123")


    # tests for refresh_token
    # success case: new access token generate
    def test_refresh_token_new_access_token_generate(self):
        # Arrange
        refresh_token_value = "Bearer valid_refresh_token_123"
        mock_decoded_refresh = {"id": 1, "role": "client", "type": "refresh"}
        new_access_token = "new_access_token_456"

        with patch("app.routes.api_login.jwt_manager.decode") as mock_decode, \
            patch("app.routes.api_login.jwt_manager.encode") as mock_encode:

            mock_decode.return_value = mock_decoded_refresh
            mock_encode.return_value = new_access_token
            
            # Act
            response = self.client.post(
                "/auth/refresh-token",
                headers={"Authorization": refresh_token_value}
            )

        # Assert
        assert response.status_code == 200
        data = response.get_json()
        assert data["new_access_token"] == new_access_token

        mock_decode.assert_called_once_with("valid_refresh_token_123")
        mock_encode.assert_called_once_with({"id": 1, "role": "client"})

    
    # failure case: invalid token type (no refresh token)
    def test_refresh_token_invalid_type_token(self):
        # Arrange
        token_value = "Bearer access_token_123"
        mock_decoded_access = {"id": 1, "role": "client", "type": "access"}  # not a refresh token

        with patch("app.routes.api_login.jwt_manager.decode") as mock_decode:
            mock_decode.return_value = mock_decoded_access
            
            # Act
            response = self.client.post(
                "/auth/refresh-token",
                headers={"Authorization": token_value}
            )

        # Assert
        assert response.status_code == 403
        assert response.data.decode() == "Invalid token type"
        assert response.content_type == "text/plain"
        mock_decode.assert_called_once_with("access_token_123")
