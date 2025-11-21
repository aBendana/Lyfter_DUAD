import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import Mock, MagicMock, patch
from pytest_mock import mocker
from app.infrastructure.database.db_connection import DatabaseConnection


class TestDataBaseConnection:

    # success case: connection successful
    @patch.dict(os.environ, {'DATABASE_URI': 'postgresql://user:password@localhost/testdb'})
    @patch('app.infrastructure.database.db_connection.create_engine')
    def test_db_connection_successful(self, mock_create_engine):
        # Arrange
        mock_engine = MagicMock()
        mock_connection = MagicMock()
        mock_engine.connect.return_value = mock_connection
        mock_create_engine.return_value = mock_engine

        # Act
        db_conn = DatabaseConnection()
        db_conn.db_connection()

        # Assert
        mock_engine.connect.assert_called_once()
        mock_connection.close.assert_called_once()


    # failure case: connection fails
    @patch.dict(os.environ, {'DATABASE_URI': 'postgresql://user:password@localhost/testdb'})
    @patch('app.infrastructure.database.db_connection.create_engine')
    def test_db_connection_failure(self, mock_create_engine):
        # Arrange
        mock_engine = MagicMock()
        mock_engine.connect.side_effect = Exception("Connection failed")
        mock_create_engine.return_value = mock_engine

        # Act
        db_conn = DatabaseConnection()
        db_conn.db_connection()

        # Assert
        mock_engine.connect.assert_called_once()
