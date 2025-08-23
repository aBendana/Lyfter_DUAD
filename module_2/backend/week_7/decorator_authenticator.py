from flask import request, jsonify, Response, g
from functools import wraps
from jwt_manager import JWT_Manager
from repository_users import UsersRepository

jwt_manager = JWT_Manager('happylife', 'RS256')
users_repo = UsersRepository()


# current user
def me():
    token = request.headers.get('Authorization')
    if not token:
        raise ValueError("Token not provided")

    user_token = token.replace("Bearer ", "")
    user_decoded = jwt_manager.decode(user_token)
    #print(f"PAYLOAD {user_decoded}") # dictionary
    if not user_decoded:
        raise ValueError("Invalid token")
    return user_decoded


def client_only(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            user = me()
            print(user['rol'])
            if user.get('rol') != 'client':
                return Response("Access denied: only clients allowed", status=403)
            
            # save data in g
            g.user_id = user['id']
            user_data = users_repo.get_user_by_value("id", user['id'])
            # print(f"USER DATA {user_data}") # list of dictionary
            g.user_name = user_data[0]['name']
            g.user_role = str(user_data[0]['rol'].value)
            print(g.user_role)

            return func(*args, **kwargs)
        
        except Exception as error:
            return Response(str(error), status=401)
    return wrapper


def admin_only(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            user = me()
            print(user['rol'])
            if user.get('rol') != 'administrator':
                return Response("Access denied: only administrators allowed", status=403)
            
            # save data in g
            g.user_id = user['id']
            user_data = users_repo.get_user_by_value("id", user['id'])
            # print(f"USER DATA {user_data}") # list of dictionary
            g.user_name = user_data[0]['name']
            g.user_role = str(user_data[0]['rol'].value)

            return func(*args, **kwargs)
        
        except Exception as error:
            return Response(str(error), status=401)
    return wrapper


def all_users(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            user = me()
            print(user['rol'])
            if user.get('rol') != 'administrator' and user.get('rol') != 'client':
                return Response("Access denied", status=403)

            # save data in g
            g.user_id = user['id']
            user_data = users_repo.get_user_by_value("id", user['id'])
            # print(f"USER DATA {user_data}") # list of dictionary
            g.user_name = user_data[0]['name']
            g.user_role = str(user_data[0]['rol'].value)
            print(g.user_role)

            return func(*args, **kwargs)
        
        except Exception as error:
            return Response(str(error), status=401)
    return wrapper


