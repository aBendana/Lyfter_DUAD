from flask import Flask, Blueprint, request, jsonify
from decorator_authenticator import admin_only
from repository_users import UsersRepository
from validations import Validations


users_repo = UsersRepository()
user_validations = Validations()


users_bp = Blueprint('users', __name__)

# create (insert) user
@users_bp.route("/users", methods=['POST'])
@admin_only
def create_users():

    try:
        user_data = request.get_json()
        users_repo.insert_user(user_data)
        return jsonify(message="Successful saved", user=user_data), 200
            
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500 


# create - insert many users
@users_bp.route("/users/many", methods=['POST'])
@admin_only
def create_many_users():

    try:
        users_data = request.get_json()
        users_repo.insert_many_users(users_data)
        return jsonify(message="Successful saved", users=users_data), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500


# show users or show users by name, email, or role(query parameter)
@users_bp.route("/users", methods=['GET'])
@admin_only
def show_users():

    try:
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            if column and filter_value:
                formatted_users = users_repo.get_user_by_value(column, filter_value)
            else:
                raise ValueError(f"Column or column's value info incomplete")

        else:
            formatted_users = users_repo.get_users()

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_users), 200



# get a user ideally by id with path parameters or any other parameter except password
@users_bp.route("/users/<column>/<value>", methods=['GET'])
@admin_only
def get_user(column, value):
    
    try:
        formatted_users = users_repo.get_user_by_value_for_api(column, value)
    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500

    return jsonify(formatted_users), 200



# update a user by path parameter user id or name (id or name can't be changed)
@users_bp.route("/users/<column>/<value>", methods=['PATCH'])
@admin_only
def update_users(column, value):
    try:
        user_data = request.get_json()
        # prevents 'user id' or 'user name' from being changed
        user_data.pop("id", None)
        user_data.pop("name", None)

        for user_key, user_value in user_data.items():
            column_modify = user_key
            new_value = user_value
            # updating
            users_repo.update_user(column, value, column_modify, new_value)

        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500
    


# update many users
@users_bp.route("/users/many/<column>", methods=['PATCH'])
@admin_only
def update_many_users(column):

    try:
        column_modify = column
        data_to_modify = request.get_json()
        users_repo.update_many_users(column_modify, data_to_modify)

        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500



# delete user by path parameter id or name
#preferably not to use, keep for reference and for related functionality of the db
@users_bp.route("/users/<column>/<value>", methods=['DELETE'])
@admin_only
def delete_user(column, value):

    try:
        users_repo.delete_user(column, value)
        return jsonify(user=value, message="Successful delete"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  