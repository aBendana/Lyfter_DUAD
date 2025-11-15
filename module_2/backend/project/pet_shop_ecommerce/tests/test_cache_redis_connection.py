import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
import redis
from unittest.mock import Mock, MagicMock, patch
from pytest_mock import mocker
from app.infrastructure.cache.cache_redis_connection import RedisConnection

class TestRedisConnection:

    def setup_method(self):
        RedisConnection._client = None

    def teardown_method(self):
        # clean after each test
        RedisConnection._client = None


    # tests for connect
    # success case: successful connection 
    @patch.dict(os.environ, {'redis_host': 'localhost', 'redis_port': '6379', 'redis_password': 'test_password'})
    def test_connect_success(self, mocker):
        # Arrange
        mock_client = MagicMock()
        mock_client.ping.return_value = True
        mock_redis = mocker.patch('app.infrastructure.cache.cache_redis_connection.Redis')
        mock_redis.return_value = mock_client

        # Act
        redis_conn = RedisConnection()

        # Assert
        assert RedisConnection._client is not None
        mock_redis.assert_called_once_with(host='localhost', port=6379, password='test_password')
        mock_client.ping.assert_called_once()


    # failure case: connection fails
    @patch.dict(os.environ, {'redis_host': 'localhost', 'redis_port': '6379', 'redis_password': 'test_password'})
    def test_connect_failure(self, mocker):
        # Arrange
        mock_redis = mocker.patch('app.infrastructure.cache.cache_redis_connection.Redis')
        mock_redis.side_effect = Exception("Connection refused")
        # Act
        redis_conn = RedisConnection()
        # Assert
        mock_redis.assert_called_once()
        assert RedisConnection._client is None


    # tests for get_client
    # success case
    @patch.dict(os.environ, {'redis_host': 'localhost', 'redis_port': '6379', 'redis_password': 'test_password'})
    def test_get_client_success(self, mocker):
        # Arrange
        mock_client = MagicMock()
        mock_client.ping.return_value = True
        
        mock_redis = mocker.patch('app.infrastructure.cache.cache_redis_connection.Redis')
        mock_redis.return_value = mock_client

        # Act
        redis_conn = RedisConnection()
        client = redis_conn.get_client()

        # Assert
        assert client is not None
        assert client == mock_client
        assert RedisConnection._client == mock_client
