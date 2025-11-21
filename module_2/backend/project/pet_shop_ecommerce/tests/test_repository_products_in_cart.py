import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import Mock, MagicMock, patch
from app.repositories.repository_products_in_cart import ProductsInCartRepository


class TestProductsInCartRepository:

    def setup_method(self):
        self.products_in_repo = ProductsInCartRepository()

    
    # tests for new_product_in_cart
    # success case: successful inserted
    def test_new_product_in_cart_successful_inserted(self):
        # Arrange
        _id = 1
        cart_id = 1
        product_id = 10
        quantity = 2

        obligatory_info = ["cart_id", "product_id", "quantity"]
        expected_insert_result = {"id":_id, "cart_id":cart_id, "quantity":quantity}
        product_in_ = {"cart_id":cart_id, "product_id":product_id, "quantity":quantity}

        # patch module-level dependencies in repository_invoice_details
        with patch('app.repositories.repository_products_in_cart.product_in_cart_validations') as mock_validations, \
            patch('app.repositories.repository_products_in_cart.product_in_cart_manager') as mock_manager:
            # configure mocks
            mock_validations.not_need_value.return_value = True
            mock_validations.complete_info.return_value = True
            mock_manager.single_insert.return_value = expected_insert_result

            # Act: call new_invoice_detail
            result = self.products_in_repo.new_product_in_cart(product_in_)

            # Assert: the repository should have validated and inserted the constructed dict
            mock_validations.not_need_value.assert_called_once_with(product_in_, "id")
            mock_validations.complete_info.assert_called_once_with(product_in_, obligatory_info)
            mock_manager.single_insert.assert_called_once_with(product_in_)
            assert result == expected_insert_result


    # failure case: new product incomplete info
    def test_new_product_in_cart_incomplete_info(self):
        # Arrange
        invoice_id = 1
        product_id = 10
        quantity = 2
        obligatory_info = ["cart_id", "product_id", "quantity"]
        product_in_data = {"cart_id":invoice_id, "product_id":product_id, "quantity":quantity}

        with patch('app.repositories.repository_products_in_cart.product_in_cart_validations') as mock_validations:
            mock_validations.not_need_value.return_value = True
            mock_validations.complete_info.side_effect = ValueError("Info missing required")

            # Act & Assert (raise ValueError)
            with pytest.raises(ValueError) as excinfo:
                self.products_in_repo.new_product_in_cart(product_in_data)

            # Assert: the repository should have validated and inserted the constructed dict
            mock_validations.not_need_value.assert_called_once_with(product_in_data, "id")
            mock_validations.complete_info.assert_called_once_with(product_in_data, obligatory_info)
            assert "Info missing required" in str(excinfo.value)


    # tests for update_product_in_cart
    # success case: update quantity column
    def test_update_product_in_cart(self):
        # Assert
        search_column = "id"
        search_value = 1
        column_modify = "quantity"
        new_value = 5
        product_in_data = [{"id":1, "cart_id":1, "product_id":1, "quantity":2}]
        expected_result = {"quantity":5}

        # patching validations and manager
        with patch('app.repositories.repository_products_in_cart.product_in_cart_validations') as mock_validations, \
            patch('app.repositories.repository_products_in_cart.product_in_cart_manager') as mock_manager:
            # mocks
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = product_in_data
            mock_validations.valid_value.return_value = True

            # Act
            result = self.products_in_repo.update_product_in_cart(search_column, search_value, column_modify, new_value)

            # Assert: validations and manager calls
            mock_validations.valid_columns.assert_any_call(search_column, ["id"])  # search column validated
            mock_manager.single_select.assert_called_once_with(search_column, search_value)
            mock_validations.valid_value.assert_called_once_with(search_column, search_value, product_in_data)
            mock_validations.valid_columns.assert_any_call(column_modify, ["quantity"])  # update column validated
            mock_manager.single_update.assert_called_once_with(search_column, search_value, column_modify, new_value)
            assert result == expected_result


    # failure case: invalid search column
    def test_update_product_in_cart_invalid_search_column(self):
        # Arrange
        search_column = "cart_id"
        search_value = 1
        column_modify = "quantity"
        new_value = "4"

        # patch dependencies in repository_carts
        with patch('app.repositories.repository_products_in_cart.product_in_cart_validations') as mock_validations:
            # mocks: valid_columns passes, single_select returns empty result, valid_value will raise
            mock_validations.valid_columns.side_effect = ValueError("Column 'cart_id' not exists or not allowed for searches or modification.")

            # Act & Assert
            with pytest.raises(ValueError) as excinfo:
                self.products_in_repo.update_product_in_cart(search_column, search_value, column_modify, new_value)

            #interactions
            mock_validations.valid_columns.assert_called_once_with(search_column, ["id"])  # search column validated
            assert "not exists or not allowed" in str(excinfo.value)


    # failure case: invalid update column
    def test_update_product_in_cart_invalid_update_column(self):
        # Arrange
        search_column = "id"
        search_value = 1
        column_modify = "cart_id"
        new_value = "4"
        product_in_data = [{"id": 1, "cart_id": 1, "product_id": 1, "quantity": 2}]

        # Patch dependencies
        with patch('app.repositories.repository_products_in_cart.product_in_cart_validations') as mock_validations, \
            patch('app.repositories.repository_products_in_cart.product_in_cart_manager') as mock_manager:

            mock_validations.valid_columns.side_effect = [
                True,  # 1st call 
                ValueError("Column 'cart_id' not exists or not allowed for searches or modification.")  # 2nd call raise value error
            ]
            mock_manager.single_select.return_value = product_in_data
            mock_validations.valid_value.return_value = True

            # Act & Assert
            with pytest.raises(ValueError) as excinfo:
                self.products_in_repo.update_product_in_cart(search_column, search_value, column_modify, new_value)

            # Interactions
            mock_validations.valid_columns.assert_any_call(search_column, ["id"])
            mock_manager.single_select.assert_called_once_with(search_column, search_value)
            mock_validations.valid_value.assert_called_once_with(search_column, search_value, product_in_data)
            mock_validations.valid_columns.assert_any_call(column_modify, ["quantity"])
            assert "not exists or not allowed" in str(excinfo.value)


    # tets for delete product_in_cart
    # failure case: invalid search value
    def test_delete_invoice_detail_invalid_search_id(self):
        # Arrange
        search_column = "id"
        search_value = 1000

        # patch dependencies
        with patch('app.repositories.repository_products_in_cart.product_in_cart_validations') as mock_validations, \
            patch('app.repositories.repository_products_in_cart.product_in_cart_manager') as mock_manager:
            
            # mocks
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = []
            mock_validations.valid_value.side_effect = ValueError("Invalid value '1000' for column 'id'")

            # Act & Assert:
            with pytest.raises(ValueError) as excinfo:
                self.products_in_repo.delete_product_in_cart(search_column, search_value)

            # verify interactions
            mock_validations.valid_columns.assert_called_once_with(search_column, ["id"])
            mock_manager.single_select.assert_called_once_with(search_column, search_value)
            mock_validations.valid_value.assert_called_once_with(search_column, search_value, [])
            assert "Invalid value" in str(excinfo.value)