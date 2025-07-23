from db_connection import db_connection
from orms_scripts import QueryFunctions
from db_models import Tables
from data_cars import car_data, cars_data_list, update_car_dict_list


engine = db_connection()
table = Tables()
car_table = table.cars_table
car_manager = QueryFunctions(engine, car_table)


class CarsManager:
    
    def __init__(self):
        pass


    def create_car(self, car_data):
        # we can add validations about maker, models or any other attributes of the table
        # validations could be in other module with classes and different methods 
        # to control the data about cars
        car_manager.single_insert(car_data)

    def create_cars(self, cars_data_list):
        car_manager.multiple_inserts(cars_data_list)

    def get_cars(self):    
        car_manager.whole_table_select()

    def get_car_by_value(self, column, value):
        car_manager.single_select(column, value)

    def update_car(self, column, value, column_modify, new_value):
        car_manager.single_update(column, value, column_modify, new_value)

    def update_many_cars(self, column_modify, dict_list):
        car_manager.multiple_update(column_modify, dict_list)

    def delete_car(self, column, value):
        car_manager.single_delete(column, value)



# some example of use
car = CarsManager()
car.create_car(car_data)
car.get_car_by_value("id", 4)
car.update_many_cars("year", update_car_dict_list)
car.delete_car("id", 20)