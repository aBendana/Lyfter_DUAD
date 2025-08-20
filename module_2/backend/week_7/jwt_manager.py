# import jwt


# class JWT_Manager:
#     def __init__(self, secret, algorithm):
#         self.secret = secret
#         self.algorithm = algorithm

#     def encode(self, data):
#         try:
#             encoded = jwt.encode(data, self.secret, algorithm=self.algorithm)
#             return encoded
#         except:
#             return None

#     def decode(self, token):
#         try:
#             decoded = jwt.decode(token, self.secret, algorithms=[self.algorithm])
#             return decoded
#         except Exception as e:
#             print(e)
#             return None
        


import jwt
import enum
from datetime import datetime, timedelta

class JWT_Manager:

    def __init__(self, secret, algorithm):
        self.secret = secret
        self.algorithm = algorithm
        with open('week_7/private_key.pem', 'rb') as f:
            self.private_key = f.read()
        with open('week_7/public_key.pem', 'rb') as f:
            self.public_key = f.read()


    def encode(self, data:dict, expires_in=7200):
        
        try:
            # Convert the original data (dictionary that could have Enum values) 
            # to a new dictionary that makes JWT works properly.
            # Users table use Enum for rol (Rol_Type) and for cart status(Status_Type)
            serializable_data = {
            key: value.value if isinstance(value, enum.Enum) else value
            for key, value in data.items()
        }

            serializable_data.update({
                'iss': self.secret,
                'exp': datetime.utcnow() + timedelta(seconds=expires_in),
                'iat': datetime.utcnow()
            })
            token = jwt.encode(serializable_data, self.private_key, algorithm=self.algorithm)
            return token
        
        except Exception as e:
            print(f"JWT encode error: {e}")
            return None
        

    def decode(self, token:str):
        try:
            decoded = jwt.decode(token, self.public_key, algorithms=[self.algorithm])
            return decoded
        except jwt.PyJWTError as e:
            print(f"Invalid Token: {e}")
            return None
