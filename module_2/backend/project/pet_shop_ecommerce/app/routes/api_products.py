from flask import Flask, Blueprint, request, jsonify, g
from app.repositories.repository_products import ProductsRepository
from app.infrastructure.security.decorator_authenticator import admin_only, client_only, users_only
from app.utils.cache_manager import CacheManager
from app.utils.validations import Validations


products_repo = ProductsRepository()
cache_manager = CacheManager()
products_bp = Blueprint('products', __name__)

@products_bp.route("/products", methods=['POST'])
@admin_only
def create_product():
    try:
        max_id = products_repo.get_product_max_id()
        product_data = request.get_json()
        formatted_data = products_repo.insert_product(product_data)
        # delete cache
        cache_manager.invalidate_cache_page("products", "id", max_id) # delete the last cache page
        cache_manager.delete_data_with_pattern("products:all")
        return jsonify(message="Successful saved", product=formatted_data), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500 


@products_bp.route("/products/many", methods=['POST'])
@admin_only
def create_many_products():
    try:
        max_id = products_repo.get_product_max_id()
        products_data_list = request.get_json()
        products_repo.insert_many_products(products_data_list)
        # delete cache
        cache_manager.invalidate_cache_page("products", "id", max_id) # delete the last cache page
        cache_manager.delete_data_with_pattern("products:all")
        return jsonify(message="Products have been successfully saved", products=products_data_list), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500


# show all contacts or select products by id, SKU, name, target_species or supplier(query parameters)
@products_bp.route("/products", methods=['GET'])
def show_products():
    try:
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            # get products and cache paging or cache id
            results = cache_manager.get_and_caching(column, filter_value)
            return results

        else:
            # get and caching all products
            # read data from db if there is no cache
            all_data_cache = cache_manager.all_data_caching("products")
            return all_data_cache

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500  
    # return jsonify(formatted_products), 200


# update a product by path parameter product id (id or user_id can't be changed)
@products_bp.route("/products/<id_value>", methods=['PATCH'])
@admin_only
def update_product(id_value):
    try:
        product_data = request.get_json()

        # prevents 'product id' from being changed
        product_data.pop("id", None)
        for contact_key, product_value in product_data.items():
            column_modify = contact_key
            new_value = product_value
            # updating
            products_repo.update_product("id", id_value, column_modify, new_value)
        
        # delete cache by id, pattern and pagination if exists
        cache_manager.invalidate_cache_page("products", "id", int(id_value))
        cache_manager.invalidate_cache_by_id("product", "id", id_value)
        cache_manager.delete_data_with_pattern("products:*")

        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500


# delete contact by path parameter id
@products_bp.route("/products/<id_value>", methods=['DELETE'])
@admin_only
def delete_product(id_value):
    try:
        products_repo.delete_product("id", id_value)
        # delete cache for pattern and pagination if exists
        cache_manager.invalidate_cache_page("products", "id", int(id_value))
        cache_manager.invalidate_cache_by_id("product", "id", id_value)
        cache_manager.delete_data_with_pattern("products:*")
        return jsonify(product=id_value, message="Successful deleted"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  