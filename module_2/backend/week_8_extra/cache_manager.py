import redis
from flask import request, jsonify, Response
import json
from redis_connection import RedisConnection
from repository_fruits import FruitsRepository

redis_connection = RedisConnection()
fruits_repo = FruitsRepository()

class CacheManager:

    def __init__(self):
        self.redis_client = redis_connection.redis_client()


    def set_data(self, key, value, ttl=None):
        try:     
            if ttl is None:
                self.redis_client.set(key, value)
                print(f"Key '{key}' created with value '{value}'.")
            else:
                self.redis_client.setex(key, ttl, value)
                print(f"Key '{key}' created with value '{value}' and time to live {ttl}.")

        except redis.RedisError as e:
            print(f"Failed to set cache for key {key}: {e}")


    def check_key(self, key):
        try:
            key_exists = self.redis_client.exists(key)
            if key_exists:
                print(f"Key '{key}' exists in Redis Data Base.")
                
                ttl = self.redis_client.ttl(key)
                if ttl >= 0:
                    print(f"Key '{key}' has a TTL of {ttl}.")
                return {"exists": True, "time_to_live": ttl}
            
            else:
                print(f"Key '{key}' does not exist in Redis Data Base.")
            return {"exists": False, "time_to_live": None}
        
        except redis.RedisError as e:
            print(f"An error ocurred while checking a key in Redis: {e}")
            return None


    def get_data(self, key):
        try:
            data = self.redis_client.get(key)
            if data is not None:
                result = data.decode("utf-8")
                print(f"Value for key '{key}' is '{result}'.")
                return result
            else:
                print(f"No value found for key {key}.")
                return None
            
        except redis.RedisError as e:
            print(f"An error ocurred while retrieving data from Redis: {e}")


    def generate_cache_key(self, data_key, column_identifier, identifier):
        return f"{data_key}:{column_identifier}:{identifier}"
    
    
    def cache_single_key(self, data_key, column_identifier, identifier):
        try:
            cache_key = self.generate_cache_key(data_key, column_identifier, identifier)
            cached_data = self.get_data(cache_key)
            if cached_data:
                print("Data accessed from cache.")
            return cache_key, cached_data

        except redis.RedisError as e:
            print(f"An error ocurred while retrieving Cache Key from Redis: {e}")


    def generate_all_cache_key(self, data_key):
        return f"{data_key}:all"
    

    def cache_all_key(self,data_key):
        try:
            cache_key = self.generate_all_cache_key(data_key)
            cached_data = self.get_data(cache_key)
            if cached_data:
                    print("Data accessed from cache.")
            return cache_key, cached_data
    
        except redis.RedisError as e:
            print(f"An error ocurred while retrieving Cache Key from Redis: {e}")


    def delete_data(self, key):
        try:
            deleted_keys = self.redis_client.delete(key)
            if deleted_keys > 0:
                print(f"Key '{key}' and its value have been deleted.")
            else:
                print(f"Key '{key}' not found.")
            return deleted_keys
        
        except redis.RedisError as e:
            print(f"An error ocurred while deleting data from Redis: {e}")
            return None


    def delete_data_with_pattern(self, pattern):
        try:
            for key in self.redis_client.scan_iter(match=pattern):
                self.delete_data(key)
                
        except redis.RedisError as e:
            print(f"An error ocurred while deleting data from Redis: {e}")


    def generate_cache_page_key(self, data_key, page_number, items_per_page=10):
        return f"{data_key}:page_{page_number}:items_{items_per_page}"
    

    def cache_pagination(self, data_key, page_number):
        try:
            page_number = int(page_number)
            if page_number < 1:
                raise ValueError("Page number must be a positive integer.")
            
            cache_key = self.generate_cache_page_key(data_key, page_number, items_per_page=10)
            cached_data = self.get_data(cache_key)
            if cached_data:
                print("Data accessed from cache.")
            return cache_key, cached_data
        
        except redis.RedisError as e:
            print(f"An error ocurred while caching pagination data: {e}")
            return None, None
        

    def selective_cache_invalidation_by_id(self, data_key, column_identifier, identifier):
        try:
            pattern_key = self.generate_cache_key(data_key, column_identifier, identifier)
            self.delete_data(pattern_key)
            print(f"Cache '{pattern_key}' have been invalidated.")

        except redis.RedisError as e:
            print(f"An error ocurred while invalidating cache data: {e}")
            return None


    def invalidate_data_in_page(self, data_search_key, column_identifier, identifier):
        try:
            # print(data_search_key,column_identifier,identifier)
            pattern_page = f"{data_search_key}:page*"
            page_keys = self.redis_client.keys(pattern_page)
            for pattern_page_key in page_keys:
                page_data = self.redis_client.get(pattern_page_key)
                info_page_data = json.loads(page_data)

                for pattern_key in info_page_data:
                    if pattern_key[column_identifier] == identifier:
                        #print("So happy to find this shit")
                        self.delete_data(pattern_page_key)

            return True

        except redis.RedisError as e:
            print(f"Error while invalidating id '{identifier}' in cached pages: {e}")
            return False




