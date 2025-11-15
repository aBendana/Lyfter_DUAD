import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
import redis
from unittest.mock import Mock, MagicMock
from pytest_mock import mocker
from flask import Response, json
from app.utils.cache_manager import CacheManager
from app.repositories.repository_products import ProductsRepository




class TestCacheManager:

    def setup_method(self):
    # Mock redis connection
        self.mock_redis_client = MagicMock()
        self.cache_manager = CacheManager()
        self.cache_manager.redis_client = self.mock_redis_client

    # tests for set_data
    # sucess case: data with time to live
    def test_set_data_with_ttl(self):
        # Arrange
        key = "product:1"
        value = "Dog Food"
        ttl = 1200
        # Act
        self.cache_manager.set_data(key, value, ttl)
        # Assert
        self.mock_redis_client.setex.assert_called_once_with(key, ttl, value)


    # failure case: RedisError on setex
    def test_set_data_redis_failed_with_ttl(self):
        # Arrange
        key = "user:1"
        value = "John Doe"
        ttl = 1200
        # Mock
        self.mock_redis_client.setex.side_effect = redis.RedisError("Connection failed")
        # Act
        self.cache_manager.set_data(key, value, ttl)
        # Assert
        self.mock_redis_client.setex.assert_called_once_with(key, ttl, value)


    # tests for get_data
    # sucess_case: get a key
    def test_get_data_with_existing_key(self):
        # Arrange
        key = "product:1"
        expected_value = "Dog Food"
        self.mock_redis_client.get.return_value = expected_value.encode("utf-8")
        # Act
        result = self.cache_manager.get_data(key)
        # Assert
        self.mock_redis_client.get.assert_called_once_with(key)
        assert result == expected_value


    # failure case: RedisError on get
    def test_get_data_redis_error(self):
        # Arrange
        key = "product:1"
        # Mock
        self.mock_redis_client.get.side_effect = redis.RedisError("Connection failed")
        # Act
        result = self.cache_manager.get_data(key)
        # Assert
        self.mock_redis_client.get.assert_called_once_with(key)
        assert result is None


    # tests for delete_with_pattern
    # sucess case: delete pattern product:*
    def test_delete_with_pattern_product(self, mocker):
        # Arrange
        pattern = "product:*"
        keys_to_delete = [b"product:1", b"product:2", b"product:3"]
        # Mocks
        self.mock_redis_client.scan_iter.return_value = keys_to_delete
        mock_delete = mocker.patch.object(self.cache_manager, 'delete_data')
        # Act
        self.cache_manager.delete_data_with_pattern(pattern)
        # Assert
        self.mock_redis_client.scan_iter.assert_called_once_with(match=pattern)
        assert mock_delete.call_count == 3
        mock_delete.assert_any_call(b"product:1")
        mock_delete.assert_any_call(b"product:2")
        mock_delete.assert_any_call(b"product:3")


    # success case: try delete pattern but no matches
    def test_delete_with_pattern_no_matches(self, mocker):
        # Arrange
        pattern = "nonproducts:*"
        # Mocks
        self.mock_redis_client.scan_iter.return_value = []
        mock_delete = mocker.patch.object(self.cache_manager, 'delete_data')
        # Act
        self.cache_manager.delete_data_with_pattern(pattern)
        # Assert
        self.mock_redis_client.scan_iter.assert_called_once_with(match=pattern)
        mock_delete.assert_not_called()


    # tests for invalidate_cache_by_id
    # sucess case: delete cache for a single id
    def test_invalidate_cache_by_id_for_single_key(self, mocker):
        # Arrange
        data_key = "product"
        column_identifier = "id"
        identifier = 100
        expected_pattern_key = "product:id:100"
        # Mocks
        mock_generate_key = mocker.patch.object(self.cache_manager, 'generate_single_cache_key',
                                                return_value = expected_pattern_key)   
        mock_delete = mocker.patch.object(self.cache_manager, 'delete_data')
        # Act
        self.cache_manager.invalidate_cache_by_id(data_key, column_identifier, identifier)
        # Assert
        mock_generate_key.assert_called_once_with(data_key, column_identifier, identifier)
        mock_delete.assert_called_once_with(expected_pattern_key)

    
    # failure case: RedisError
    def test_invalidate_cache_by_id_redis_error(self, mocker):
        # Arrange
        data_key = "product"
        column_identifier = "id"
        identifier = 100
        # Mocks    
        mock_generate_key = mocker.patch.object(self.cache_manager, 'generate_single_cache_key',
                                                return_value="product:id:100")
        mock_delete = mocker.patch.object(self.cache_manager, 'delete_data',
                                            side_effect=redis.RedisError("Connection failed"))
        # Act
        result = self.cache_manager.invalidate_cache_by_id(data_key, column_identifier, identifier)
        # Assert
        mock_generate_key.assert_called_once()
        mock_delete.assert_called_once()
        assert result is None


    # tests for id_caching
    # success case: data found in cache
    def test_id_caching_key_found(self, mocker):
        # Arrange
        data_key = "product"
        id_column = "id"
        id_value = 100
        cached_product = json.dumps({"id": 1, "name": "Dog Food", "price": 10})
        # Mock
        mocker.patch.object(self.cache_manager,'cache_single_key', 
                            return_value=("product:id:1", cached_product))
        # Act
        response = self.cache_manager.id_cachig(data_key, id_column, id_value)
        # Assert
        assert response.status_code == 200
        assert response.mimetype == 'application/json'
        assert response.get_data(as_text=True) == cached_product


    # success case: data not in cache, fetch from DB and cached
    def test_id_caching_not_in_cache(self, mocker):
        # Arrange
        data_key = "product"
        id_column = "id"
        id_value = 100
        product_from_db = {"id": 1, "name": "Dog Food", "price": 10}
        
        # Mocks
        mocker.patch.object(self.cache_manager,'cache_single_key', 
                            return_value=("product:id:1", None))
        mock_get_product = mocker.patch(
                                    'app.repositories.repository_products.ProductsRepository.get_product_by_id_cache', 
                                    return_value=product_from_db)
        mock_set_data = mocker.patch.object(self.cache_manager, 'set_data')

        # Act
        response = self.cache_manager.id_cachig(data_key, id_column, id_value)

        # Assert
        assert response.status_code == 200
        assert response.mimetype == 'application/json'
        assert json.loads(response.get_data(as_text=True)) == product_from_db
        mock_get_product.assert_called_once_with(id_column, id_value)
        mock_set_data.assert_called_once_with("product:id:1", json.dumps(product_from_db), 600)


    # tests for cache_pagination
    # failure case: negative page number
    def test_cache_pagination_negative_page_number(self):
        # Arrange
        data_key = "products"
        page_number = -1
        # Act & Assert
        with pytest.raises(ValueError, match="Page number must be a positive integer."):
            self.cache_manager.cache_pagination(data_key, page_number)


    # success case: page number 5
    def test_cache_pagination_page_five(self, mocker):
        # Arrange
        data_key = "products"
        page_number = 5
        expected_cache_key = "products:page_5:items_10"
        cached_data = '[{...},{...},...]'
        
        # Mocks
        mock_generate_key = mocker.patch.object(self.cache_manager,'generate_cache_page_key',
                                                return_value=expected_cache_key)
        mock_get_data = mocker.patch.object(self.cache_manager,'get_data', return_value=cached_data)

        # Act
        cache_key, result = self.cache_manager.cache_pagination(data_key, page_number)

        # Assert
        mock_generate_key.assert_called_once_with(data_key, 5, items_per_page=10)
        mock_get_data.assert_called_once_with(expected_cache_key)
        assert cache_key == expected_cache_key
        assert result == cached_data


    # tests for generate_all_cache_key
    # success case: generate key for a whole table
    def test_generate_all_cache_key_products_key(self):
        # Arrange
        data_key = "products"
        expected_all_key = "products:all"
        # Act
        all_key = self.cache_manager.generate_all_cache_key(data_key)
        # Assert
        assert all_key == expected_all_key


    # tests for get_and_caching
    # success case: by page
    def test_get_and_caching_by_page(self, mocker):
        # Arrange
        column = "page"
        filter_value = 5
        expected_response = Response(
            json.dumps([{"id": 1, "name": "Product1"}, {"id": 2, "name": "Product2"}]),
            status=200,
            mimetype='application/json'
        )
        
        # Mock page_caching
        mock_page_caching = mocker.patch.object(self.cache_manager, 'page_caching',
                                                return_value=expected_response)

        # Act
        result = self.cache_manager.get_and_caching(column, filter_value)

        # Assert
        mock_page_caching.assert_called_once_with("products", filter_value)
        assert result.status_code == 200
        assert result.mimetype == 'application/json'


    # failure case: empty column
    def test_get_and_caching_empty_column(self):
        # Arrange
        column = ""
        filter_value = 5

        # Act & Assert
        with pytest.raises(ValueError, match="Column or column's value info incomplete"):
            self.cache_manager.get_and_caching(column, filter_value)
