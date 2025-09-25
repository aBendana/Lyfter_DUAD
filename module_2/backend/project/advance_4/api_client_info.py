from flask import Flask, Blueprint, request, jsonify, g
from repository_users import UsersRepository
from repository_shipping_addresses import AddressesRepository
from decorator_authenticator import client_only
from validations import Validations


users_repo = UsersRepository()
addresses_repo = AddressesRepository()
client_info_bp = Blueprint('client_info', __name__)

@client_info_bp.route("/client/info/personal-data", methods=['GET'])
@client_only
def show_personal_info():
    try:
        user_id = g.user_id
        formatted_user = users_repo.get_user_by_value_for_api("id", user_id)

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500  
    return jsonify(formatted_user), 200


@client_info_bp.route("/client/info/personal-data", methods=['PATCH'])
@client_only
def update_personal_info():
    try:
        user_id = g.user_id
        personal_data = request.get_json()

        # prevents 'product id' from being changed
        personal_data.pop("id", None)
        for personal_key, personal_value in personal_data.items():
            column_modify = personal_key
            new_value = personal_value
            # updating
            users_repo.update_user("id", user_id, column_modify, new_value)

        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500


@client_info_bp.route("/client/info/shipping-addresses", methods=['POST'])
@client_only
def create_address():
    try:
        user_id = g.user_id
        user_name = g.user_name
        # ensures the correct user ID is inserted when the user_id could be incorrect.
        # the correct reference is given by g.user_id, which is provided by the login.
        address_data = request.get_json()
        address_data["user_id"] = user_id

        address_data = request.get_json()
        formatted_address = addresses_repo.insert_address(address_data)
        return jsonify(message=f"{user_name} your shipping address has been successfully saved", address=formatted_address), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500 


@client_info_bp.route("/client/info/shipping-addresses/many", methods=['POST'])
@client_only
def create_many_addresses():
    try:
        user_id = g.user_id
        user_name = g.user_name

        addresses_data_list = request.get_json()
        for address_data in addresses_data_list:
            # ensures the correct user ID is inserted when the user_id could be incorrect.
            # the correct reference is given by g.user_id, which is provided by the login.
            address_data["user_id"] = user_id
        
        addresses_repo.insert_many_addresses(addresses_data_list)
        return jsonify(message=f"{user_name} your shipping addresses have been successfully saved", addresses=addresses_data_list), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500


@client_info_bp.route("/client/info/shipping-addresses", methods=['GET'])
@client_only
def show_addresses():
    try:
        user_id = g.user_id
        query_params = request.args
        if query_params:
            column_a = list(request.args.keys())[0]
            filter_value = request.args.get(column_a)
            if column_a and filter_value:
                formatted_addresses = addresses_repo.get_address_by_value(column_a, "user_id", filter_value, user_id)
            else:
                raise ValueError(f"Column or column's value info incomplete")

        else:
            formatted_addresses = addresses_repo.show_addresses(user_id)

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500  
    return jsonify(formatted_addresses), 200

@client_info_bp.route("/client/info/shipping-addresses/<address_id>", methods=['PATCH'])
@client_only
def update_address(address_id):
    try:
        user_id = g.user_id
        address_data = request.get_json()
        # ensures the address belongs to the user that is in the login session
        addresses_repo.get_address_by_value("id", "user_id", address_id, user_id)

        # prevents 'product id' from being changed
        address_data.pop("id", None)
        address_data.pop("user_id", None)
        for product_key, product_value in address_data.items():
            column_modify = product_key
            new_value = product_value
            # updating
            addresses_repo.update_address("id", address_id, column_modify, new_value)

        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500


@client_info_bp.route("/client/info/shipping-addresses/<address_id>", methods=['DELETE'])
@client_only
def delete_address(address_id):
    try:
        user_id = g.user_id
        # ensures the address belongs to the user logged in
        addresses_repo.get_address_by_value("id", "user_id", address_id, user_id)

        # deleting
        addresses_repo.delete_address("id", address_id)
        return jsonify(address=address_id, message="Successful deleted"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  