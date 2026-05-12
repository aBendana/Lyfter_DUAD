import os
from sqlalchemy import create_engine
from dotenv import load_dotenv

# Load environment variables - path relative to this file, works from any cwd
_env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../../dbs.env")
load_dotenv(dotenv_path=_env_path)

class DatabaseConnection:
    
    def __init__(self):
        uri = os.getenv("DATABASE_URI")
        if not uri:
            raise ValueError("DATABASE_URI not set in environment variables")
        self.engine = create_engine(uri, echo=True)

    
    def db_connection(self):

        try:
            connection = self.engine.connect()
            print("Connection successful!")
            connection.close()
        except Exception as e:
            print("Connection failed:", e)


    def get_engine(self):
        return self.engine