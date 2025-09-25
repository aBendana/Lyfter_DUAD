from flask import Flask, Blueprint, request, jsonify, g
from repository_products import ProductsRepository
from decorator_authenticator import client_only, users_only
from validations import Validations


products_repo = ProductsRepository()
products_bp = Blueprint('products', __name__)

@products_bp.route("/products", methods=['POST'])
@client_only
def create_product():
    try:
        product_data = request.get_json()
        formatted_data = products_repo.insert_product(product_data)
        return jsonify(message="Successful saved", product=formatted_data), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500 


@products_bp.route("/products/many", methods=['POST'])
@client_only
def admin_create_many_products():
    try:
        products_data_list = request.get_json()
        products_repo.insert_many_products(products_data_list)
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
            if column and filter_value:
                formatted_products = products_repo.get_product_by_value(column, filter_value)
            else:
                raise ValueError(f"Column or column's value info incomplete")

        else:
            formatted_products = products_repo.show_products()

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500  
    return jsonify(formatted_products), 200


# update a product by path parameter product id (id or user_id can't be changed)
@products_bp.route("/products/<id_value>", methods=['PATCH'])
@client_only
def update_contact(id_value):
    try:
        product_data = request.get_json()

        # prevents 'product id' from being changed
        product_data.pop("id", None)
        for contact_key, product_value in product_data.items():
            column_modify = contact_key
            new_value = product_value
            # updating
            products_repo.update_product("id", id_value, column_modify, new_value)

        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500


# delete contact by path parameter id
@products_bp.route("/products/<id_value>", methods=['DELETE'])
@client_only
def delete_contact(id_value):
    try:
        products_repo.delete_product("id", id_value)
        return jsonify(contact=id_value, message="Successful deleted"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  