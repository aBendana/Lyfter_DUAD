from repository_users import UsersRepository
from jwt_manager import JWT_Manager
from flask import Blueprint, Flask, request, Response, jsonify


users_repo = UsersRepository()
jwt_manager = JWT_Manager('happylife', 'RS256')


logins_bp = Blueprint('logins', __name__)

@logins_bp.route('/register', methods=['POST'])
def register():
    
    try:
        user_data = request.get_json()
        result = users_repo.insert_user_register(user_data)
        user_id = result[0]
        rol_type = result[1]
        #print(rol_type)
        token = jwt_manager.encode({'id':user_id, 'rol':rol_type})
        return jsonify(message="Successful Registration", token=token)

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500 



@logins_bp.route('/login', methods=['POST'])
def login():

    try:
        user_data = request.get_json()
        email = user_data.get('email')
        password = user_data.get('password')
        result = users_repo.get_user_by_credentials(user_data, 'email', 'password', email, password)
        user_id = result[0]["id"]
        rol_type = result[0]["rol"]
        token = jwt_manager.encode({'id':user_id, 'rol':rol_type})
        if rol_type.value == 'administrator':
            return jsonify(message="Administrator: Successful Login!", token=token)
        elif rol_type.value == 'client':
            return jsonify(message="Client: Successful Login!", token=token)
    
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


@logins_bp.route("/me", methods=["GET"])
def me():
    try:
        token = request.headers.get('Authorization')
        if(token is not None):
            user_token = token.replace("Bearer ","")
            #print(user_token)
            user_decoded = jwt_manager.decode(user_token)
            #print(user_decoded)
            user_id = user_decoded['id']
            user_rol = user_decoded['rol']
            #print(user_id, user_rol)

            user = users_repo.get_user_by_value("id", user_id)
            print(user)
            #rol = user['rol'].value

            return jsonify(id=user_id, rol=user_rol, username=user[0]["name"]),200
        else:
            return Response("Token not exists", status=403, content_type='text/plain')
    except Exception as e:
        return Response("Internal Server Error", status=500, content_type='text/plain')