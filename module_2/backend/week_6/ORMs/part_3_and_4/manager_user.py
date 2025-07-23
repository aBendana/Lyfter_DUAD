from db_connection import db_connection
from orms_scripts import QueryFunctions
from db_models import Tables
from data_users import user_data, users_data_list, update_users_dict_list
from datetime import date


engine = db_connection()
table = Tables()
user_table = table.users_table
user_manager = QueryFunctions(engine, user_table)


class UsersManager:
    
    def __init__(self):
        pass


    def create_user(self, user_data):
        # we can add validations about email, birth_date or other attributes of the table
        # validations could be in other module with classes and different methods 
        # to control the data about users
        user_manager.single_insert(user_data)

    def create_users(self, data_list):
        user_manager.multiple_inserts(data_list)

    def get_users(self):    
        user_manager.whole_table_select()

    def get_user_by_value(self, column, value):
        user_manager.single_select(column, value)

    def update_user(self, column, value, column_modify, new_value):
        user_manager.single_update(column, value, column_modify, new_value)

    def update_many_users(self, column_modify, dict_list):
        user_manager.multiple_update(column_modify, dict_list)

    def delete_address(self, column, value):
        user_manager.single_delete(column, value)



# some example of use
user = UsersManager()
user.create_user(user_data)
user.create_users(users_data_list)
user.get_users()
user.get_user_by_value("id", 4)
user.update_user("id", 14, "birth_date", date(1900,9,9))
user.update_many_users("phone_number", update_users_dict_list)
user.delete_address("id", 1)