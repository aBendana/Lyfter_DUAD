import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import mock_open, patch
from datetime import datetime, timezone, timedelta
import jwt
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend
from app.infrastructure.security.jwt_manager import JWT_Manager

class TestJWT_Manager:
    
    def setup_method(self):
        # generate RSA keys
        private_key_obj = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
            backend=default_backend()
        )
        
        self.private_key = private_key_obj.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption()
        )
        
        self.public_key = private_key_obj.public_key().public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        )
        
        # Mock the read of the keys
        with patch("builtins.open", mock_open(read_data=self.private_key)):
            self.jwt_manager = JWT_Manager(secret="test_secret", algorithm="RS256")
            self.jwt_manager.private_key = self.private_key
            self.jwt_manager.public_key = self.public_key


    # tests for encode
    # success case: access token
    def test_encode_access_token_success(self):
        # Arrange
        data = {"user_id": 123}
        # Act
        token = self.jwt_manager.encode(data)
        # Assert
        decoded = jwt.decode(token, self.public_key, algorithms=["RS256"])
        assert decoded["type"] == "access"
        assert decoded["user_id"] == 123


    # success case: refresh token
    def test_encode_refresh_token_success(self):
        # Arrange
        data = {"user_id": 456}
        # Act
        token = self.jwt_manager.encode(data, is_refresh=True)
        # Assert
        decoded = jwt.decode(token, self.public_key, algorithms=["RS256"])
        assert decoded["type"] == "refresh"
        assert decoded["user_id"] == 456


    # tests for decode
    # sucess case: valid token
    def test_decode_valid_token(self):
        # Arrange
        payload = {
            "user_id": 789,
            "exp": datetime.now(timezone.utc) + timedelta(seconds=60),
            "iat": datetime.now(timezone.utc),
            "type": "access",
            "iss": "test_secret"
        }
        token = jwt.encode(payload, self.private_key, algorithm="RS256")
        # Act
        decoded = self.jwt_manager.decode(token)
        # Assert
        assert decoded["user_id"] == 789
        assert decoded["type"] == "access"


    # failure case: expired token
    def test_decode_expired_token(self):
        # Arrange
        payload = {
            "user_id": 100,
            "exp": datetime.now(timezone.utc) - timedelta(seconds=10),
            "iat": datetime.now(timezone.utc) - timedelta(seconds=20),
            "type": "access",
            "iss": "test_secret"
        }
        token = jwt.encode(payload, self.private_key, algorithm="RS256")
        # Act
        decoded = self.jwt_manager.decode(token)
        # Assert
        assert decoded is None

