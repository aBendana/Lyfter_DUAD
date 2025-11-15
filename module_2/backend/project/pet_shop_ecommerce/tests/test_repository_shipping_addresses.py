import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import Mock, MagicMock, patch
from sqlalchemy.exc import IntegrityError
from app.repositories.repository_shipping_addresses import AddressesRepository


class TestShippingAddressesRepository:

    def setup_method(self):
        self.addresses_repo = AddressesRepository()

    
    # tests for insert_address
    # success case: create a new address
    def test_insert_address_successful(self):
        # Arrange
        _id = 1
        user_id = 10
        address = "Calle 123, San José"
        canton = "San José"
        province = "San José"
        postal_code = "10101"
        obligatory_info = ["user_id", "address", "canton", "province", "postal_code"]
        
        expected_insert_result = {
            "id": _id,
            "user_id": user_id,
            "address": address,
            "canton": canton,
            "province": province,
            "postal_code": postal_code
        }
        address_data = {
            "user_id": user_id,
            "address": address,
            "canton": canton,
            "province": province,
            "postal_code": postal_code
        }

        # patching dependencies
        with patch('app.repositories.repository_shipping_addresses.address_validations') as mock_validations, \
            patch('app.repositories.repository_shipping_addresses.address_manager') as mock_manager:
            
            # Configure mocks
            mock_validations.not_need_value.return_value = True
            mock_validations.complete_info.return_value = True
            mock_manager.single_insert.return_value = expected_insert_result

            # Act: call insert_address
            result = self.addresses_repo.insert_address(address_data)

            # Assert: the repository should have validated and inserted the address
            mock_validations.not_need_value.assert_called_once_with(address_data, "id")
            mock_validations.complete_info.assert_called_once_with(address_data, obligatory_info)
            mock_manager.single_insert.assert_called_once_with(address_data)
            assert result == expected_insert_result


    # failure case: incomplete address info
    def test_insert_address_incomplete_info(self):
        # Arrange
        user_id = 10
        address = "Calle 123, San José"
        canton = "San José"
        
        obligatory_info = ["user_id", "address", "canton", "province", "postal_code"]
        address_data = {
            "user_id": user_id,
            "address": address,
            "canton": canton
            # missing: province and postal_code
        }

        # patchs
        with patch('app.repositories.repository_shipping_addresses.ShippingAddresses') as mock_shipping_addresses, \
            patch('app.repositories.repository_shipping_addresses.address_validations') as mock_validations:
            
            # mock ShippingAddresses table columns
            mock_table = MagicMock()
            mock_table.columns.keys.return_value = ["id", "user_id", "address", "canton", "province", "postal_code"]
            mock_shipping_addresses.__table__ = mock_table
            
            # mocking validations
            mock_validations.not_need_value.return_value = True
            mock_validations.complete_info.side_effect = ValueError("Info missing required")

            # Act & Assert (raise ValueError)
            with pytest.raises(ValueError) as excinfo:
                self.addresses_repo.insert_address(address_data)

            # Assert
            mock_validations.not_need_value.assert_called_once_with(address_data, "id")
            mock_validations.complete_info.assert_called_once_with(address_data, obligatory_info)
            assert "Info missing required" in str(excinfo.value)


    # tests for get_address_by_two_values
    # success case: get address by user_id and id
    def test_get_address_by_two_values_by_id_and_user_id(self):
        # Arrange
        _id = 1
        user_id = 10
        address = "Calle 123, San José"
        canton = "San José"
        province = "San José"
        postal_code = "10101"

        expected_address = {
            "id": _id,
            "user_id": user_id,
            "address": address,
            "canton": canton,
            "province": province,
            "postal_code": postal_code
        }

        search_column_a = "id"
        search_column_b = "user_id"
        search_value_a = _id
        search_value_b = user_id

        address_record = MagicMock()
        address_record.id = _id
        address_record.user_id = user_id
        address_record.address = address
        address_record.canton = canton
        address_record.province = province
        address_record.postal_code = postal_code

        # Patch module-level dependencies
        with patch('app.repositories.repository_shipping_addresses.address_validations') as mock_validations, \
            patch('app.repositories.repository_shipping_addresses.address_manager') as mock_manager, \
            patch('app.repositories.repository_shipping_addresses.AddressesRepository._format_address') as mock_format:

            # mocking
            mock_validations.valid_columns.return_value = True
            mock_manager.select_by_two_values.return_value = [address_record]
            mock_validations.valid_value.return_value = True
            # mock format return a dict
            mock_format.side_effect = lambda rec: {
                "id": rec.id,
                "user_id": rec.user_id,
                "address": rec.address,
                "canton": rec.canton,
                "province": rec.province,
                "postal_code": rec.postal_code
            }

            # Act: call get_address_by_two_values
            result = self.addresses_repo.get_address_by_two_values(search_column_a, search_column_b, search_value_a, search_value_b)

            # Assert: validations and manager called correctly
            assert mock_validations.valid_columns.call_count == 2
            mock_validations.valid_columns.assert_any_call(search_column_a, ["id", "user_id"])
            mock_validations.valid_columns.assert_any_call(search_column_b, ["id", "user_id"])
            mock_manager.select_by_two_values.assert_called_once_with(search_column_a, search_column_b, search_value_a, search_value_b)
            mock_validations.valid_value.assert_called_once_with(search_column_a, search_value_a, [address_record])
            mock_format.assert_called_once_with(address_record)
            assert result == [expected_address]


    # failure case: search_column_a wrong (idx)
    def test_get_address_by_two_values_search_column_idx(self):
        # Arrange
        search_column_a = "idx"  # invalid column
        search_column_b = "user_id"
        search_value_a = 1
        search_value_b = 10

        # patch validations
        with patch('app.repositories.repository_shipping_addresses.address_validations') as mock_validations:
            mock_validations.valid_columns.side_effect = ValueError("Column 'idx' not exists or not allowed for searches or modification.")

            # Act & Assert (raise ValueError)
            with pytest.raises(ValueError) as excinfo:
                self.addresses_repo.get_address_by_two_values(search_column_a, search_column_b, search_value_a, search_value_b)

            # Assert
            mock_validations.valid_columns.assert_called_once_with(search_column_a, ["id", "user_id"])
            assert "not exists or not allowed" in str(excinfo.value)


    # tests for update_address
    # success case: update province
    def test_update_address_province(self):
        # Arrange
        search_col = "id"
        search_value = 1
        column_modify = "province"
        new_value = "San José"
        address_data = [{"id":1, "user_id":10, "address":"1st street, 5th avenue", 
                        "canton":"Central", "province":"Alajuela", "postal_code":10101}]
        expected_result = {"province": "San José"}
        valid_update_columns = ["address", "canton", "province", "postal_code"]

        # Patch dependencies
        with patch('app.repositories.repository_shipping_addresses.address_validations') as mock_validations, \
            patch('app.repositories.repository_shipping_addresses.address_manager') as mock_manager:

            # Mocks
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = address_data
            mock_validations.valid_value.return_value = True

            # Act
            result = self.addresses_repo.update_address(search_col, search_value, column_modify, new_value)

            # Assert
            mock_validations.valid_columns.assert_any_call(search_col, ["id"]) 
            mock_manager.single_select.assert_called_once_with(search_col, search_value)
            mock_validations.valid_value.assert_called_once_with(search_col, search_value, address_data)
            mock_validations.valid_columns.assert_any_call(column_modify, valid_update_columns)
            mock_manager.single_update.assert_called_once_with(search_col, search_value, column_modify, new_value)
            assert result == expected_result


    # failure case: integrity error in update province
    def test_update_address_integrity_error(self):
    # Arrange
        search_col = "id"
        search_value = 1
        column_modify = "province"
        new_value = 3.14  # invalid value must be a string
        address_data = [{"id":1, "user_id":10, "address":"1st street, 5th avenue", 
                        "canton":"Central", "province":"Alajuela", "postal_code":10101}]
        valid_update_columns = ["address", "canton", "province", "postal_code"]

        # Patch dependencies
        with patch('app.repositories.repository_shipping_addresses.address_validations') as mock_validations, \
            patch('app.repositories.repository_shipping_addresses.address_manager') as mock_manager:

            # Mocks
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = address_data
            mock_validations.valid_value.return_value = True
            # integrity error in the update
            mock_manager.single_update.side_effect = IntegrityError("Invalid type for province",
                                        params={"province": new_value, "id": search_value},
                                        orig=Exception("Invalid type for province")
)
            # Act & Assert: the underlying IntegrityError should propagate from the manager
            with pytest.raises(IntegrityError) as excinfo:
                self.addresses_repo.update_address(search_col, search_value, column_modify, new_value)

            # interactions
            mock_validations.valid_columns.assert_any_call(search_col, ["id"])
            mock_manager.single_select.assert_called_once_with(search_col, search_value)
            mock_validations.valid_value.assert_called_once_with(search_col, search_value, address_data)
            mock_validations.valid_columns.assert_any_call(column_modify, valid_update_columns)
            mock_manager.single_update.assert_called_once_with(search_col, search_value, column_modify, new_value)
            assert "Invalid type for province" in str(excinfo.value)


    # tests for delete_address
    # success case: successful address deletion
    def test_delete_address_success(self):
        # Arrange
        column = "id"
        value = 1
        valid_search_columns = ["id"]
        address_data = [{"id": 1, "user_id": 10, "address": "1st street", "canton": "Central", "province": "Alajuela", "postal_code": 10101}]

        with patch('app.repositories.repository_shipping_addresses.address_validations') as mock_validations, \
            patch('app.repositories.repository_shipping_addresses.address_manager') as mock_manager:

            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = address_data
            mock_validations.valid_value.return_value = True

            # Act
            result = self.addresses_repo.delete_address(column, value)

            # Assert:
            mock_validations.valid_columns.assert_called_once_with(column, valid_search_columns)
            mock_manager.single_select.assert_called_once_with(column, value)
            mock_validations.valid_value.assert_called_once_with(column, value, address_data)
            mock_manager.single_delete.assert_called_once_with(column, value)
            assert result is None


    # failure case: invalid search column
    def test_delete_address_invalid_search_column(self):
        # Arrange
        search_column = "idx"
        search_value = 1

        # patch
        with patch('app.repositories.repository_shipping_addresses.address_validations') as mock_validations:
            # mocks
            mock_validations.valid_columns.side_effect = ValueError(f"Column 'idx' not exists or not allowed for searches or modification.")

            # Act & Assert: Value error in 1st validation
            with pytest.raises(ValueError) as excinfo:
                self.addresses_repo.delete_address(search_column, search_value)

            # verify interactions
            mock_validations.valid_columns.assert_called_once_with(search_column, ["id"])  # search column validated
            assert "not exists or not allowed for searches or modification" in str(excinfo.value)
            

    # failure case: invalid id string
    def test_delete_address_invalid_search_value_string(self):
        # Arrange
        search_column = "id"
        search_value = "10"
        # patch dependencies in addresses repository
        with patch('app.repositories.repository_shipping_addresses.address_validations') as mock_validations, \
            patch('app.repositories.repository_shipping_addresses.address_manager') as mock_manager:

            # mocks: valid_columns passes, but passing a string for an integer id causes a DB/driver error
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.side_effect = IntegrityError("invalid input syntax for integer: \"10\"", params=None, orig=Exception("invalid input"))

            # Act & Assert
            with pytest.raises(IntegrityError) as excinfo:
                self.addresses_repo.delete_address(search_column, search_value)

            # verify interactions
            mock_validations.valid_columns.assert_called_once_with(search_column, ["id"])  # search column validated
            mock_manager.single_select.assert_called_once_with(search_column, search_value)
            assert "invalid input syntax for integer" in str(excinfo.value)