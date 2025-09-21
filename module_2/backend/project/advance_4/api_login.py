from repository_users import UsersRepository
from repository_login_history import LoginHistoryRepository
from jwt_manager import JWT_Manager
from flask import Blueprint, Flask, request, Response, jsonify


users_repo = UsersRepository()
login_repo = LoginHistoryRepository()
jwt_manager = JWT_Manager('happymonth', 'RS256')


logins_bp = Blueprint('logins', __name__)

@logins_bp.route('/auth/register', methods=['POST'])
def register():
    
    try:
        user_data = request.get_json()
        result = users_repo.insert_user_register(user_data)
        print(f"Register result: {result}")
        
        user_id = result[0]
        role_type = result[1]
        #print(role_type)

        # verifying register - login status successfully or failed
        login_repo.login_status_verification(user_id, True)

        # generate a token upon registration
        token = jwt_manager.encode({'id':user_id, 'role':role_type})
        return jsonify(message="Successful Registration", token=token), 201

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500 



@logins_bp.route('/auth/login', methods=['POST'])
def login():

    try:
        user_data = request.get_json()
        email = user_data.get('email')
        password = user_data.get('password')

        user_exists = users_repo.get_user_by_value_login("email", email)
        result = users_repo.get_user_by_credentials(user_data, 'email', 'password', email, password)
        #verifying login status
        if not user_exists and not result:
            login_repo.login_status_verification(1001, False)
        elif user_exists and not result:
            login_repo.login_status_verification(user_exists[0]["id"], False)
        elif user_exists and result:
            login_repo.login_status_verification(user_exists[0]["id"], True)
            user_id = result[0]["id"]
            role_type = result[0]["role"]

        # access tokens --- access token and refresh token
        access_token = jwt_manager.encode({'id':user_id, 'role':role_type})
        refresh_token = jwt_manager.encode({'id':user_id, 'role':role_type}, expires_in=604800, is_refresh=True)

        if role_type.value == 'administrator':
            return jsonify(message="Administrator: Successful Login!", access_token=access_token, refresh_token=refresh_token)
        elif role_type.value == 'client':
            return jsonify(message="Client: Successful Login!", access_token=access_token, refresh_token=refresh_token)

    except ValueError as error:
        msg = str(error)
        if "Info missing required" in msg:
            return jsonify(error = msg), 422
        elif "Wrong credentials" in msg:
            return jsonify(error = msg), 403
        else:
            return jsonify(error = msg), 400
    except Exception as error:
        return jsonify(error = str(error)), 500



@logins_bp.route("/auth/me", methods=["GET"])
def me():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return Response("Token not provided", status=403, content_type='text/plain')

        else:
            user_token = token.replace("Bearer ","")
            user_decoded = jwt_manager.decode(user_token)    
            if not user_decoded:
                return Response("Invalid or expired token", status=401, content_type='text/plain')
            user_id = user_decoded['id']
            user_role = user_decoded['role']
            user = users_repo.get_user_by_value("id", user_id)

            return jsonify(id=user_id, role=user_role, username=user[0]["name"]),200
        
    except Exception as e:
        print(f"Unexpected error: {e}") 
        return Response("Internal Server Error", status=500, content_type='text/plain')



@logins_bp.route("/auth/refresh-token", methods=["POST"])
def refresh_token():
    try:
        token = request.headers.get("Authorization")
        if not token:
            return Response("Refresh token not provided", status=403, content_type="text/plain")

        refresh_token = token.replace("Bearer ", "")
        user_decoded = jwt_manager.decode(refresh_token)
        if not user_decoded:
            return Response("Invalid or expired refresh token", status=401, content_type="text/plain")

        # differentiation between an access token and a refresh token
        if user_decoded.get("type") != "refresh":
            return Response("Invalid token type", status=403, content_type="text/plain")

        # Generate a new access token
        user_data = {"id": user_decoded["id"], "role": user_decoded["role"]}
        new_access_token = jwt_manager.encode(user_data)

        return jsonify({"new_access_token": new_access_token}), 200

    except Exception as e:
        print(f"Refresh error: {e}")
        return Response("Internal Server Error", status=500, content_type="text/plain")
