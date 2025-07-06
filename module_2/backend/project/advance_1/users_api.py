from flask import Flask, Blueprint, request, jsonify
from data import SaveData
from validations import Validations
from errors import ParameterError, Filter


#app = Flask(__name__)

users_bp = Blueprint('users', __name__)
data = SaveData()
filtering = Filter()
valid_user = Validations()


# # root endpoint
# @app.route("/")
# def root():
#     return "<h1>Rocky Pet Shop!</h1>"


# show users and type of users with query parameters
@users_bp.route("/users", methods=['GET'])
def show_users():

    try:
        users_list = data.read_data_json('users.json')
        type_filter = request.args.get('type')
        if type_filter:
            users_list = filtering.valid_filter(users_list, 'type', type_filter)

    
    except ParameterError as error:
        return jsonify(error = f" 'type', {error}"), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(users_list), 200


# get a user by id with path parameter
@users_bp.route("/users/<user_id>", methods=['GET'])
def get_user(user_id):
    
    try:
        users_list = data.read_data_json('users.json')
        user = filtering.valid_filter(users_list, 'user_id', user_id)
    
    except ParameterError as error:
        return jsonify(error = f" 'user id', {error}"), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(user), 200


# save users
@users_bp.route("/users", methods=['POST'])
def save_users():

    obligatory_user_info = ['user_id', 'password', 'type', 'name', 'email', 'address']
    id_parameter = "user_id"
    valid_types = ["administrator","customer"]
    type_parameter = "type"

    try:
        if data.json_data_exists('users.json'):
            users_list = data.read_data_json('users.json')
        else:
            users_list = []

        user_data = request.get_json()
        valid_user.complete_info(user_data, obligatory_user_info)
        valid_user.not_repeat_id(users_list, id_parameter, user_data)
        valid_user.check_valid_type(user_data, type_parameter, valid_types)
        users_list.append(user_data)
        data.write_data_json(users_list, 'users.json')
        
        return jsonify(message="Successful saved", users=users_list), 200
            

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# update a user by path parameter user_id (id can't be changed)
@users_bp.route("/users/<user_id>", methods=['PATCH'])
def update_user(user_id):

    valid_types = ["administrator","customer"]
    type_parameter = "type"
    
    try:
        users_list = data.read_data_json('users.json')
        filtering.valid_filter(users_list, 'user_id', user_id)
        user_data = request.get_json()
        
        # prevents the 'user_id' from being changed
        user_data.pop("user_id", None)

        if "type" in user_data:
            valid_user.check_valid_type(user_data, type_parameter, valid_types)
        
        for index, user in enumerate(users_list):
            if user.get("user_id") == user_id:
                user.update(user_data)
                users_list[index] = user
                data.write_data_json(users_list, 'users.json')

                return jsonify(user), 200
    
    except ParameterError as error:
        return jsonify(error = f" 'user_id', {error}"), 400
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# delete a user by path parameter user_id
@users_bp.route("/users/<user_id>", methods=['DELETE'])
def delete_user(user_id):
    
    try:
        users_list = data.read_data_json('users.json')
        filtering.valid_filter(users_list, 'user_id', user_id)
        for index, user in enumerate(users_list):
            if user.get("user_id") == user_id:
                users_list.pop(index)
                data.write_data_json(users_list, 'users.json')

        return jsonify(message="Successful delete", users=users_list), 200

    except ParameterError as error:
        return jsonify(error = f" 'id', {error}"), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  