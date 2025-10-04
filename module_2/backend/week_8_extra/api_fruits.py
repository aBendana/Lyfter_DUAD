from flask import Flask, Blueprint, request, jsonify, Response
import json
from repository_fruits import FruitsRepository
from cache_manager import CacheManager
from decorator_authenticator import admin_only
from validations import Validations


fruits_repo = FruitsRepository()
cache_manager = CacheManager()
fruit_validations = Validations()


fruits_bp = Blueprint('fruits', __name__)

# create (insert) fruit
@fruits_bp.route("/fruits", methods=['POST'])
@admin_only
def create_fruits():
    try:
        max_id = fruits_repo.get_fruit_max_id()  # max id before create the new fruit 
        fruit_data = request.get_json()
        fruits_repo.new_fruit(fruit_data)
        cache_manager.invalidate_data_in_page("fruits", "id", max_id) # delete the last pagination page
        cache_manager.delete_data_with_pattern("fruits:all")
        return jsonify(message="Successful saved", fruit=fruit_data), 200
            
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500 


# show fruits or show fruits by name, entry_date, price or quantity(query parameter)
@fruits_bp.route("/fruits", methods=['GET'])
def show_fruits():

    try:
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            
            # pagination
            if column == "page":
                cache_key, cached_data = cache_manager.cache_pagination("fruits", filter_value)
                if cached_data:
                    return Response(cached_data, status=200, mimetype='application/json')
                else:
                    formatted_fruits = fruits_repo.get_fruits_pagination(filter_value)
                    if formatted_fruits == []:
                        return Response(json.dumps({"message": f"There is no cache or it cannot be cached for the page {filter_value}"}), status=404, mimetype="application/json")
                    
                    cache_manager.set_data(cache_key, json.dumps(formatted_fruits)) # set the page if exists data
                    print("Data accessed from database and cached to Redis.")
                    return Response(json.dumps(formatted_fruits), status=200, mimetype='application/json')

            # search for columns            
            # for date_entry use format yy-mm-dd (2025-7-1)
            if column and filter_value:
                if column == "id":
                    # verifying cache in Redis
                    cache_key, cached_data = cache_manager.cache_single_key("fruit", column, filter_value)
                    if cached_data:
                        return Response(cached_data, status=200, mimetype='application/json')
                    else:
                        #caching a single key
                        formatted_fruit = fruits_repo.get_fruit_by_value(column, filter_value)
                        cache_manager.set_data(cache_key, json.dumps(formatted_fruit), 600)
                        return Response(json.dumps(formatted_fruit), status=200, mimetype='application/json')

                # search by others allowed columns 
                formatted_fruits = fruits_repo.get_fruit_by_value(column, filter_value)   #cache_manager.set_data(cache_key, json.dumps(formatted_fruits))
            else:
                raise ValueError(f"Column or column's value info incomplete")

        else:
            # show all fruits
            all_cache_key, all_cached_data = cache_manager.cache_all_key("fruits")
            if all_cached_data:
                return Response(all_cached_data, status=200, mimetype='application/json')
            else:
                formatted_fruits = fruits_repo.get_all_fruits_cache()
                cache_manager.set_data(all_cache_key, json.dumps(formatted_fruits))
                return jsonify(formatted_fruits), 200

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500


# update a fruit by path parameter fruit id(id or name can't be changed)
@fruits_bp.route("/fruits/<id_value>", methods=['PATCH'])
@admin_only
def update_fruits(id_value):
    try:
        fruit_data = request.get_json()
        # prevents 'fruit id' or 'fruit name' from being changed
        fruit_data.pop("id", None)
        fruit_data.pop("name", None)
        for fruit_key, fruit_value in fruit_data.items():
            column_modify = fruit_key
            new_value = fruit_value
            # updating
            fruits_repo.update_fruit("id", id_value, column_modify, new_value)

        # delete cache for pattern and pagination if exists
        cache_manager.invalidate_data_in_page("fruits", "id", int(id_value))
        cache_manager.selective_cache_invalidation_by_id("fruit", "id", id_value)
        cache_manager.delete_data_with_pattern("fruits:all")
        
        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500


# delete fruit by path parameter id
# preferably not to use, keep for reference and for related functionality of the db
@fruits_bp.route("/fruits/<id_value>", methods=['DELETE'])
@admin_only
def delete_fruit(id_value):
    
    try:
        fruits_repo.delete_fruit("id", id_value)

        # delete cache for pattern and pagination if exists
        cache_manager.delete_data_with_pattern("fruits:*")
        cache_manager.selective_cache_invalidation_by_id("fruit", "id", id_value)
        return jsonify(fruit=id_value, message="Successful deleted"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  