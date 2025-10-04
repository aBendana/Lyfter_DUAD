from sqlalchemy import create_engine


class DatabaseConnection:
    
    def __init__(self, uri='PLACEHOLDER'):
        self.uri = uri
        self.engine = create_engine(self.uri, echo=True)

    
    def db_connection(self):

        try:
            connection = self.engine.connect()
            print("Connection successful!")
            connection.close()
        except Exception as e:
            print("Connection failed:", e)


    def get_engine(self):
        return self.engine