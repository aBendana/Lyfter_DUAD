from flask import Flask, Blueprint, request, jsonify
from api_db_connection import connection
from users_repository import UsersRepository
from validations import Validations


#app = Flask(__name__)

users_bp = Blueprint('users', __name__)
#filtering = Filter()
valid_user = Validations()

# creating the connection with the db
db_manager = connection()
users_repo = UsersRepository(db_manager)


# show users or show users by status (query parameter)
@users_bp.route("/users", methods=['GET'])
def show_users():

    try:
        #formatted users is the list of users
        formatted_users = users_repo.get_all()
        status_filter = request.args.get('status')
        if status_filter:
            formatted_users = users_repo.get_by_query_parameter(status_filter)

    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_users), 200


# get a user by id, user name or email with path parameter
@users_bp.route("/users/<column>/<parameter>", methods=['GET'])
def get_user(column, parameter):
    
    try:
        formatted_user = users_repo.get_by_path_parameter(column, parameter)
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_user ), 200


# create (save) users
@users_bp.route("/users", methods=['POST'])
def create_users():

    obligatory_user_info = ['user_name', 'email', 'password', 'birth_date', 'status']
    valid_status = ['active', 'inactive', 'suspended', 'blocked']
    status_parameter = "status"

    try:
        user_data = request.get_json()
        valid_user.not_need_parameter(user_data, "id")
        valid_user.complete_info(user_data, obligatory_user_info)
        valid_user.check_valid_type(user_data, status_parameter, valid_status)
        users_repo.create(user_data)
        
        return jsonify(message="Successful saved", user=user_data), 200
            

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# update a user by path parameter user_id (id can't be changed)
@users_bp.route("/users/<column>/<parameter>", methods=['PATCH'])
def update_user(column, parameter):

    obligatory_user_info = ['user_name', 'email', 'password', 'birth_date', 'status']
    valid_status = ['active', 'inactive', 'suspended', 'blocked']
    status_parameter = "status"
    
    try:
        formatted_user = users_repo.get_by_path_parameter(column, parameter)
        user_data = request.get_json()
        
        # prevents the 'user_id' from being changed
        user_data.pop("id", None)

        # checking valid status
        if "status" in user_data:
            valid_user.check_valid_type(user_data, status_parameter, valid_status)
        
        # preparing the update and not "" values allowed
        formatted_user.update(user_data)
        valid_user.complete_info_update(formatted_user, obligatory_user_info)
        
        # updating
        users_repo.update(formatted_user)

        return jsonify(message="Successful updated", user=formatted_user), 200
    

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# **this end point ain't gonna be used in this homework**
# delete a user by path parameter user id
@users_bp.route("/users/<_id>", methods=['DELETE'])
def delete_user(_id):
    
    try:
        users_repo.delete(_id)
        return jsonify(user=_id, message="Successful delete"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  