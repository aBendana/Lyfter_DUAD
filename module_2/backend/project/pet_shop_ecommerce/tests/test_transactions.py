import sys
import os
import pytest
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from decimal import Decimal
from app.utils.transactions import Transactions
from app.repositories.repository_products import ProductsRepository
from app.repositories.repository_products_in_cart import ProductsInCartRepository


class TestTransactions:

    def setup_method(self):
        self.transactions = Transactions()

    # tests for stock transactions
    # tests for update_take_from_stock
    # success case
    def test_update_take_from_stock_a_product(self, mocker):
        # Arrange
        product_id = 1
        quantity_purchased = 3
        initial_stock = 100
        expected_stock = 97

        # Mock get_product_by_value
        mocker.patch.object(ProductsRepository, 'get_product_by_value', 
            return_value=[{"id": product_id, "stock": initial_stock}])
        # Mock update_product
        mock_update = mocker.patch.object(ProductsRepository, 'update_product')

        # Act
        self.transactions.update_take_from_stock(product_id, quantity_purchased)

        # Assert
        mock_update.assert_called_once_with("id", product_id, "stock", expected_stock)


    # failure case
    def test_update_take_from_stock_insufficient_stock(self, mocker):
        # Arrange
        product_id = 1
        quantity_purchased = 10
        initial_stock = 5

        # Mock get_product_by_value
        mocker.patch.object(ProductsRepository, 'get_product_by_value', 
            return_value=[{"id": product_id, "stock": initial_stock}])

        # Act & Assert
        with pytest.raises(ValueError, match="Not enough product in stock"):
            self.transactions.update_take_from_stock(product_id, quantity_purchased)


    # tests for stock_logic
    # failure case: new quantity negative
    def test_stock_logic_negative_quantity(self):
        # Arrange
        current_quantity = 2
        new_quantity = -3
        product_id = 1
        product_in_cart = [{"id": 1, "cart_id":1 , "product_id": product_id, "quantity": current_quantity}]

        # Act & Assert
        with pytest.raises(ValueError, match="Quantity can not be negative"):
            self.transactions.stock_logic(current_quantity, new_quantity, product_id, product_in_cart)


    # failure case: same quantity
    def test_stock_logic_same_quantity(self):
        # Arrange
        current_quantity = 2
        new_quantity = 2
        product_id = 1
        product_in_cart = [{"id": 1, "cart_id":1 , "product_id": product_id, "quantity": current_quantity}]

        # Act & Assert
        with pytest.raises(ValueError, match="Quantity is the same as before"):
            self.transactions.stock_logic(current_quantity, new_quantity, product_id, product_in_cart)


    # success case: quantity zero remove from cart
    def test_stock_logic_remove_from_cart(self, mocker):
        # Arrange
        current_quantity = 5
        new_quantity = 0
        product_id = 1
        product_in_cart_id = 1
        initial_stock = 95
        expected_stock = 100

        # Mock get_product_by_value
        mocker.patch.object(ProductsRepository, 'get_product_by_value', 
            return_value=[{"id": product_id, "stock": initial_stock}])
        # Mock update_product
        mock_update_product = mocker.patch.object(ProductsRepository, 'update_product')
        # Mock delete_product_in_cart
        mock_delete_product_in_cart = mocker.patch.object(ProductsInCartRepository, 'delete_product_in_cart')

        # Act
        self.transactions.stock_logic(current_quantity, new_quantity, product_id, product_in_cart_id)

        # Assert
        mock_update_product.assert_called_once_with("id", product_id, "stock", expected_stock)
        mock_delete_product_in_cart.assert_called_once_with("id", product_in_cart_id)


    # success case: increase quantity
    def test_stock_logic_increase_quantity(self, mocker):
        # Arrange
        current_quantity = 2
        new_quantity = 5
        product_id = 1
        product_in_cart_id = 1
        initial_stock = 98
        expected_stock = 95

        # Mock get_product_by_value
        mocker.patch.object(ProductsRepository, 'get_product_by_value', 
            return_value=[{"id": product_id, "stock": initial_stock}])
        # Mock update_product
        mock_update_product = mocker.patch.object(ProductsRepository, 'update_product')
        # Mock update_product_in_cart
        mock_update_cart = mocker.patch.object(ProductsInCartRepository, 'update_product_in_cart')

        # Act
        self.transactions.stock_logic(current_quantity, new_quantity, product_id, product_in_cart_id)

        # Assert
        mock_update_product.assert_called_once_with("id", product_id, "stock", expected_stock)
        mock_update_cart.assert_called_once_with("id", 1, "quantity", new_quantity)


    # success case: decrease quantity
    def test_stock_logic_decrease_quantity(self, mocker):
        # Arrange
        current_quantity = 5
        new_quantity = 2
        product_id = 1
        product_in_cart_id = 1
        initial_stock = 95
        expected_stock = 98

        # Mock get_product_by_value
        mocker.patch.object(ProductsRepository, 'get_product_by_value', 
            return_value=[{"id": product_id, "stock": initial_stock}])
        # Mock update_product
        mock_update_product = mocker.patch.object(ProductsRepository, 'update_product')
        # Mock update_product_in_cart
        mock_update_cart = mocker.patch.object(ProductsInCartRepository, 'update_product_in_cart')

        # Act
        self.transactions.stock_logic(current_quantity, new_quantity, product_id, product_in_cart_id)

        # Assert
        mock_update_product.assert_called_once_with("id", product_id, "stock", expected_stock)
        mock_update_cart.assert_called_once_with("id", 1, "quantity", new_quantity)



    # tests for invoices transactions
    # test for calculate_item total
    # success case: one item
    def test_calculate_item_total_of_one_item(self, mocker):
        # Arrange
        item = {"product_id": 1, "quantity": 4}
        product_price = 25.0
        expected_total = 100.0

        # Mock get_product_by_value
        mocker.patch.object(ProductsRepository, 'get_product_by_value', 
            return_value=[{"id": 1, "price": product_price}])

        # Act
        item_total = self.transactions.calculate_item_total(item)
        # Assert
        assert item_total == expected_total


    # test for invoice subtotal
    # success case: multiple items
    def test_calculate_invoice_subtotal_multiple_items(self, mocker):
        # Arrange
        products_in_cart = [
            {"product_id": 1, "price": 100, "quantity": 2},
            {"product_id": 2, "price": 50, "quantity": 3},
            {"product_id": 3, "price": 25, "quantity": 1}]
        expected_subtotal = 375

        # Mock retorna valores diferentes para cada llamada
        mocker.patch.object(self.transactions, 'calculate_item_total', side_effect=[200, 150, 25])  # 100*2, 50*3, 25*1
        
        # Act
        result = self.transactions.calculate_invoice_subtotal(products_in_cart)
        # Assert
        assert result == expected_subtotal


    # tests for discount calculation
    # failure case: discount < 0
    def test_calculate_discount_negative_rate(self):
        # Arrange
        subtotal = 100
        discount_rate = -15

        # Act & Assert
        with pytest.raises(ValueError, match="Invalid discount rate"):
            self.transactions.calculate_discount(subtotal, discount_rate)


    # success case: valid rate
    def test_calculate_discount_valid_rate(self):
        # Arrange
        subtotal = 200
        discount_rate = 10  # 10%
        expected_discount = Decimal('20.00')  # 10% of 200

        # Act
        discount_amount = self.transactions.calculate_discount(subtotal, discount_rate)

        # Assert
        assert discount_amount == expected_discount


    # tests for calculate shipping cost
    # failure case: invalid shipping method
    def test_calculate_shipping_cost_invalid_method(self):
        # Arrange
        shipping_method = "one day"

        # Act & Assert
        with pytest.raises(ValueError, match="Invalid shipping method"):
            self.transactions.calculate_shipping_cost(shipping_method)


    # success case: valid shipping method
    def test_calculate_shipping_cost_valid_method(self):
        # Arrange
        shipping_method = "overnight"
        expected_cost = 25.00

        # Act
        shipping_cost = self.transactions.calculate_shipping_cost(shipping_method)
        # Assert
        assert shipping_cost == expected_cost


    # test for calculate invoice total
    def test_calculate_invoice_total_with_discount_amount(self):
            # Arrange
            subtotal = Decimal(1000)
            discount_amount = Decimal(100)
            shipping_cost = Decimal(50)
            
            # taxes = (1000 - 100 + 50) * 0.07 = 66.50
            # total = 1000 - 100 + 50 + 66.50 = 1016.50
            expected_total = Decimal("1016.50")

            # Act
            result = self.transactions.calculate_invoice_total(subtotal, discount_amount, shipping_cost)
            # Assert
            assert result == expected_total