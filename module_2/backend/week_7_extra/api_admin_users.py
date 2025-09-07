from flask import Flask, Blueprint, request, jsonify
from decorator_authenticator import admin_only
from repository_users import UsersRepository
from repository_login_history import LoginHistoryRepository
from validations import Validations


users_repo = UsersRepository()
login_repo = LoginHistoryRepository()
user_validations = Validations()

admin_users_bp = Blueprint('admin_users', __name__)

# create (insert) user
@admin_users_bp.route("/admin/users", methods=['POST'])
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
@admin_users_bp.route("/admin/users/many", methods=['POST'])
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
@admin_users_bp.route("/admin/users", methods=['GET'])
@admin_only
def show_users():
    try:
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            if column and filter_value:
                formatted_users = users_repo.get_user_by_value_for_api(column, filter_value)
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
@admin_users_bp.route("/admin/users/<column>/<value>", methods=['GET'])
@admin_only
def get_user(column, value):
    try:
        formatted_users = users_repo.get_user_by_value_for_api(column, value)
    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500

    return jsonify(formatted_users), 200


# update a user by path parameter user id (id, name, role can't be changed)
@admin_users_bp.route("/admin/users/<id_value>", methods=['PATCH'])
@admin_only
def update_user(id_value):
    try:
        user_data = request.get_json()
        # prevents 'user id', 'user name' or 'role' from being changed
        user_data.pop("id", None)
        user_data.pop("name", None)
        user_data.pop("role", None)

        for user_key, user_value in user_data.items():
            column_modify = user_key
            new_value = user_value
            # updating
            users_repo.update_user("id", id_value, column_modify, new_value)

        return jsonify(message1="Successful updated", message2="'user id', 'user name' or 'role' can't be changed", 
                    user_data_updated=user_data), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500


# delete user by path parameter id or name
#preferably not to use, keep for reference and for related functionality of the db
@admin_users_bp.route("/admin/users/<id_value>", methods=['DELETE'])
@admin_only
def delete_user(id_value):
    try:
        users_repo.delete_user("id", id_value)
        return jsonify(user=id_value, message="Successful delete"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500



# show users or show users by name, email, or role(query parameter)
@admin_users_bp.route("/admin/users/login-history", methods=['GET'])
@admin_only
def show_login_history():
    try:
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            if column and filter_value:
                formatted_logins = login_repo.get_login_history_by_value(column, filter_value)
            else:
                raise ValueError(f"Column or column's value info incomplete")
        else:
            formatted_logins = login_repo.get_login_history()

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_logins), 200



# delete a login_history by id
#preferably not to use, keep for reference and for related functionality of the db
@admin_users_bp.route("/admin/users/login-history/<id_value>", methods=['DELETE'])
@admin_only
def delete_login_history(id_value):
    try:
        login_repo.delete_login_history("id", id_value)
        return jsonify(user=id_value, message="Successful delete"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500



# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  