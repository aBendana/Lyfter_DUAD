class RentalsRepository:
    
    def __init__(self, db_manager):
        self.db_manager = db_manager


    def _format_rental(self, rental_record):
        return {
            "id": rental_record[0],
            "car_id": rental_record[1],
            "user_id": rental_record[2],
            "rental_date": rental_record[3],
            "status": rental_record[4],
        }


    def create(self, rental_data):
        
        car_id = rental_data.get('car_id')
        user_id = rental_data.get('user_id')
        #rental_date = rental_data.get('rental_date')
        status = rental_data.get('status')

        # verifyng car and user exists
        car_exists = self.db_manager.execute_query("SELECT id FROM lyfter_car_rental.cars WHERE id = %s", (car_id,))
        if not car_exists:
            raise ValueError(f"There´s no car with car id: '{car_id}'")
        
        user_exists = self.db_manager.execute_query("SELECT id FROM lyfter_car_rental.users WHERE id = %s", (user_id,))
        if not user_exists:
            raise ValueError(f"There´s no user with user id: '{user_id}'")

        # verifying car is available and user is active
        car_status = self.db_manager.execute_query("SELECT status FROM lyfter_car_rental.cars WHERE id = %s", (car_id,))
        user_status = self.db_manager.execute_query("SELECT status FROM lyfter_car_rental.users WHERE id = %s", (user_id,))
        car_available = car_status[0][0]
        user_active = user_status[0][0]

        if car_available != "available":
            raise ValueError(f"Car {car_id} is not available at the moment")
        if user_active != "active":
            raise ValueError(f"User {user_id} is not active at the moment")

        try:
            self.db_manager.execute_query(
                "INSERT INTO lyfter_car_rental.car_rental (car_id, user_id, status) VALUES (%s, %s, %s)",
                (car_id, user_id, status),
            )
            # updating the status of the car, this is updated to 'rentend' or 'reserved' as same as the rental
            self.db_manager.execute_query(
                "UPDATE lyfter_car_rental.cars SET status = %s WHERE id = %s",
                (status, car_id),
            )
            print("Rental car saved successfully")
            return True
        
        except Exception as error:
            return Exception("Error saving a rental car into the database: ", error)
            


    def get_all(self):
        try:
            results = self.db_manager.execute_query(
                "SELECT id, car_id, user_id, rental_date, status FROM lyfter_car_rental.car_rental;"
            )
            formatted_results = [self._format_rental(result) for result in results]
            return formatted_results
        except Exception as error:
            print("Error getting all rentals from the database: ", error) 
            return False

    def get_by_query_parameter(self, column, _filter): 
    
        allowed_columns = ("car_id", "user_id", "status")
        if column not in allowed_columns:
            raise ValueError(f"there´s no rental with car_id, user_id or status: '{_filter}' by the moment")
        
        try:
            query = f"SELECT id, car_id, user_id, rental_date, status FROM lyfter_car_rental.car_rental WHERE {column} = %s"
            results = self.db_manager.execute_query(query, (_filter,))
            
            if not results:
                raise ValueError(f" {column}: '{_filter}' don't have any rentals")
            else:
                formatted_results = [self._format_rental(result) for result in results]
                return formatted_results

        except Exception as error:
            raise Exception(f"Database error: {error}")
        

    def get_by_path_parameter(self, column, parameter):
        
        allowed_column ='id'
        if column != allowed_column:
            raise ValueError(f"Column '{column}' is not allowed")

        try:
            query =  f"SELECT id, car_id, user_id, rental_date, status FROM lyfter_car_rental.car_rental WHERE {column} = %s;"
            results = self.db_manager.execute_query(query, (parameter,))

            if not results:
                raise ValueError(f" {column}: '{parameter}' does not exists")
            else:
                return self._format_rental(results[0])

        except Exception as error:
            raise Exception(f"Database error: {error}")


    def update(self, rental_data):
        
        _id = rental_data.get('id')
        car_id = rental_data.get('car_id')
        user_id = rental_data.get('user_id')
        rental_date = rental_data.get('rental_date')
        status = rental_data.get('status')

        try:
            self.db_manager.execute_query(
                "UPDATE lyfter_car_rental.car_rental SET (car_id, user_id, rental_date, status) = (%s, %s, %s, %s) WHERE id = %s",
                (car_id, user_id, rental_date, status, _id),
            )
            print("Rental car updated successfully")
            return True
        
        except Exception as error:
            return("Error updating a rental from the database: ", error)
            

    """"
    **this method ain't gonna be used in this homework**
    Keep car rentals info is a good practice (set status completed)
    Anyways if we want to delete a car rental.
    """
    def delete(self, _id):
        
        rental_id = self.db_manager.execute_query("SELECT id FROM lyfter_car_rental.cars WHERE id = %s", (_id,))
        if not rental_id:
            raise ValueError(f"Rental {_id} not exists in the data base.")
        
        try:              
            self.db_manager.execute_query("DELETE FROM lyfter_car_rental.car_rental WHERE id = (%s)", (_id,))
            print("Rental deleted successfully")
            return True
        except Exception as error:
            return("Error deleting a rental from the database: ", error)
        