import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import Mock, MagicMock, patch
from app.repositories.repository_invoices import InvoicesRepository
from datetime import datetime
from decimal import Decimal


class TestInvoicesRepository:
    
    def setup_method(self):
        self.invoices_repo = InvoicesRepository()


    # tests for _format_invoice
    # success case: format invoice record to dict
    def test_format_invoice(self):
        # Arrange
        invoice_record = MagicMock()
        invoice_record.id = 1
        invoice_record.user_id = 10
        invoice_record.cart_id = 100
        invoice_record.shipping_address_id = 200
        invoice_record.date_placed = datetime(2025, 10, 27, 22, 42, 58)
        invoice_record.shipping_method = "standard"
        invoice_record.payment_method = "credit_card"
        invoice_record.invoice_subtotal = Decimal("100.00")
        invoice_record.discount = Decimal("0.00")
        invoice_record.shipping_cost = Decimal("10.00")
        invoice_record.sales_taxes = Decimal("7.00")
        invoice_record.invoice_total = Decimal("117.00")

        # Act
        formatted_invoice = self.invoices_repo._format_invoice(invoice_record)

        # Assert
        assert formatted_invoice == {
            "id": 1,
            "user_id": 10,
            "cart_id": 100,
            "shipping_address_id": 200,
            "date_placed": datetime(2025, 10, 27, 22, 42, 58),
            "shipping_method": "standard",
            "payment_method": "credit_card",
            "invoice_subtotal": Decimal("100.00"),
            "discount": Decimal("0.00"),
            "shipping_cost": Decimal("10.00"),
            "sales_taxes": Decimal("7.00"),
            "invoice_total": Decimal("117.00"),
        }


    # tests for new_invoice
    # success case: invoice created
    def test_new_invoice_succesful_create(self):
        # Arrange
        _id = 1
        user_id = 1
        cart_id = 1
        shipping_address_id = 2
        date_placed = "2025-10-27 22:42:58"
        shipping_method = "express"
        payment_method = "credit_card"
        invoice_subtotal = 100.00
        discount_amount = 0.00
        shipping_cost = 10.00
        sales_taxes = 7.00
        invoice_total = 117.70

        obligatory_info = ["user_id", "cart_id", "shipping_address_id", "shipping_method", "payment_method",
                    "invoice_subtotal", "discount", "shipping_cost", "invoice_total"]

        expected_inserted_invoice = {
            "id": _id,
            "user_id": user_id,
            "cart_id": cart_id,
            "shipping_address_id": shipping_address_id,
            "date_placed": date_placed,
            "shipping_method": shipping_method,
            "payment_method": payment_method,
            "invoice_subtotal": invoice_subtotal,
            "discount": discount_amount,
            "shipping_cost": shipping_cost,
            "sales_taxes": sales_taxes,
            "invoice_total": invoice_total,
        }

        invoice_data = {
            "user_id": user_id,
            "cart_id": cart_id,
            "shipping_address_id": shipping_address_id,
            "shipping_method": shipping_method,
            "payment_method": payment_method,
            "invoice_subtotal": invoice_subtotal,
            "discount": discount_amount,
            "shipping_cost": shipping_cost,
            "invoice_total": invoice_total,
        }

        # patch module-level dependencies in repository invoices
        with patch('app.repositories.repository_invoices.invoice_validations') as mock_validations, \
            patch('app.repositories.repository_invoices.invoice_manager') as mock_manager:
            # configure mocks
            mock_validations.not_need_value.return_value = True
            mock_validations.complete_info.return_value = True
            mock_manager.single_insert.return_value = expected_inserted_invoice

            # Act: call new_invoice
            result = self.invoices_repo.new_invoice(
                user_id,
                cart_id,
                shipping_address_id,
                shipping_method,
                payment_method,
                invoice_subtotal,
                discount_amount,
                shipping_cost,
                invoice_total,
            )

            # Assert: the repository should have validated and inserted the constructed dict
            mock_validations.not_need_value.assert_called_once_with(invoice_data, "id")
            mock_validations.complete_info.assert_called_once_with(invoice_data, obligatory_info)
            mock_manager.single_insert.assert_called_once_with(invoice_data)
            assert result == expected_inserted_invoice


    # failure case: invoice incomplete info
    def test_new_invoice_incomplete_info(self):
        # Arrange
        user_id = 1
        cart_id = 1
        shipping_address_id = 2
        date_placed = "2025-10-27 22:42:58"
        shipping_method = "express"
        payment_method = "credit_card"
        invoice_subtotal = 100.00
        discount = 0.00
        shipping_cost = 10.00
        sales_taxes = 7.00
        invoice_total = 117.70
        
        obligatory_info = ["user_id", "cart_id", "shipping_address_id", "shipping_method", "payment_method",
                    "invoice_subtotal", "discount", "shipping_cost", "invoice_total"]
        
        invoice_data = {
            "user_id": user_id,
            "cart_id": cart_id,
            "shipping_address_id": shipping_address_id,
            "shipping_method": shipping_method,
            "payment_method": payment_method,
            "invoice_subtotal": invoice_subtotal,
            "discount": discount,
            "shipping_cost": shipping_cost,
            "invoice_total": invoice_total,
        }

        # patch module-level dependencies in repository_invoice_details
        with patch('app.repositories.repository_invoices.invoice_validations') as mock_validations:
            mock_validations.not_need_value.return_value = True
            mock_validations.complete_info.side_effect = ValueError("Info missing required")

            # Act & Assert (raise ValueError)
            with pytest.raises(ValueError) as excinfo:
                self.invoices_repo.new_invoice(
                    user_id,
                    cart_id,
                    shipping_address_id,
                    shipping_method,
                    payment_method,
                    invoice_subtotal,
                    discount,
                    shipping_cost,
                    invoice_total
                )

            # Assert: the repository should have validated and inserted the constructed dict
            mock_validations.not_need_value.assert_called_once_with(invoice_data, "id")
            mock_validations.complete_info.assert_called_once_with(invoice_data, obligatory_info)
            assert "Info missing required" in str(excinfo.value)


    # tests for create_full_invoice
    # success case: successful create (transactions)
    def test_create_full_invoice_succesful_created(self):
        # Arrange
        _id = 1
        user_id = 1
        cart_id = 1
        shipping_address_id = 2
        date_placed = "2025-10-27 22:42:58"
        shipping_method = "express"
        payment_method = "credit_card"
        invoice_subtotal = 100.00
        discount_amount = 0.00
        shipping_cost = 10.00
        sales_taxes = 7.00
        invoice_total = 117.70

        discount_rate = 0.00

        expected_inserted_invoice = {
            "id": _id,
            "user_id": user_id,
            "cart_id": cart_id,
            "shipping_address_id": shipping_address_id,
            "date_placed": date_placed,
            "shipping_method": shipping_method,
            "payment_method": payment_method,
            "invoice_subtotal": invoice_subtotal,
            "discount": discount_amount,
            "shipping_cost": shipping_cost,
            "sales_taxes": sales_taxes,
            "invoice_total": invoice_total,
        }

        products_in_cart = [
                            {"id":1, "cart_id":1, "product_id":1, "quantity":2},
                            {"id":2, "cart_id":1, "product_id":2, "quantity":4}
                        ]

        # patch module-level dependencies in repository invoices
        with patch('app.repositories.repository_invoices.invoice_transactions') as mock_transactions, \
            patch('app.repositories.repository_invoices.InvoicesRepository.new_invoice') as mock_new_invoice:
            # configure mocks
            mock_transactions.calculate_invoice_subtotal.return_value = invoice_subtotal
            mock_transactions.calculate_discount.return_value = discount_amount
            mock_transactions.calculate_shipping_cost.return_value = shipping_cost
            mock_transactions.calculate_invoice_total.return_value = invoice_total
            mock_new_invoice.return_value = expected_inserted_invoice

            # Act: call new_invoice
            result = self.invoices_repo.create_full_invoice(user_id, cart_id, shipping_address_id, 
                                shipping_method, payment_method, products_in_cart, discount_amount)


            # Assert: the repository should have validated and inserted the constructed dict
            mock_transactions.calculate_invoice_subtotal.assert_called_once_with(products_in_cart)
            mock_transactions.calculate_discount.assert_called_once_with(invoice_subtotal, discount_rate)
            mock_transactions.calculate_shipping_cost.assert_called_once_with(shipping_method)
            mock_transactions.calculate_invoice_total.assert_called_once_with(invoice_subtotal, discount_amount, shipping_cost)
            mock_new_invoice.assert_called_once_with(user_id, cart_id, shipping_address_id, shipping_method, payment_method,
                                            invoice_subtotal, discount_amount, shipping_cost, invoice_total)
            assert result == expected_inserted_invoice


    # failure case: invalid_discount_rate
    def test_create_full_invoice_invalid_discount_rate(self):
        # Arrange
        user_id = 1
        cart_id = 1
        shipping_address_id = 2
        shipping_method = "express"
        payment_method = "credit_card"
        invoice_subtotal = 100.00
        products_in_cart = [
                    {"id":1, "cart_id":1, "product_id":1, "quantity":2},
                    {"id":2, "cart_id":1, "product_id":2, "quantity":4}
                ]
        discount_rate = 200.00

        # patching validations and manager
        with patch('app.repositories.repository_invoices.invoice_transactions') as mock_transactions:

            mock_transactions.calculate_invoice_subtotal.return_value = invoice_subtotal
            #mock_transactions.calculate_discount.side_effect = ValueError("Invalid discount rate")

            # execute real calculate_discount
            from app.utils.transactions import Transactions
            real_transactions = Transactions()
            mock_transactions.calculate_discount = real_transactions.calculate_discount # takes the parameters implicitly

            # Act & Assert
            with pytest.raises(ValueError) as excinfo:
                self.invoices_repo.create_full_invoice(user_id, cart_id, shipping_address_id, shipping_method, 
                                                        payment_method, products_in_cart, discount_rate)

            assert "Invalid discount rate" in str(excinfo.value)


    # tests for show_carts
    # sucess case: read whole invoices table
    def test_show_invoices_succesful_read(self):
        # Arrange, patch invoice_manager and the instance _format_invoice method
        with patch('app.repositories.repository_invoices.invoice_manager') as mock_manager, \
            patch('app.repositories.repository_invoices.InvoicesRepository._format_invoice') as mock_format_invoice:
            # Arrange
            record1 = MagicMock()
            record1.id = 1
            record1.user_id = 10
            record1.cart_id = 100
            record1.shipping_address_id = 200
            record1.date_placed = datetime(2025, 10, 27, 22, 42, 58)
            record1.shipping_method = "standard"
            record1.payment_method = "credit_card"
            record1.invoice_subtotal = Decimal("100.00")
            record1.discount = Decimal("0.00")
            record1.shipping_cost = Decimal("10.00")
            record1.sales_taxes = Decimal("7.00")
            record1.invoice_total = Decimal("117.00")

            record2 = MagicMock()
            record2.id = 2
            record2.user_id = 20
            record2.cart_id = 101
            record2.shipping_address_id = 201
            record2.date_placed = datetime(2025, 10, 28, 10, 15, 30)
            record2.shipping_method = "express"
            record2.payment_method = "paypal"
            record2.invoice_subtotal = Decimal("250.00")
            record2.discount = Decimal("25.00")
            record2.shipping_cost = Decimal("15.00")
            record2.sales_taxes = Decimal("18.00")
            record2.invoice_total = Decimal("258.00")

            mock_manager.whole_table_select.return_value = [record1, record2]
            # make _format_invoice return a full invoice dict
            mock_format_invoice.side_effect = lambda rec: {
                "id": rec.id,
                "user_id": rec.user_id,
                "cart_id": rec.cart_id,
                "shipping_address_id": rec.shipping_address_id,
                "date_placed": rec.date_placed,
                "shipping_method": rec.shipping_method,
                "payment_method": rec.payment_method,
                "invoice_subtotal": rec.invoice_subtotal,
                "discount": rec.discount,
                "shipping_cost": rec.shipping_cost,
                "sales_taxes": rec.sales_taxes,
                "invoice_total": rec.invoice_total,
            }

            # Act
            formatted_results = self.invoices_repo.show_invoices()

            # Assert
            mock_manager.whole_table_select.assert_called_once()
            # _format_invoice should be called for each record
            assert mock_format_invoice.call_count == 2
            assert formatted_results == [{"id": 1, "user_id": 10, "cart_id": 100, "shipping_address_id": 200, "date_placed": datetime(2025, 10, 27, 22, 42, 58), "shipping_method": "standard", "payment_method": "credit_card", "invoice_subtotal": Decimal("100.00"), "discount": Decimal("0.00"), "shipping_cost": Decimal("10.00"), "sales_taxes": Decimal("7.00"), "invoice_total": Decimal("117.00")},
                                        {"id": 2, "user_id": 20, "cart_id": 101, "shipping_address_id": 201, "date_placed": datetime(2025, 10, 28, 10, 15, 30), "shipping_method": "express", "payment_method": "paypal", "invoice_subtotal": Decimal("250.00"), "discount": Decimal("25.00"), "shipping_cost": Decimal("15.00"), "sales_taxes": Decimal("18.00"), "invoice_total": Decimal("258.00")}]


    # failure case: empty invoices table
    def test_show_invoices_empty_table(self):
        # Arrange, patch invoice_manager and the instance _format_invoice method
        with patch('app.repositories.repository_invoices.invoice_manager') as mock_manager, \
            patch('app.repositories.repository_invoices.InvoicesRepository._format_invoice') as mock_format_invoice:
            # Arrange
            mock_manager.whole_table_select.return_value = []
            # Act
            formatted_results = self.invoices_repo.show_invoices()
            # Assert
            assert formatted_results == []
            assert mock_format_invoice.call_count == 0


    # tests for delete_invoice
    # failure case: invalid search column
    def test_delete_invoice_invalid_search_column(self):
        # Arrange
        search_column = "user_id"
        search_value = 1

        # patch dependencies in repository_invoices
        with patch('app.repositories.repository_invoices.invoice_validations') as mock_validations:
            # mocks
            mock_validations.valid_columns.side_effect = ValueError(f"Column 'user_id' not exists or not allowed for searches or modification.")

            # Act & Assert: Value error in 1st validation
            with pytest.raises(ValueError) as excinfo:
                self.invoices_repo.delete_invoice(search_column, search_value)

            # verify interactions
            mock_validations.valid_columns.assert_called_once_with(search_column, ["id"])  # search column validated
            assert "not exists or not allowed for searches or modification" in str(excinfo.value)








