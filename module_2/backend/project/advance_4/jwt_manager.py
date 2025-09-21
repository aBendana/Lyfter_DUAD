import jwt
import enum
from datetime import datetime, timedelta

class JWT_Manager:

    def __init__(self, secret, algorithm):
        self.secret = secret
        self.algorithm = algorithm
        self.path_private_key = "E:\\Studies\\Lyfter\\Module_2\\Backend\\project\\advance_4\\private_key.pem"
        self.path_public_key = "E:\\Studies\\Lyfter\\Module_2\\Backend\\project\\advance_4\\public_key.pem"
        with open(self.path_private_key, 'rb') as f:
            self.private_key = f.read()
        with open(self.path_public_key, 'rb') as f:
            self.public_key = f.read()


    # token expiration time 15 minutes
    def encode(self, data:dict, expires_in=900, is_refresh=False):
        
        try:
            # Convert the original data (dictionary that could have Enum values) 
            # to a new dictionary that makes JWT works properly.
            # This project have RoleType, SpeciesType, ProvinceType, ShippingMethodType, PaymentMethodType and StatusType
            serializable_data = {
            key: value.value if isinstance(value, enum.Enum) else value
            for key, value in data.items()
        }

            serializable_data.update({
                'iss': self.secret,
                'exp': datetime.utcnow() + timedelta(seconds=expires_in),
                'iat': datetime.utcnow(),
                'type': 'refresh' if is_refresh else 'access' # type is used to differentiate between access and refresh tokens
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
