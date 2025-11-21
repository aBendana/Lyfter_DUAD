import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import Mock, MagicMock
from pytest_mock import mocker
from sqlalchemy.exc import IntegrityError, ProgrammingError, OperationalError, SQLAlchemyError
from app.utils.orms_queries import QueryFunctions


class TestQueryFunctions:

    def setup_method(self):
        # Mock engine (db_connection)
        self.mock_engine = MagicMock()
        self.mock_conn = MagicMock()
        self.mock_engine.connect.return_value.__enter__.return_value = self.mock_conn # context manager
        self.mock_engine.connect.return_value.__exit__.return_value = None # exit context manager
        self.mock_engine.begin.return_value.__enter__.return_value = self.mock_conn # begin context manager
        self.mock_engine.begin.return_value.__exit__.return_value = None
        
        # Mock table
        self.mock_table = MagicMock()
        self.mock_table.c = []
        
        # Instance QueryFunctions with mocks
        self.query_functions = QueryFunctions(self.mock_engine, self.mock_table)


    # tests for single_insert
    # success case: simple insert
    def test_single_insert_basic(self, mocker):
        # Arrange
        expected = {"id": 1, "name": "Product"}
        self.mock_conn.execute.return_value.mappings.return_value.fetchone.return_value = expected
        # mocker the insert function
        mocker.patch('app.utils.orms_queries.insert')

        # Act
        result = self.query_functions.single_insert({"name": "Product"})
        # Assert
        assert result == expected

    
    # failure case: integrity error
    def test_single_insert_integrity_error(self, mocker):
        # Arrange
        self.mock_conn.execute.side_effect = IntegrityError("statement", "params", "Duplicate key")
        # Mock selection
        mocker.patch('app.utils.orms_queries.insert', return_value=MagicMock())
        
        # Act & Assert
        with pytest.raises(ValueError, match="Integrity error"):
            self.query_functions.single_insert({"name": "Product"})


    # failure case: programming error
    def test_single_insert_programming_error(self, mocker):
        # Arrange
        self.mock_conn.execute.side_effect = ProgrammingError("statement", "params", "Syntax error")
        # Mock selection
        mocker.patch('app.utils.orms_queries.insert', return_value=MagicMock())
        
        # Act & Assert
        with pytest.raises(ValueError, match="Syntax error"):
            self.query_functions.single_insert({"name": "Product"})


    # tests for select a whole table
    # success case: select all rows from table
    def test_whole_table_select_basic(self, mocker):
        # Arrange
        expected = [
            {"id":1, "name":"Product1", "price":10.00},
            {"id":2, "name":"Product2", "price":20.00},
            {"id":3, "name":"Product3", "price":30.00}
        ]
        # Mock del connection context manager
        self.mock_conn.execute.return_value.fetchall.return_value = expected
        # Mock select function
        mocker.patch('app.utils.orms_queries.select', return_value=MagicMock())

        # Act
        result = self.query_functions.whole_table_select()
        # Assert
        assert result == expected


    # failure case: OperationalError Connection error
    def test_whole_table_select_operational_error(self, mocker):
        # Arrange
        self.mock_conn.execute.side_effect = OperationalError("statement", "params", "Connection failed")

        # mocker the insert function
        mocker.patch('app.utils.orms_queries.select', return_value=MagicMock())

        # Act & Assert
        with pytest.raises(ConnectionError, match="Connection failed"):
            self.query_functions.whole_table_select()


    # test for update
    # success case: update price
    def test_single_update_price(self, mocker):
        # Arrange
        column = "id"
        value = 1
        column_modify = "price"
        new_value = 99.99
        
        # Mock table
        self.mock_table.c = MagicMock()
        self.mock_table.c.id = MagicMock()
        self.mock_table.c.price = MagicMock()
        # Mock steps: update, where, values
        mock_update_stmt = MagicMock()
        mocker.patch('app.utils.orms_queries.update', return_value=mock_update_stmt)
        # Mock result
        mock_result = MagicMock()
        self.mock_conn.execute.return_value = mock_result

        # Act
        self.query_functions.single_update(column, value, column_modify, new_value)

        # Assert
        self.mock_conn.execute.assert_called_once()
        self.mock_conn.commit.assert_called_once()


    # test for delete
    # sucess case: delete a product
    def test_single_delete_by_id(self, mocker):
        # Arrange
        column = "id"
        value = 10

        # Mock table
        self.mock_table.c = MagicMock()
        self.mock_table.c.id = MagicMock()
        self.mock_table.c.name = MagicMock()
        # Mock steps: delete, where, values
        mock_delete_stmt = MagicMock()
        mocker.patch('app.utils.orms_queries.delete', return_value=mock_delete_stmt)
        # Mock result
        mock_result = MagicMock()
        self.mock_conn.execute.return_value = mock_result

        # Act
        self.query_functions.single_delete(column, value)

        # Assert
        self.mock_conn.execute_assert_called_once()
        self.mock_conn.commit.assert_called_once()


    # failure case: SQLAlchemyError
    def test_whole_table_select__sqlalchemy_error(self, mocker):
        # Arrange
        self.mock_conn.execute.side_effect = SQLAlchemyError("statement", "params", "FOREIGN KEY constraint failed")

        # mocker the insert function
        mocker.patch('app.utils.orms_queries.select', return_value=MagicMock())

        # Act & Assert
        with pytest.raises(RuntimeError, match="FOREIGN KEY constraint failed"):
            self.query_functions.whole_table_select()


