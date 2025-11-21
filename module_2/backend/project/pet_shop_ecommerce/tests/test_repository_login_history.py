import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import Mock, MagicMock, patch
from sqlalchemy.exc import IntegrityError
from app.repositories.repository_login_history import LoginHistoryRepository


class TestLoginHistoryRepository:

    def setup_method(self):
        self.login_history_repo = LoginHistoryRepository()


    # tets for insert_login_history
    # success case: insert successfully
    def test_insert_login_history_success(self):
        # Arrange
        login_data = {
                    "user_id": 1,
                    "ip_address": "180.180.180.1",
                    "login_status": "successful"
                }

        expected_login_history = {
                            "id": 1,
                            "user_id": 1,
                            "login_timestamp": "2025-10-31 22:42:58",
                            "ip_address": "180.180.180.1",
                            "login_status": "successful"
                        }
        
        obligatory_info = ["user_id", "ip_address", "login_status"]

        with patch('app.repositories.repository_login_history.login_validations') as mock_validations, \
            patch('app.repositories.repository_login_history.login_manager') as mock_manager:

            mock_validations.not_need_value.return_value = True
            mock_validations.complete_info.return_value = True
            mock_manager.single_insert.return_value = expected_login_history
            
            # Act
            result = self.login_history_repo.insert_login_history(login_data)

            # Assert
            mock_validations.not_need_value.assert_called_once_with(login_data, "id")
            mock_validations.complete_info.assert_called_once_with(login_data, obligatory_info)
            mock_manager.single_insert.assert_called_once_with(login_data)
            assert result == expected_login_history


    # failure case: IntegrityError
    def test_insert_login_history_integrity_error(self):
        # Arrange
        login_data = {
                    "user_id": 1,
                    "ip_address": "180.180.180.1",
                    "login_status": "successful"
                }
        
        obligatory_info = ["user_id", "ip_address", "login_status"]

        # patching validations and manager
        with patch('app.repositories.repository_login_history.login_validations') as mock_validations, \
            patch('app.repositories.repository_login_history.login_manager') as mock_manager:

            mock_validations.not_need_value.return_value = True
            mock_validations.complete_info.return_value = True
            # Simulate SQLAlchemy IntegrityError
            mock_manager.single_insert.side_effect = IntegrityError("foreign key constraint violation", None, None)

            # Act & Assert
            with pytest.raises(IntegrityError) as excinfo:
                self.login_history_repo.insert_login_history(login_data)

            assert "foreign key constraint violation" in str(excinfo.value)


    # tests for login_status_verification
        # failure case: wrong id
    def test_login_status_verifcation_wrong_id(self):
        # Arrange
        user_id = 1001
        successful = False

        with patch.object(self.login_history_repo, 'insert_login_history') as mock_insert_login_history:
            # Act & Assert
            with pytest.raises(ValueError) as excinfo:
                self.login_history_repo.login_status_verification(user_id, successful)

            mock_insert_login_history.assert_called_once()
            assert "Wrong credentials, email or password is incorrect" in str(excinfo.value)


    # failure case: wrong password
    def test_login_status_verification_wrong_password(self):
        # Arrange
        user_id = 1
        successful = False

        with patch.object(self.login_history_repo, 'insert_login_history') as mock_insert_login_history:
            # Act & Assert
            with pytest.raises(ValueError) as excinfo:
                self.login_history_repo.login_status_verification(user_id, successful)

            mock_insert_login_history.assert_called_once()
            assert "Wrong password" in str(excinfo.value)


    # success case: succesful login
    def test_login_status_verification_successful_login(self):
        # Arrange
        user_id = 1
        successful = True

        login_data = {
                    "user_id": 1,
                    "ip_address": "180.180.180.1",
                    "login_status": "successful"
                    }


        # patching _random_ip_address and insert_login_history
        with patch.object(self.login_history_repo, '_random_ip_address', return_value=login_data["ip_address"]) as mock_ip, \
            patch.object(self.login_history_repo, 'insert_login_history') as mock_insert_login_history:

            # Act
            self.login_history_repo.login_status_verification(user_id, successful)

            # Assert
            mock_insert_login_history.assert_called_once_with(login_data)

    
    # tests for get_login_history_by_history
    # success case: get login history of a specfic user
    def test_get_login_history_by_value_user_id(self):
        # Arrange
        column = "user_id"
        user_id = 1

        # records
        login_record1 = MagicMock()
        login_record1.id = 1
        login_record1.user_id = 1
        login_record1.login_timestamp = "2025-10-27 10:00:00"
        login_record1.ip_address = "192.168.1.1"
        login_record1.login_status = "successful"

        login_record2 = MagicMock()
        login_record2.id = 2
        login_record2.user_id = 1
        login_record2.login_timestamp = "2025-10-27 12:00:00"
        login_record2.ip_address = "192.168.1.1"
        login_record2.login_status = "successful"

        expected_login_histories = [
            {
                "id": 1,
                "user_id": 1,
                "login_timestamp": "2025-10-27 10:00:00",
                "ip_address": "192.168.1.1",
                "login_status": "successful",
                "user_name": "Andy Wall",
                "role": "client",
            },
            {
                "id": 2,
                "user_id": 1,
                "login_timestamp": "2025-10-27 12:00:00",
                "ip_address": "192.168.1.1",
                "login_status": "successful",
                "user_name": "Andy Wall",
                "role": "client",
            },
        ]
        
        valid_columns = ["id", "user_id", "ip_address", "login_status"]

        with patch('app.repositories.repository_login_history.login_validations') as mock_validations, \
            patch('app.repositories.repository_login_history.login_manager') as mock_manager, \
            patch('app.repositories.repository_login_history.users_repo') as mock_users_repo, \
            patch('app.repositories.repository_login_history.LoginHistoryRepository._format_login') as mock_format:

            # mocking
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = [login_record1, login_record2]
            mock_format.side_effect = lambda rec: {
                "id": rec.id,
                "user_id": rec.user_id,
                "login_timestamp": rec.login_timestamp,
                "ip_address": rec.ip_address,
                "login_status": rec.login_status
            }
            mock_users_repo.get_user_by_value_for_api.return_value = [{"name": "Andy Wall", "role": "client"}]

            # Act
            formatted_results = self.login_history_repo.get_login_history_by_value("user_id", user_id)

            # Assert
            mock_validations.valid_columns.assert_called_once_with(column, valid_columns)
            mock_manager.single_select.assert_called_once_with(column, user_id)
            assert mock_format.call_count == 2
            assert mock_users_repo.get_user_by_value_for_api.call_count == 4  # name and role
            assert formatted_results == expected_login_histories


    # failure case: no result for search parameter
    def test_get_login_history_by_value_no_results_for_id(self):
        # Arrange
        column = "user_id"
        user_id = 1
        valid_columns = ["id", "user_id", "ip_address", "login_status"]

        with patch('app.repositories.repository_login_history.login_validations') as mock_validations, \
            patch('app.repositories.repository_login_history.login_manager') as mock_manager:

            # mocking
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = []  # No results found

            # Act & Assert
            with pytest.raises(ValueError) as excinfo:
                self.login_history_repo.get_login_history_by_value(column, user_id)

            mock_validations.valid_columns.assert_called_once_with(column, valid_columns)
            mock_manager.single_select.assert_called_once_with(column, user_id)
            assert "'1' value is wrong" in str(excinfo.value)




