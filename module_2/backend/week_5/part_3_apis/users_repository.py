class UsersRepository:
    
    def __init__(self, db_manager):
        self.db_manager = db_manager


    def _format_user(self, user_record):
        return {
            "id": user_record[0],
            "user_name": user_record[1],
            "email": user_record[2],
            "password": user_record[3],
            "birth_date": user_record[4],
            "status": user_record[5],
        }


    def create(self, user_data):
        
        user_name = user_data.get('user_name')
        email = user_data.get('email')
        password = user_data.get('password')
        birth_date = user_data.get('birth_date')
        status = user_data.get('status')
    
        # no repeat email  in db   
        user_id = self.db_manager.execute_query("SELECT id FROM lyfter_car_rental.users WHERE email = %s", (email,))
        if user_id:
            raise ValueError(f"User {user_id} already {email} email, emails repeat it not allowed .")

        try:
            #print(user_name, email, password, birth_date, status)
            self.db_manager.execute_query(
                "INSERT INTO lyfter_car_rental.users (user_name, email, password, birth_date, status) VALUES (%s, %s, %s, %s, %s)",
                (user_name, email, password, birth_date, status),
            )
            print("User saved successfully")
            return True
        
        except Exception as error:
            return Exception("Error saving a user into the database: ", error)
            


    def get_all(self):
        try:
            results = self.db_manager.execute_query(
                "SELECT id, user_name, email, password, birth_date, status FROM lyfter_car_rental.users;"
            )
            formatted_results = [self._format_user(result) for result in results]
            return formatted_results
        except Exception as error:
            print("Error getting all users from the database: ", error)
            return False


    def get_by_query_parameter(self, _filter):
        
        try:
            results = self.db_manager.execute_query(
                "SELECT id, user_name, email, password, birth_date, status FROM lyfter_car_rental.users WHERE status = %s;",(_filter,),)
            
            if not results:
                raise ValueError(f"there no user with status: '{_filter}' by the moment")
            else:
                formatted_results = [self._format_user(result) for result in results]
                return formatted_results

        except Exception as error:
            raise Exception(f"Database error: {error}")
        

    def get_by_path_parameter(self, column, parameter):
        
        allowed_columns = ['id', 'user_name', 'email']
        if column not in allowed_columns:
            raise ValueError(f"Column '{column}' is not allowed")

        try:
            query =  f"SELECT id, user_name, email, password, birth_date, status FROM lyfter_car_rental.users WHERE {column} = %s;"
            results = self.db_manager.execute_query(query, (parameter,))

            if not results:
                raise ValueError(f" {column}: '{parameter}' does not exists")
            else:
                return self._format_user(results[0])

        except Exception as error:
            raise Exception(f"Database error: {error}")


    def update(self, user_data):
        
        _id = user_data.get('id')
        user_name = user_data.get('user_name')
        email = user_data.get('email')
        password = user_data.get('password')
        birth_date = user_data.get('birth_date')
        status = user_data.get('status')
    
        # no repeat email  in db   
        user_id = self.db_manager.execute_query("SELECT id FROM lyfter_car_rental.users WHERE id != %s AND email = %s", (_id, email,))
        if user_id:
            raise ValueError(f"User {user_id} already using {email} email, emails repeat it not allowed.")
        
        try:
            #print(user_name, email, password, birth_date, status)
            self.db_manager.execute_query(
                "UPDATE lyfter_car_rental.users SET (user_name, email, password, birth_date, status) = (%s, %s, %s, %s, %s) WHERE id = %s",
                (user_name, email, password, birth_date, status, _id),
            )
            print("User updated successfully")
            return True
        
        except Exception as error:
            return("Error updating a user from the database: ", error)
            

    """"
    **this method ain't gonna be used in this homework**
    Users should never be deleted, we can change their status to                    
    blocked or suspended, we should keep record of all their data and transactions 
    Anyways if we want to delete a user, we should delete all his records, in this case: 
    delete first transactions made in car_rental table and the status of the rental(s)  
    should be 'completed' and then delete the user in users table.
    """
    def delete(self, _id):
        
        user_id = self.db_manager.execute_query("SELECT id FROM lyfter_car_rental.users WHERE id = %s", (_id,))
        if not user_id:
            raise ValueError(f"User {_id} not exists in the data base.")
        
        # verify if user has any rental
        user_rental = self.db_manager.execute_query("SELECT id FROM lyfter_car_rental.car_rental WHERE user_id = %s", (_id,))
        if user_rental:
            # verify if user has uncompleted rental(s)
            rental_not_completed = self.db_manager.execute_query("SELECT id FROM lyfter_car_rental.car_rental WHERE user_id != %s AND status != %s", (_id, 'completed',))
            if rental_not_completed:
                raise ValueError(f"User {_id} still have uncompleted rental(s).")
        
        try:              
            self.db_manager.execute_query("DELETE FROM lyfter_car_rental.car_rental WHERE user_id = (%s)", (_id,))
            self.db_manager.execute_query("DELETE FROM lyfter_car_rental.users WHERE id = (%s)", (_id,))
            print("User deleted successfully")
            return True
        except Exception as error:
            return("Error deleting a user from the database: ", error)
        
                