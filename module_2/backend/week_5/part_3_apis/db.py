import psycopg2


class PgManager:

    def __init__(self, db_name, user, password, host, port=5432):
        self.db_name= db_name
        self.user= user
        self.password = password
        self.host = host
        self.port = port
        
        self.connection = self.create_connection(db_name, user, password, host, port)
        if self.connection:
            self.cursor = self.connection.cursor()
            print("Connection created succesfully")
        

    def create_connection(self, db_name, user, password, host, port):
        try:
            connection = psycopg2.connect(
	            dbname=db_name,
	            user=user,
	            password=password,
	            host=host,
	            port=port,
            )
            return connection
        except Exception as error:
            print("Error connecting to the database:", error)
            return None


    def close_connection(self):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
        print("Connection closed")


    # method use for run queries
    # args when receive several parameters
    # def execute_query(self, query, *args):
    #     self.cursor.execute(query, args)
    #     self.connection.commit()

    #     # if query return data
    #     if self.cursor.description:
    #         results = self.cursor.fetchall()
    #         return results
        

    # method use for run queries
    # params in case receive a tuple, list or dictionary
    def execute_query(self, query, params=None):
            
        try:  
            self.cursor.execute(query, params or ())
            self.connection.commit()

            # if query return data
            if self.cursor.description:
                results = self.cursor.fetchall()
                return results
        
        # ROLLBACK after error to clean up transaction state
        except Exception as error:
            self.connection.rollback()
            print("Error:", error)
        