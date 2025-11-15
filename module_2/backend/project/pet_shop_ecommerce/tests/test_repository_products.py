import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import Mock, MagicMock, patch
from sqlalchemy.exc import IntegrityError, SQLAlchemyError, OperationalError
from app.repositories.repository_products import ProductsRepository


class TestProductsRepository:

    def setup_method(self):
        self.products_repo = ProductsRepository()


    # tests for insert_many_products
    # success case: multiple products inserted successfully
    def test_insert_many_products_successful(self):
        # Arrange
        products_list = [
            {
                "SKU": "SKU001",
                "name": "Dog Food",
                "description": "Premium dog food",
                "target_species": "dog",
                "supplier": "PetSupplier Inc",
                "stock": 50,
                "cost": 15.99,
                "price": 25.99
            },
            {
                "SKU": "SKU002",
                "name": "Cat Toy",
                "description": "Interactive cat toy",
                "target_species": "cat",
                "supplier": "ToysForPets",
                "stock": 100,
                "cost": 5.50,
                "price": 12.99
            }
        ]
        
        obligatory_info = ["SKU", "name", "description", "target_species", "supplier", "stock", "cost", "price"]

        # patch dependencies and products table
        with patch('app.repositories.repository_products.product_validations') as mock_validations, \
            patch('app.repositories.repository_products.product_manager') as mock_manager:
            
            # mocks
            mock_validations.complete_info.return_value = True
            mock_manager.multiple_inserts.return_value = None

            # Act
            result = self.products_repo.insert_many_products(products_list)

            # Assert: validations for each product, multiple_inserts called once
            assert mock_validations.complete_info.call_count == 2  # Called for each product
            mock_validations.complete_info.assert_any_call(products_list[0], obligatory_info)
            mock_validations.complete_info.assert_any_call(products_list[1], obligatory_info)
            mock_manager.multiple_inserts.assert_called_once_with(products_list)
            assert result is None


    # failure case: IntegrityError
    def test_insert_many_products_integrity_error(self):
        # Arrange
        products_list = [
            {
                "SKU": "SKU001",
                "name": "Dog Food",
                "description": "Premium dog food",
                "target_species": "dog",
                "supplier": "PetSupplier Inc",
                "stock": 50,
                "cost": 15.99,
                "price": 25.99
            },
            {
                "SKU": "SKU001",  # Duplicate SKU
                "name": "Cat Food",
                "description": "Premium cat food",
                "target_species": "cat",
                "supplier": "PetSupplier Inc",
                "stock": 30,
                "cost": 12.99,
                "price": 22.99
            }
        ]

        # Patch module-level dependencies and Products table
        with patch('app.repositories.repository_products.product_validations') as mock_validations, \
            patch('app.repositories.repository_products.product_manager') as mock_manager:

            # mocks
            mock_validations.complete_info.return_value = True
            mock_manager.multiple_inserts.side_effect = IntegrityError("duplicate key value violates unique constraint", None, None)

            # Act & Assert
            with pytest.raises(IntegrityError) as excinfo:
                self.products_repo.insert_many_products(products_list)

            assert "duplicate key value violates unique constraint" in str(excinfo.value)


    # tests for get_all_products_cache
    # success case: read all products from cache
    def test_get_all_products_cache_success(self):
        # Arrange
        product1 = MagicMock()
        product1.id = 1
        product1.SKU = "SKU001"
        product1.name = "Dog Food"
        product1.description = "Premium dog food"
        product1.target_species = MagicMock(value="Dog")
        product1.supplier = "PetSupplier Inc"
        product1.stock = 50
        product1.cost = 15.99
        product1.price = 25.99

        product2 = MagicMock()
        product2.id = 2
        product2.SKU = "SKU002"
        product2.name = "Cat Toy"
        product2.description = "Interactive cat toy"
        product2.target_species = MagicMock(value="Cat")
        product2.supplier = "ToysForPets"
        product2.stock = 100
        product2.cost = 5.50
        product2.price = 12.99

        expected_result = [
            {
                "id": 1,
                "SKU": "SKU001",
                "name": "Dog Food",
                "description": "Premium dog food",
                "target_species": "Dog",
                "supplier": "PetSupplier Inc",
                "stock": 50,
                "cost": 15.99,
                "price": 25.99
            },
            {
                "id": 2,
                "SKU": "SKU002",
                "name": "Cat Toy",
                "description": "Interactive cat toy",
                "target_species": "Cat",
                "supplier": "ToysForPets",
                "stock": 100,
                "cost": 5.50,
                "price": 12.99
            }
        ]

        with patch('app.repositories.repository_products.product_manager') as mock_manager:
            mock_manager.whole_table_select.return_value = [product1, product2]

            # Act
            result = self.products_repo.get_all_products_cache()

            # Assert
            mock_manager.whole_table_select.assert_called_once()
            assert result == expected_result


    # failure case: SQLAlchemyError
    def test_get_all_products_cache_sqlalchemy_error(self):
        with patch('app.repositories.repository_products.product_manager') as mock_manager:
            mock_manager.whole_table_select.side_effect = SQLAlchemyError("No such table", None, None)

            # Act & Assert: the SQLAlchemyError should propagate
            with pytest.raises(SQLAlchemyError) as excinfo:
                self.products_repo.get_all_products_cache()

            assert "No such table" in str(excinfo.value)


    # tests for get_product_max_id
    # success case: read the max id 
    def test_get_product_max_id_successful(self):
        # Arrange
        expected_max_id = 100

        with patch('app.repositories.repository_products.product_manager') as mock_manager:
            mock_manager.get_max_id.return_value = expected_max_id

            # Act
            result = self.products_repo.get_product_max_id()

            # Assert
            mock_manager.get_max_id.assert_called_once()
            assert result == expected_max_id


    # failure case: OperationalError
    def test_get_product_max_id_operational_error(self):
        # Arrange
        with patch('app.repositories.repository_products.product_manager') as mock_manager:
            mock_manager.get_max_id.side_effect = OperationalError("Database connection timeout", None, None)

            # Act & Assert
            with pytest.raises(OperationalError) as excinfo:
                self.products_repo.get_product_max_id()

            assert "Database connection timeout" in str(excinfo.value)


    # tests for update_product
    # success case: update stock
    def test_update_product_successfully_stock(self):
        # Arrange
        search_col = "id"
        search_value = 1
        column_modify = "stock"
        new_value = 150

        product_data = [{"id": 1,
                        "SKU": "SKU001",
                        "name": "Dog Food",
                        "description": "Premium dog food",
                        "target_species": "dog",
                        "supplier": "PetSupplier Inc",
                        "stock": 50,
                        "cost": 15.99,
                        "price": 25.99
                        }]

        valid_search_columns = ["id"]
        valid_update_columns = [ "description", "supplier", "stock", "cost", "price"]

        # patch dependencies
        with patch('app.repositories.repository_products.product_validations') as mock_validations, \
            patch('app.repositories.repository_products.product_manager') as mock_manager:

            # mocks setup
            mock_validations.valid_columns.return_value = True
            mock_manager.single_select.return_value = product_data
            mock_validations.valid_value.return_value = True

            # Act
            result = self.products_repo.update_product(search_col, search_value, column_modify, new_value)

            # Assert — validations and calls
            mock_validations.valid_columns.assert_any_call(search_col, valid_search_columns)
            mock_manager.single_select.assert_called_once_with(search_col, search_value)
            mock_validations.valid_value.assert_called_once_with(search_col, search_value, product_data)
            mock_validations.valid_columns.assert_any_call(column_modify, valid_update_columns)
            mock_manager.single_update.assert_called_once_with(search_col, search_value, column_modify, new_value)

            assert result is None  # method doesn't return anything


    def test_update_product_invalid_search_column(self):
        # Arrange
        search_column = "price_id"  # invalid column
        search_value = 1
        column_modify = "stock"
        new_value = 50

        valid_search_columns = ["id"]

        # patch
        with patch('app.repositories.repository_products.product_validations') as mock_validations:
            mock_validations.valid_columns.side_effect = ValueError(
                "Column 'price_id' not exists or not allowed for searches or modification."
            )

            # Act & Assert
            with pytest.raises(ValueError) as excinfo:
                self.products_repo.update_product(search_column, search_value, column_modify, new_value)

            # Interactions
            mock_validations.valid_columns.assert_called_once_with(search_column, valid_search_columns)
            assert "not exists or not allowed" in str(excinfo.value)
