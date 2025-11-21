import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import Mock, MagicMock, patch
from sqlalchemy.exc import OperationalError
from app.repositories.repository_carts import CartsRepository


class TestCartsRepository:
    
    # tests for new_cart
    # sucess case: new cart inserted
    def test_new_cart_succesful_create(self):
        # Arrange
        _id = 1
        user_id = 10
        status = "pending"
        cart_data = {"user_id": user_id}

        # patch dependencies in repository_carts
        with patch('app.repositories.repository_carts.cart_validations') as mock_cart_validations, \
            patch('app.repositories.repository_carts.cart_manager') as mock_cart_manager:
            # mocks
            mock_cart_validations.not_need_value.return_value = True
            mock_cart_validations.complete_info.return_value = True
            expected_insert_result = {"id": _id, "user_id": user_id, "status": status}
            mock_cart_manager.single_insert.return_value = expected_insert_result

            # Act
            carts_repo = CartsRepository()
            result = carts_repo.new_cart(cart_data)

            # Assert
            mock_cart_validations.not_need_value.assert_called_once_with(cart_data, "id")
            mock_cart_validations.complete_info.assert_called()
            mock_cart_manager.single_insert.assert_called_once_with(cart_data)
            assert result == expected_insert_result


    # failure case: cart_data brings id (not allowed)
    def test_new_cart_no_id_neccesary(self):
        # Arrange
        cart_data = {"id": 1, "user_id": 10}

        # patch dependencies in repository_carts
        with patch('app.repositories.repository_carts.cart_validations') as mock_cart_validations:
            # mocks: not_need_value should raise when id is present
            mock_cart_validations.not_need_value.side_effect = ValueError("id: '1' is not necessary, the system generates the id.")

            carts_repo = CartsRepository()
            # Act & Assert: calling new_cart with id should raise ValueError
            with pytest.raises(ValueError) as excinfo:
                carts_repo.new_cart(cart_data)

            assert "is not necessary" in str(excinfo.value)


    # tests for show_carts
    # sucess case: read whole cart's table
    def test_show_cart_succesful_read(self):
        # Arrange, patch cart_manager and the instance _format_cart method
        with patch('app.repositories.repository_carts.cart_manager') as mock_cart_manager, \
            patch('app.repositories.repository_carts.CartsRepository._format_cart') as mock_format_cart:
            # Arrange
            record1 = MagicMock()
            record1.id = 1
            record1.user_id = 10
            record1.status = 'pending'

            record2 = MagicMock()
            record2.id = 2
            record2.user_id = 20
            record2.status = 'pending'

            mock_cart_manager.whole_table_select.return_value = [record1, record2]

            # make _format_cart return a dict for each record
            mock_format_cart.side_effect = lambda rec: {"id": rec.id, "user_id": rec.user_id, "status": rec.status}

            # Act
            carts_repo = CartsRepository()
            formatted_results = carts_repo.show_carts()

            # Assert
            mock_cart_manager.whole_table_select.assert_called_once()
            # _format_cart should be called for each record
            assert mock_format_cart.call_count == 2
            assert formatted_results == [{"id": 1, "user_id": 10, "status": 'pending'}, 
                                        {"id": 2, "user_id": 20, "status": 'pending'}]


    # failure case: OperationalError
    def test_show_cart_database_error(self):
        # patch cart_manager to raise an OperationalError when selecting whole table
        with patch('app.repositories.repository_carts.cart_manager') as mock_cart_manager:
            # simulate SQLAlchemy OperationalError
            mock_cart_manager.whole_table_select.side_effect = OperationalError("connection failed", None, None)

            carts_repo = CartsRepository()

            # Act & Assert: show_carts should propagate the OperationalError
            with pytest.raises(OperationalError) as excinfo:
                carts_repo.show_carts()

            assert "connection failed" in str(excinfo.value)


    # tests update_cart
    # sucess case: update status
    def test_update_cart_change_status(self):
        # Arrange
        search_column = "id"
        search_value = 1
        column_modify = "status"
        new_value = "completed"
        cart_data = [{"id":1, "user_id":10, "status":"pending"}]
        expected_result = {"status":"completed"}

        # patch dependencies in repository_carts
        with patch('app.repositories.repository_carts.cart_validations') as mock_cart_validations, \
            patch('app.repositories.repository_carts.cart_manager') as mock_cart_manager:
            # mocks
            mock_cart_validations.valid_columns.return_value = True
            mock_cart_manager.single_select.return_value = cart_data
            mock_cart_validations.valid_value.return_value = True

            # Act
            carts_repo = CartsRepository()
            result = carts_repo.update_cart(search_column, search_value, column_modify, new_value)

            # Assert: validations and manager calls
            mock_cart_validations.valid_columns.assert_any_call(search_column, ["id"])  # search column validated
            mock_cart_manager.single_select.assert_called_once_with(search_column, search_value)
            mock_cart_validations.valid_value.assert_called_once_with(search_column, search_value, cart_data)
            mock_cart_validations.valid_columns.assert_any_call(column_modify, ["status"])  # update column validated
            mock_cart_manager.single_update.assert_called_once_with(search_column, search_value, column_modify, new_value)
            assert result == expected_result


    # failure case: invalid search value
    def test_update_cart_invalid_search_value(self):
        # Arrange
        search_column = "id"
        search_value = 1000
        column_modify = "status"
        new_value = "completed"

        # patch dependencies in repository_carts
        with patch('app.repositories.repository_carts.cart_validations') as mock_cart_validations, \
            patch('app.repositories.repository_carts.cart_manager') as mock_cart_manager:
            # mocks: valid_columns passes, single_select returns empty result, valid_value will raise
            mock_cart_validations.valid_columns.return_value = True
            mock_cart_manager.single_select.return_value = []
            mock_cart_validations.valid_value.side_effect = ValueError("Invalid value '1000' for column 'id'")

            carts_repo = CartsRepository()

            # Act & Assert: update_cart should call single_select then valid_value and raise ValueError
            with pytest.raises(ValueError) as excinfo:
                carts_repo.update_cart(search_column, search_value, column_modify, new_value)

            # verify interactions
            mock_cart_validations.valid_columns.assert_any_call(search_column, ["id"])  # search column validated
            mock_cart_manager.single_select.assert_called_once_with(search_column, search_value)
            mock_cart_validations.valid_value.assert_called_once_with(search_column, search_value, [])
            assert "Invalid value" in str(excinfo.value)
    

    # tests delete_cart
    # sucess case: delete a cart by id
    def test_delete_cart_successful(self):
        # Arrange
        search_column = "id"
        search_value = 1
        cart_data = [{"id":1, "user_id":10, "status":"pending"}]

        # patch dependencies in repository_carts
        with patch('app.repositories.repository_carts.cart_validations') as mock_cart_validations, \
            patch('app.repositories.repository_carts.cart_manager') as mock_cart_manager:
            # mocks
            mock_cart_validations.valid_columns.return_value = True
            mock_cart_manager.single_select.return_value = cart_data
            mock_cart_validations.valid_value.return_value = True

            # Act
            carts_repo = CartsRepository()
            result = carts_repo.delete_cart(search_column, search_value)

            # Assert: validations and manager calls
            mock_cart_validations.valid_columns.assert_any_call(search_column, ["id"])  # search column validated
            mock_cart_manager.single_select.assert_called_once_with(search_column, search_value)
            mock_cart_validations.valid_value.assert_called_once_with(search_column, search_value, cart_data)
            mock_cart_manager.single_delete.assert_called_once_with(search_column, search_value)
            assert result is None


    # failure case: invalid search column
    def test_delete_cart_invalid_search_column(self):
        # Arrange
        search_column = "user_id"
        search_value = 1

        # patch dependencies in repository_carts
        with patch('app.repositories.repository_carts.cart_validations') as mock_cart_validations:
            # mocks 
            mock_cart_validations.valid_columns.side_effect = ValueError(f"Column 'user_id' not exists or not allowed for searches or modification.")

            carts_repo = CartsRepository()

            # Act & Assert: Value error in 1st validation
            with pytest.raises(ValueError) as excinfo:
                carts_repo.delete_cart(search_column, search_value)

            # verify interactions
            mock_cart_validations.valid_columns.assert_called_once_with(search_column, ["id"])  # search column validated
            assert "not exists or not allowed for searches or modification" in str(excinfo.value)