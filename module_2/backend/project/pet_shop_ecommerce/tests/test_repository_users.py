import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import Mock, MagicMock, patch, call
from sqlalchemy.exc import ProgrammingError
from app.repositories.repository_users import UsersRepository


class TestUsersRepository:
    
    def setup_method(self):
        self.users_repo = UsersRepository()

    # tests for insert_user_register
    # sucess case: register a new client
    def test_user_register_new_client(self):
        # Arrange
        user_data = {
                    "name": "Michael Jordan",
                    "email": "mj@example.com",
                    "password": "mj23buLLsNC",
                    "phone_number": "8888-1111"
                    }
        
        expected_user = {
                        "id": 1,
                        "name": "Michael Jordan",
                        "email": "mj@example.com",
                        "password": "mj23buLLsNC",
                        "phone_number": "8888-1111",
                        "role": "client"
                        }
        
        obligatory_info = ["name", "email", "password", "phone_number"]

        # patching dependencies
        with patch('app.repositories.repository_users.user_validations') as mock_validations, \
            patch('app.repositories.repository_users.user_manager') as mock_manager:
            
            # Configure mocks
            mock_validations.not_need_value.return_value = True
            mock_validations.complete_info.return_value = True
            mock_manager.single_insert_register.return_value = expected_user

            # Act: call insert_user_register
            result = self.users_repo.insert_user_register(user_data)

            # Assert and interactions
            assert mock_validations.not_need_value.call_count == 2
            mock_validations.not_need_value.assert_has_calls([call(user_data, "id"), call(user_data, "role")])
            mock_validations.complete_info.assert_called_once_with(user_data, obligatory_info)
            mock_manager.single_insert_register.assert_called_once_with(user_data)
            assert result == expected_user

    
    # failure case: id value is in user_data
    def test_user_register_id_in_user_data(self):
        # Arrange
        user_data = {
                    "id": 1,
                    "name": "Michael Jordan",
                    "email": "mj@example.com",
                    "password": "mj23buLLsNC",
                    "phone_number": "8888-1111"
                    }

        # patching dependencies
        with patch('app.repositories.repository_users.user_validations') as mock_validations:
            
            # Configure mocks
            mock_validations.not_need_value.side_effect =ValueError ("id: '1' is not necessary, the system generates the id.")

            # Assert and interactions
            with pytest.raises(ValueError) as excinfo:
                self.users_repo.insert_user_register(user_data)

                mock_validations.not_need_value.call_once_with(user_data, "id")
                assert "id: '1' is not necessary, the system generates the id." in str(excinfo.value)


    # failure case: role is in user_data
    def test_user_register_role_in_user_data(self):
        # Arrange
        user_data = {
                    "name": "Michael Jordan",
                    "email": "mj@example.com",
                    "password": "mj23buLLsNC",
                    "phone_number": "8888-1111",
                    "role": "any"
                    }

        # patching dependencies
        with patch('app.repositories.repository_users.user_validations') as mock_validations:
            
            # Configure mocks
            mock_validations.not_need_value.return_value = True
            mock_validations.not_need_value.side_effect = ValueError ("role: 'any' is not necessary, the system generates the role.")

            # Assert and interactions
            with pytest.raises(ValueError) as excinfo:
                self.users_repo.insert_user_register(user_data)

                mock_validations.not_need_value.call_once_with(user_data, "id")
                mock_validations.not_need_value.call_once_with(user_data, "role")
                assert "role: 'any' is not necessary, the system generates the role." in str(excinfo.value)


    # tests for get_user_by_value_for_api
    # success case: get by id = 1
    def test_get_user_by_value_for_api_id_1(self):
        # Arrange a fake record returned by the manager
        user_record = MagicMock()
        user_record.id = 1
        user_record.name = "Michael Jordan"
        user_record.email = "mj@example.com"
        user_record.password = "mj23buLLsNC"
        user_record.phone_number = "8888-1111"
        user_record.role = "client"

        expected_user = {
            "id": 1,
            "name": "Michael Jordan",
            "email": "mj@example.com",
            "password": "mj23buLLsNC",
            "phone_number": "8888-1111",
            "role": "client"
        }

        column = "id"
        value = 1
        valid_columns = ["id", "name", "email", "phone_number", "role"]

        # patches
        with patch('app.repositories.repository_users.user_validations') as mock_validations, \
            patch('app.repositories.repository_users.user_manager') as mock_manager, \
            patch('app.repositories.repository_users.UsersRepository._get_format_user') as mock_format:

            # Mock behavior
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = [user_record]
            mock_validations.valid_value.return_value = True
            mock_format.side_effect = lambda rec: {
                "id": rec.id,
                "name": rec.name,
                "email": rec.email,
                "password": rec.password,
                "phone_number": rec.phone_number,
                "role": rec.role
            }

            # Act
            formatted_results = self.users_repo.get_user_by_value_for_api(column, value)

            # Assert
            mock_validations.valid_columns.asser_calle_once_with(valid_columns, column)
            mock_manager.single_select.assert_called_once_with(column, value)
            mock_format.assert_called_once_with(user_record)
            assert formatted_results == [expected_user]


    # failure case: invalid email
    def test_get_user_by_value_for_api_invalid_email(self):
        # Arrange
        search_column = "email"
        search_value = "MMMMMM@example.com"
        valid_columns = ["id", "name", "email", "phone_number", "role"]
    
        # patches
        with patch('app.repositories.repository_users.user_validations') as mock_validations, \
            patch('app.repositories.repository_users.user_manager') as mock_manager:

            # Mock behavior
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = []
            mock_validations.valid_value.side_effect = ValueError("Invalid value 'MMMMMM@example.com' for column 'email'.")

            # Assert and interactions
            with pytest.raises(ValueError) as excinfo:
                self.users_repo.get_user_by_value_for_api(search_column, search_value)

                mock_validations.valid_columns.assert_call_once_with(valid_columns, search_column)
                mock_manager.single_select.assert_called_once_with(search_column, search_value)
                mock_validations.valid_value(search_column, search_value, [])
                assert "Invalid value 'MMMMMM@example.com' for column 'email'." in str(excinfo.value)


    # failure case: invalid search column
    def test_get_user_by_value_for_api_invalid_idx_search_column(self):
        # Arrange
        search_column = "idx"
        search_value = "1"
        valid_columns = ["id", "name", "email", "phone_number", "role"]
    
        # patches
        with patch('app.repositories.repository_users.user_validations') as mock_validations:

            # Mock behavior
            mock_validations.valid_columns.side_effect = ValueError("Column 'idx' not exists or not allowed for searches or modification.")

            # Assert and interactions
            with pytest.raises(ValueError) as excinfo:
                self.users_repo.get_user_by_value_for_api(search_column, search_value)

                mock_validations.valid_columns.assert_call_once_with(valid_columns, search_column)
                assert "Column 'idx' not exists or not allowed for searches or modification." in str(excinfo.value)


    # tests for get_user_by_credentials
    # sucess case: credentials are correct                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    def test_get_user_by_credentials_for_michael_jordan(self):
        # Arrange:
        # mock data
        data = {"email": "mj@example.com", "password": "mj23buLLsNC"}
        column_a = "email"
        column_b = "password"
        value_a = "mj@example.com"
        value_b = "mj23buLLsNC"

        # fake DB record
        user_record = MagicMock()
        user_record.id = 1
        user_record.name = "Michael Jordan"
        user_record.email = "mj@example.com"
        user_record.password = "mj23buLLsNC"
        user_record.phone_number = "8888-1111"
        user_record.role = "client"

        expected_result = [{
            "id": 1,
            "name": "Michael Jordan",
            "email": "mj@example.com",
            "password": "mj23buLLsNC",
            "phone_number": "8888-1111",
            "role": "client"
        }]

        valid_columns = ["email", "password"]

        # patch dependencies
        with patch('app.repositories.repository_users.user_validations') as mock_validations, \
            patch('app.repositories.repository_users.user_manager') as mock_manager, \
            patch('app.repositories.repository_users.UsersRepository._format_user') as mock_format:
            
            # mock behaviors
            mock_validations.complete_info.return_value = True
            mock_manager.select_by_two_values.return_value = [user_record]
            mock_format.side_effect = lambda rec: {
                "id": rec.id,
                "name": rec.name,
                "email": rec.email,
                "password": rec.password,
                "phone_number": rec.phone_number,
                "role": rec.role
            }

            # Act
            formatted_results = self.users_repo.get_user_by_credentials(data, column_a, column_b, value_a, value_b)

            # Assert
            mock_validations.complete_info.assert_called_once_with(data, valid_columns)
            mock_manager.select_by_two_values.assert_called_once_with(column_a, column_b, value_a, value_b)
            mock_format.assert_called_once_with(user_record)
            assert formatted_results == expected_result


    # failure case: invalid columns 'id'
    def test_get_user_by_credentials_invalid_column_id(self):
        # Arrange
        data = {"id": 1, "password": "mj23buLLsNC"}
        column_a = "id"   # column not allowed
        column_b = "password"
        value_a = 1
        value_b = "mj23buLLsNC"

        with patch('app.repositories.repository_users.user_validations') as mock_validations:
            mock_validations.complete_info.side_effect = ValueError("Column 'id' not exists or not allowed for credential checks.")

            # Act & Assert
            with pytest.raises(ValueError) as excinfo:
                self.users_repo.get_user_by_credentials(data, column_a, column_b, value_a, value_b)

            # Interactions
            mock_validations.complete_info.assert_called_once_with(data, ["email", "password"])
            assert "Column 'id' not exists or not allowed for credential checks." in str(excinfo.value)


    # tets for update_user
    # success_case: phone_number updated
    def test_update_user_success_phone_number_updated(self):
        # Arrange
        search_column = "id"
        search_value = 1
        column_modify = "phone_number"
        new_value = "8888-0000"
        user_data = [{"id": 1, "email": "mj@example.com", "password": "mj23buLLsNC", "phone_number": "8888-1111"}]
        expected_result = {"phone_number": "8888-0000"}

        # patching dependencies
        with patch('app.repositories.repository_users.user_validations') as mock_validations, \
            patch('app.repositories.repository_users.user_manager') as mock_manager:

            # mocks
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = user_data
            mock_validations.valid_value.return_value = True

            # Act
            result = self.users_repo.update_user(search_column, search_value, column_modify, new_value)

            # Assert: ensure validations and interactions
            mock_validations.valid_columns.assert_any_call(search_column, ["id", "email"])  # validated search column
            mock_manager.single_select.assert_called_once_with(search_column, search_value)
            mock_validations.valid_value.assert_called_once_with(search_column, search_value, user_data)
            mock_validations.valid_columns.assert_any_call(column_modify, ["email", "password", "phone_number"])  # validated update column
            mock_manager.single_update.assert_called_once_with(search_column, search_value, column_modify, new_value)
            assert result == expected_result


    # failure case: invalid update column id
    def test_update_user_invalid_update_column_id(self):
        # Arrange
        search_column = "id"
        search_value = 1
        column_modify = "id"  # invalid modify column
        new_value = 2
        user_data = [{"id": 1, "email": "mj@example.com", "password": "mj23buLLsNC", "phone_number": "8888-1111"}]

        with patch('app.repositories.repository_users.user_validations') as mock_validations, \
            patch('app.repositories.repository_users.user_manager') as mock_manager:

            # mocking validations
            mock_manager.single_select.return_value = user_data
            mock_validations.valid_value.return_value = True

            # configure valid_columns to throw ValueError only on the second validation (update column)
            def valid_columns_side_effect(update_column, valid_columns):
                if update_column == "id" and valid_columns == ["email", "password", "phone_number"]:
                    raise ValueError("Column 'id' not exists or not allowed for modification.")
                return True
            
            mock_validations.valid_columns.side_effect = valid_columns_side_effect
            
            # Act & Assert
            with pytest.raises(ValueError) as excinfo:
                self.users_repo.update_user(search_column, search_value, column_modify, new_value)

            # valid interactions
            mock_validations.valid_columns.assert_any_call(search_column, ["id", "email"])
            mock_manager.single_select.assert_called_once_with(search_column, search_value)
            mock_validations.valid_value.assert_called_once_with(search_column, search_value, user_data)
            mock_validations.valid_columns.assert_any_call(column_modify, ["email", "password", "phone_number"])
            assert "Column 'id' not exists or not allowed for modification." in str(excinfo.value)


    # failure case: Programming Error
    def test_update_user_programming_error(self):
        # Arrange
        search_column = "id"
        search_value = 1
        column_modify = "email"
        new_value = "new_email@example.com"
        user_data = [{"id": 1, "email": "mj@example.com", "password": "mj23buLLsNC", "phone_number": "8888-1111"}]

        with patch('app.repositories.repository_users.user_validations') as mock_validations, \
            patch('app.repositories.repository_users.user_manager') as mock_manager:

            # mocking
            mock_validations.valid_columns.return_value = True
            mock_validations.valid_value.return_value = True
            mock_manager.single_select.return_value = user_data
            # mock programming error
            mock_manager.single_update.side_effect = ProgrammingError("non_existing_table", None, None)

            # Act & Assert
            with pytest.raises(ProgrammingError) as excinfo:
                self.users_repo.update_user(search_column, search_value, column_modify, new_value)

            # interactions
            mock_validations.valid_columns.assert_any_call(search_column, ["id", "email"])
            mock_manager.single_select.assert_called_once_with(search_column, search_value)
            mock_validations.valid_value.assert_called_once_with(search_column, search_value, user_data)
            mock_validations.valid_columns.assert_any_call(column_modify, ["email", "password", "phone_number"])
            mock_manager.single_update.assert_called_once_with(search_column, search_value, column_modify, new_value)
            assert "non_existing_table" in str(excinfo.value)

