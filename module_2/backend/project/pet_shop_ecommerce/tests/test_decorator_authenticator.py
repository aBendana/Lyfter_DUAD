import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from flask import Flask, g
from unittest.mock import Mock, MagicMock, patch
from app.infrastructure.security.decorator_authenticator import me, client_only


class TestDecoratorAuthenticator:

    def setup_method(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True

    # tests for me
    # success case: valid access token
    @patch('app.infrastructure.security.decorator_authenticator.jwt_manager')
    def test_me_valid_access_token(self, mock_jwt_manager):
        # Arrange
        mock_jwt_manager.decode.return_value = {"id": 1, "role": "client", "type": "access"}

        # Act Execute inside Flask request context
        with self.app.test_request_context('/auth/login', headers={"Authorization": "Bearer valid_token"}):
            result = me()

        # Assert
        assert result["id"] == 1
        assert result["role"] == "client"
        assert result["type"] == "access"


    # success case: refresh token generates new access token
    @patch('app.infrastructure.security.decorator_authenticator.jwt_manager')
    def test_me_refresh_token(self, mock_jwt_manager):
        # Arrange
        # first decode -> refresh token payload, second decode -> access payload (after encode)
        mock_jwt_manager.decode.side_effect = [
            {"id": 1, "role": "client", "type": "refresh"},
            {"id": 1, "role": "client", "type": "access"}
        ]
        mock_jwt_manager.encode.return_value = "new_access_token"

        # Act: provide a refresh token in the Authorization header
        with self.app.test_request_context('/auth/refresh-token', headers={"Authorization": "Bearer refresh_token"}):
            result = me()

        # Assert
        assert result["id"] == 1
        assert result["type"] == "access"
        mock_jwt_manager.encode.assert_called_once()


    # failure case: no token provided
    def test_me_no_token(self):
        # Act: create a request context without Authorization header
        with self.app.test_request_context('/auth/login'):
            result = me()

        # Assert
        assert result is None


    # Tests for client_only decorator
    # success case: valid client access
    @patch('app.infrastructure.security.decorator_authenticator.me')
    @patch('app.infrastructure.security.decorator_authenticator.cache_manager')
    def test_client_only_success(self, mock_cache_manager, mock_me):
        # Arrange
        mock_me.return_value = {"id": 1, "role": "client"}
        mock_cache_manager.user_data_caching.return_value = [{"name": "Andy Bendana"}]

        # define a test route decorated with client_only
        @client_only
        def test_login():
            return "Success"

        # Act & Assert: call the route and check g-values inside the request context
        with self.app.test_request_context():
            result = test_login()

            # Assert inside the context where `g` is available
            assert result == "Success"
            assert g.user_id == 1
            assert g.user_role == "client"
            assert g.user_name == "Andy Bendana"


    # failure case: exception in decorator
    @patch('app.infrastructure.security.decorator_authenticator.me')
    @patch('app.infrastructure.security.decorator_authenticator.cache_manager')
    def test_client_only_exception(self, mock_cache_manager, mock_me):
        # Arrange
        mock_me.return_value = {"id": 1, "role": "client"}
        mock_cache_manager.user_data_caching.side_effect = Exception("DB error")

        @client_only
        def test_login():
            return "Success"

        # Act
        with self.app.test_request_context():
            result = test_login()

        # Assert
        assert result.status_code == 401
        assert b"User Unauthorized!" in result.data