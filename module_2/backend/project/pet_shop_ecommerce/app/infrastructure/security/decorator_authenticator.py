from flask import request, jsonify, Response, g
from functools import wraps
from app.infrastructure.security.jwt_manager import JWT_Manager
from app.repositories.repository_users import UsersRepository
from app.utils.cache_manager import CacheManager

jwt_manager = JWT_Manager('happyday', 'RS256')
users_repo = UsersRepository()
cache_manager = CacheManager()


# current user
def me():
    try:
        token = request.headers.get("Authorization")
        if not token:
            return None
        
        user_token = token.replace("Bearer ", "")
        user_decoded = jwt_manager.decode(user_token)
        if user_decoded:
            # with valid access token
            if user_decoded.get("type") == "access":
                return user_decoded

            # with valid refresh token and generating new access token
            elif user_decoded.get("type") == "refresh":
                user_data = {"id": user_decoded["id"], "role": user_decoded["role"]}
                # generating new access token with default expiration 900 seconds and refresh false
                new_access_token = jwt_manager.encode(user_data)
                print(f"\n\033[38;5;208mNew access token generated from refresh:\033[0m")
                # print(f"\n\033[38;5;208mNew access token generated from refresh:\033[0m {new_access_token}\n")
                refreshed_user_decoded = jwt_manager.decode(new_access_token)
                return refreshed_user_decoded

        return None

    except Exception as error:
        print(f"Unexpected error: {error}")
        return Response("Internal Server Error", status=500, content_type="text/plain")


def client_only(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            user = me()
            # help to return Response in case of error from me()
            if not user:
                return Response("Invalid, expired or missing token", status=401)

            if user.get('role') != 'client':
                return Response("Access denied: only clients allowed", status=403)

            # save data in g
            g.user_id = user['id']
            g.user_role = user['role']

            # get data from cache or db
            user_data = cache_manager.user_data_caching("user", "id", user['id'])

            g.user_name = user_data[0]['name']
            return func(*args, **kwargs)
        
        except Exception as error:
            return Response("User Unauthorized! " + str(error), status=401)
    return wrapper


def admin_only(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            user = me()
            if not user:
                return Response("Invalid, expired or missing token", status=401)

            if user.get('role') != 'administrator':
                return Response("Access denied: only administrators allowed", status=403)
            
            # save data in g
            g.user_id = user['id']
            g.user_role = user['role']

            # get data from cache or db
            user_data = cache_manager.user_data_caching("user", "id", user['id'])
            
            g.user_name = user_data[0]['name']
            return func(*args, **kwargs)
        
        except Exception as error:
            return Response(str(error), status=401)
    return wrapper


def users_only(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            user = me()
            if not user:
                return Response("Invalid, expired or missing token", status=401)

            if user.get('role') not in ['client', 'administrator']:
                return Response("Access denied: only users allowed", status=403)
            
            # save data in g
            g.user_id = user['id']
            g.user_role = user['role']

            # get data from cache or db
            user_data = cache_manager.user_data_caching("user", "id", user['id'])
            
            g.user_name = user_data[0]['name']
            return func(*args, **kwargs)
        
        except Exception as error:
            return Response(str(error), status=401)
    return wrapper 

