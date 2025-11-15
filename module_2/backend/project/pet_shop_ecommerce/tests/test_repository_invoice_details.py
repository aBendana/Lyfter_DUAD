import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import Mock, MagicMock, patch
from sqlalchemy.exc import ProgrammingError
from app.repositories.repository_invoice_details import InvoiceDetailsRepository


class TestInvoiceDetailsRepository:
    
    def setup_method(self):
        self.invc_det_repo = InvoiceDetailsRepository()


    # tests for new_cart
    # sucess case: new cart inserted
    def test_new_invoice_details_succesful_create(self):
        # Arrange
        _id = 1
        invoice_id = 1
        product_id = 10
        quantity = 2
        item_total = 20
        obligatory_info = ["invoice_id", "product_id", "quantity", "item_total"]
        expected_insert_result = {"id":_id, "invoice_id":invoice_id, "quantity":quantity, "item_total":item_total}
        invoice_detail_data = {"invoice_id":invoice_id, "product_id":product_id, "quantity":quantity, "item_total":item_total}

        # patch module-level dependencies in repository_invoice_details
        with patch('app.repositories.repository_invoice_details.invoice_details_validations') as mock_invoc_det_validations, \
            patch('app.repositories.repository_invoice_details.invoice_details_manager') as mock_invoc_det_manager:
            # configure mocks
            mock_invoc_det_validations.not_need_value.return_value = True
            mock_invoc_det_validations.complete_info.return_value = True
            mock_invoc_det_manager.single_insert.return_value = expected_insert_result

            # Act: call new_invoice_detail
            result = self.invc_det_repo.new_invoice_detail(invoice_id, product_id, quantity, item_total)

            # Assert: the repository should have validated and inserted the constructed dict
            mock_invoc_det_validations.not_need_value.assert_called_once_with(invoice_detail_data, "id")
            mock_invoc_det_validations.complete_info.assert_called_once_with(invoice_detail_data, obligatory_info)
            mock_invoc_det_manager.single_insert.assert_called_once_with(invoice_detail_data)
            assert result == expected_insert_result


    # failure case: invoice_detail complete info failed
    def test_new_invoice_detail_incomplete_info(self):
        # Arrange
        invoice_id = 1
        product_id = 10
        quantity = 2
        item_total = 20
        obligatory_info = ["invoice_id", "product_id", "quantity", "item_total"]
        invoice_detail_data = {"invoice_id":invoice_id, "product_id":product_id, "quantity":quantity, "item_total":item_total}

        # patch module-level dependencies in repository_invoice_details
        with patch('app.repositories.repository_invoice_details.invoice_details_validations') as mock_invoc_det_validations:
            mock_invoc_det_validations.not_need_value.return_value = True
            mock_invoc_det_validations.complete_info.side_effect = ValueError("Info missing required")

            # Act & Assert (raise ValueError)
            with pytest.raises(ValueError) as excinfo:
                self.invc_det_repo.new_invoice_detail(invoice_id, product_id, quantity, item_total)

            # Assert: the repository should have validated and inserted the constructed dict
            mock_invoc_det_validations.not_need_value.assert_called_once_with(invoice_detail_data, "id")
            mock_invoc_det_validations.complete_info.assert_called_once_with(invoice_detail_data, obligatory_info)
            assert "Info missing required" in str(excinfo.value)


    # tests for get_invoice_detail_by_value
    # success case: get invoice details by id
    def test_get_invoice_detail_by_value_id(self):
        # Arrange: patchs
        with patch('app.repositories.repository_invoice_details.invoice_details_validations') as mock_validations, \
            patch('app.repositories.repository_invoice_details.invoice_details_manager') as mock_manager, \
            patch('app.repositories.repository_invoice_details.InvoiceDetailsRepository._format_invoice_details') as mock_format:

            # Arrange a fake record returned by the manager
            detail_record = MagicMock()
            detail_record.id = 1
            detail_record.invoice_id = 1
            detail_record.product_id = 1
            detail_record.quantity = 2
            detail_record.item_total = 20.00

            id_value = 1

            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = [detail_record]
            mock_validations.valid_value.return_value = True

            # Make _format_invoice_details return a dict for the provided record
            mock_format.side_effect = lambda rec: {
                "id": rec.id,
                "invoice_id": rec.invoice_id,
                "product_id": rec.product_id,
                "quantity": rec.quantity,
                "item_total": rec.item_total
            }

            # Act
            formatted_results = self.invc_det_repo.get_invoice_detail_by_value("id", id_value)

            # Assert
            mock_manager.single_select.assert_called_once_with("id", id_value)
            mock_format.assert_called_once_with(detail_record)
            assert formatted_results == [{"id": 1, "invoice_id": 1, "product_id": 1, "quantity": 2, "item_total": 20.00}]


    # failure case: ProgrammingError
    def test_get_invoice_detail_by_value_programming_error(self):
        # patching validations and manager
        with patch('app.repositories.repository_invoice_details.invoice_details_validations') as mock_validations, \
            patch('app.repositories.repository_invoice_details.invoice_details_manager') as mock_manager:

            mock_validations.valid_columns.return_value = True
            # Simulate SQLAlchemy ProgrammingError
            mock_manager.single_select.side_effect = ProgrammingError("non_existing_table", None, None)

            # Act & Assert
            with pytest.raises(ProgrammingError) as excinfo:
                self.invc_det_repo.get_invoice_detail_by_value("id", 1)

            assert "non_existing_table" in str(excinfo.value)


    # tests update_invoice_detail
    # sucess case: update quantity
    def test_update_invoice_detail_change_quantity(self):
        # Arrange
        search_column = "id"
        search_value = 1
        column_modify = "quantity"
        new_value = 4
        invoice_detail_data = [{"id":1, "invoice_id":1, "product_id":1, "quantity":2, "item_total":20.00}]
        expected_result = {"quantity":4}

        # patching validations and manager
        with patch('app.repositories.repository_invoice_details.invoice_details_validations') as mock_validations, \
            patch('app.repositories.repository_invoice_details.invoice_details_manager') as mock_manager:
            # mocks
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = invoice_detail_data
            mock_validations.valid_value.return_value = True

            # Act
            result = self.invc_det_repo.update_invoice_detail(search_column, search_value, column_modify, new_value)

            # Assert: validations and manager calls
            mock_validations.valid_columns.assert_any_call(search_column, ["id"])  # search column validated
            mock_manager.single_select.assert_called_once_with(search_column, search_value)
            mock_validations.valid_value.assert_called_once_with(search_column, search_value, invoice_detail_data)
            mock_validations.valid_columns.assert_any_call(column_modify, ["quantity", "item_total"])  # update column validated
            mock_manager.single_update.assert_called_once_with(search_column, search_value, column_modify, new_value)
            assert result == expected_result


    # failure case: invalid search column
    def test_update_cart_invalid_search_column(self):
        # Arrange
        search_column = "idx"
        search_value = 1
        column_modify = "quantity"
        new_value = "4"

        # patch dependencies in repository_carts
        with patch('app.repositories.repository_invoice_details.invoice_details_validations') as mock_validations:
            # mocks: valid_columns passes, single_select returns empty result, valid_value will raise
            mock_validations.valid_columns.side_effect = ValueError("Column 'idx' not exists or not allowed for searches or modification.")

            # Act & Assert
            with pytest.raises(ValueError) as excinfo:
                self.invc_det_repo.update_invoice_detail(search_column, search_value, column_modify, new_value)

            #interactions
            mock_validations.valid_columns.assert_called_once_with(search_column, ["id"])  # search column validated
            assert "not exists or not allowed" in str(excinfo.value)
    

    # tests delete_cart
    # sucess case: delete invoice_detail by id
    def test_delete_invoice_detail_by_id(self):
        # Arrange
        search_column = "id"
        search_value = 1
        invoice_detail_data = [{"id":1, "invoice_id":1, "product_id":1, "quantity":2, "item_total":20.00}]

        with patch('app.repositories.repository_invoice_details.invoice_details_validations') as mock_validations, \
            patch('app.repositories.repository_invoice_details.invoice_details_manager') as mock_manager:
            # mocks
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = invoice_detail_data
            mock_validations.valid_value.return_value = True

            # Act
            result = self.invc_det_repo.delete_invoice_detail(search_column, search_value)

            # Assert: validations and manager calls
            mock_validations.valid_columns.assert_called_once_with(search_column, ["id"])  # search column validated
            mock_manager.single_select.assert_called_once_with(search_column, search_value)
            mock_validations.valid_value.assert_called_once_with(search_column, search_value, invoice_detail_data)
            mock_manager.single_delete.assert_called_once_with(search_column, search_value)
            assert result is None


    # failure case: invalid id
    def test_delete_invoice_detail_invalid_search_id(self):
        # Arrange
        search_column = "id"
        search_value = 1000

        # patch dependencies
        with patch('app.repositories.repository_invoice_details.invoice_details_validations') as mock_validations, \
            patch('app.repositories.repository_invoice_details.invoice_details_manager') as mock_manager:
            
            # mocks
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = []
            mock_validations.valid_value.side_effect = ValueError("Invalid value '1000' for column 'id'")

            # Act & Assert:
            with pytest.raises(ValueError) as excinfo:
                self.invc_det_repo.delete_invoice_detail(search_column, search_value)

            # verify interactions
            mock_validations.valid_columns.assert_called_once_with(search_column, ["id"])  # search column validated
            mock_manager.single_select.assert_called_once_with(search_column, search_value)
            mock_validations.valid_value.assert_called_once_with(search_column, search_value, [])
            assert "Invalid value" in str(excinfo.value)