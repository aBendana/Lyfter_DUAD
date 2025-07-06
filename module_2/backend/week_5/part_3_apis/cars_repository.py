class CarsRepository:
    
    def __init__(self, db_manager):
        self.db_manager = db_manager


    def _format_car(self, car_record):
        return {
            "id": car_record[0],
            "make": car_record[1],
            "model": car_record[2],
            "year": car_record[3],
            "status": car_record[4],
        }


    def create(self, car_data):
        
        make = car_data.get('make')
        model = car_data.get('model')
        year = car_data.get('year')
        status = car_data.get('status')

        try:
            self.db_manager.execute_query(
                "INSERT INTO lyfter_car_rental.cars (make, model, year, status) VALUES (%s, %s, %s, %s)",
                (make, model, year, status),
            )
            print("Car saved successfully")
            return True
        
        except Exception as error:
            return Exception("Error saving a car into the database: ", error)
            


    def get_all(self):
        try:
            results = self.db_manager.execute_query(
                "SELECT id, make, model, year, status FROM lyfter_car_rental.cars;"
            )
            formatted_results = [self._format_car(result) for result in results]
            return formatted_results
        except Exception as error:
            print("Error getting all cars from the database: ", error) 
            return False

    def get_by_query_parameter(self,condition, _filter): 
    
        allowed_columns = ("make", "model", "year", "status")
        if condition not in allowed_columns:
            raise ValueError(f"there´s no car with make, model, status or year: '{_filter}' by the moment")
        
        try:
            query = f"SELECT id, make, model, year, status FROM lyfter_car_rental.cars WHERE {condition} = %s"
            results = self.db_manager.execute_query(query, (_filter,))
            
            if not results:
                raise ValueError(f" {condition}: '{_filter}' does not exists")
            else:
                formatted_results = [self._format_car(result) for result in results]
                return formatted_results

        except Exception as error:
            raise Exception(f"Database error: {error}")
        

    def get_by_path_parameter(self, column, parameter):
        
        allowed_column ='id'
        if column != allowed_column:
            raise ValueError(f"Column '{column}' is not allowed")

        try:
            query =  f"SELECT id, make, model, year, status FROM lyfter_car_rental.cars WHERE {column} = %s;"
            results = self.db_manager.execute_query(query, (parameter,))

            if not results:
                raise ValueError(f" {column}: '{parameter}' does not exists")
            else:
                return self._format_car(results[0])

        except Exception as error:
            raise Exception(f"Database error: {error}")


    def update(self, car_data):
        
        _id = car_data.get('id')
        make = car_data.get('make')
        model = car_data.get('model')
        year = car_data.get('year')
        status = car_data.get('status')

        try:
            self.db_manager.execute_query(
                "UPDATE lyfter_car_rental.cars SET (make, model, year, status) = (%s, %s, %s, %s) WHERE id = %s",
                (make, model, year, status, _id),
            )
            print("Car updated successfully")
            return True
        
        except Exception as error:
            return("Error updating a car from the database: ", error)
            

    """"
    **this method ain't gonna be used in this homework**
    Cars should never be deleted, we can change their status to                    
    out of use, we should keep record of all their data.
    Anyways if we want to delete a car, we should delete all his records, in this case: 
    delete first transactions made in car_rental table and the status of the rental(s)  
    should be 'completed' and then delete the car in cars table.
    """
    def delete(self, _id):
        
        car_id = self.db_manager.execute_query("SELECT id FROM lyfter_car_rental.cars WHERE id = %s", (_id,))
        if not car_id:
            raise ValueError(f"Car {_id} not exists in the data base.")
        
        # verify if user has any rental
        car_rental = self.db_manager.execute_query("SELECT id FROM lyfter_car_rental.car_rental WHERE car_id = %s", (_id,))
        if car_rental:
            # verify if car has uncompleted rental(s)
            rental_not_completed = self.db_manager.execute_query("SELECT id FROM lyfter_car_rental.car_rental WHERE car_id != %s AND status != %s", (_id, 'completed',))
            if rental_not_completed:
                raise ValueError(f"Car {_id} still have uncompleted rental(s).")
        
        try:              
            self.db_manager.execute_query("DELETE FROM lyfter_car_rental.car_rental WHERE car_id = (%s)", (_id,))
            self.db_manager.execute_query("DELETE FROM lyfter_car_rental.cars WHERE id = (%s)", (_id,))
            print("Car deleted successfully")
            return True
        except Exception as error:
            return("Error deleting a car from the database: ", error)
        
                