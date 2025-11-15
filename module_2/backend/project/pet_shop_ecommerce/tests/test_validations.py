import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from pytest_mock import mocker
from app.utils.validations import Validations


class TestValidations:

    def setup_method(self):
        self.validations = Validations()

    
    # test valid columns
    # sucess case: valid column
    def test_valid_columns_with_valid_column(self):
        # Arrange :
        column = "name"
        valid_columns = ["name", "description", "stock", "cost", "price"]
        expected = True
        # Act
        result = self.validations.valid_columns(column, valid_columns)
        # Assert
        assert result == expected


    # failure case: invalid column
    def test_valid_columns_with_invalid_column(self):
        column = "product_name"
        valid_columns = ["name", "description", "stock", "cost", "price"]
        expected = True
        # Act and Assert
        with pytest.raises(ValueError, match=f"Column '{column}' not exists or not allowed for searches or modification."):
            self.validations.valid_columns(column, valid_columns)


    # tests complete_info
    # success case: all required fields present with data
    def test_complete_info_with_all_required_fields(self):
        # Arrange
        data = {"name": "Dog food", "price": 1000, "stock": 5}
        obligatory_info = ["name", "price", "stock"]
        expected = True
        # Act
        result = self.validations.complete_info(data, obligatory_info)
        # Assert
        assert result == expected


    # failure case: missing required field
    def test_complete_info_with_missing_field(self):
        # Arrange
        data = {"name": "Dog Food", "price": 1000}
        obligatory_info = ["name", "price", "stock"]

        # Act & Assert
        with pytest.raises(ValueError, match="Info missing required"):
            self.validations.complete_info(data, obligatory_info)


    # tests for not_need_value
    # success case: value not present in data
    def test_not_need_value_field_not_present(self):
        # Arrange
        data = {"name": "Dog Food", "price": 1000}
        value = "id"
        expected = True
        # Act
        result = self.validations.not_need_value(data, value)
        # Assert
        assert result == expected


    # failure case: value present in data
    def test_not_need_value_field_present(self):
        # Arrange
        data = {"id": 1, "name": "Dog Food", "price": 1000}
        value = "id"
        # Act & Assert
        with pytest.raises(ValueError, match="id: '1' is not necessary, the system generates the id."):
            self.validations.not_need_value(data, value)


    # tests for valid_float
    # success case: multiple float values
    def test_valid_float_multiple_values(self):
        # Arrange
        data = {"price": 99.99, "discount": 15.50, "tax": 7.25}
        float_numbers = ["price", "discount", "tax"]
        expected = True
        # Act
        result = self.validations.valid_float(data, float_numbers)
        # Assert
        assert result == expected


    # failure case: integer instead of float
    def test_valid_float_with_integer(self):
        # Arrange
        data = {"price": 100, "discount": 15.50}
        float_numbers = ["price", "discount"]
        # Act & Assert
        with pytest.raises(TypeError, match="100 is not a float number"):
            self.validations.valid_float(data, float_numbers)


    # failure case: string instead of float
    def test_valid_float_with_string(self):
        # Arrange
        data = {"price": "99.99", "discount": 15.50}
        float_numbers = ["price", "discount"]
        # Act & Assert
        with pytest.raises(TypeError, match="99.99 is not a float number"):
            self.validations.valid_float(data, float_numbers)