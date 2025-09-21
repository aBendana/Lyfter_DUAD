from db_connection import DatabaseConnection
from orms_queries import QueryFunctions
from db_model import Users
from validations import Validations


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
user_manager = QueryFunctions(engine, Users.__table__)
user_validations = Validations()


class UsersRepository:

    def __init__(self):
        pass

    # used in decorator_authenticator, return a global g.user_role
    def _format_user(self, user_record):
        return {
            "id": user_record.id,
            "name": user_record.name,
            "email": user_record.email,
            "password": user_record.password,
            "phone_number": user_record.phone_number,
            "role": user_record.role
        }

    # used in this repository and api for show-get users purposes
    def _get_format_user(self, user_record):
        return {
            "id": user_record.id,
            "name": user_record.name,
            "email": user_record.email,
            "password": user_record.password,
            "phone_number": user_record.phone_number,
            "role": user_record.role.value if hasattr(user_record.role, "value") else user_record.role
        }


    def insert_user_register(self, user_data):
        # no need 'id', 'id' autogenerate (primary key)
        user_validations.not_need_value(user_data, "id")
        user_validations.not_need_value(user_data, "role")

        # obligatory info, no need 'id column'
        obligatory_info = [col for col in Users.__table__.columns.keys() if col not in ("id", "role")]
        complete_info = user_validations.complete_info(user_data, obligatory_info)
        if complete_info:
            result = user_manager.single_insert_register(user_data)
            return result.fetchone()


    def insert_user(self, user_data):
        # no need 'id', 'id' autogenerate (primary key)
        user_validations.not_need_value(user_data, "id")
        obligatory_info = [col for col in Users.__table__.columns.keys() if col not in ("id")]
        complete_info = user_validations.complete_info(user_data, obligatory_info)
        if complete_info:
            result = user_manager.single_insert(user_data)
            return result


    def insert_many_users(self, users_list):

        # set obligatory info, no need 'id column'
        obligatory_info = [col for col in Users.__table__.columns.keys() if col not in ("id", "role")]
        for fruit_data in users_list:
            # no need 'id', 'id' autogenerate (primary key)
            user_validations.not_need_value(fruit_data, "id")
            user_validations.complete_info(fruit_data, obligatory_info)

        #insert all new users
        user_manager.multiple_inserts(users_list)


    def show_users(self):     
        results = user_manager.whole_table_select()
        formatted_results = [self._get_format_user(result) for result in results]
        return formatted_results
    

    # used in different apis
    def get_user_by_value_for_api(self, column, value):

        valid_columns = [col for col in Users.__table__.columns.keys() if col not in ("password")]
        user_validations.valid_columns(column, valid_columns)
        results = user_manager.single_select(column, value)
        user_validations.valid_value(column, value, results)
        formatted_results = [self._get_format_user(result) for result in results]
        return formatted_results


    # used in authenticator decorator
    def get_user_by_value(self, column, value):
        valid_columns = ["id", "email"]
        user_validations.valid_columns(column, valid_columns)
        results = user_manager.single_select(column, value)
        user_validations.valid_value(column, value, results)
        formatted_results = [self._format_user(result) for result in results]
        return formatted_results
    

    # used in login
    def get_user_by_value_login(self, column, value):
        valid_columns = ["id", "email"]
        user_validations.valid_columns(column, valid_columns)
        results = user_manager.single_select(column, value)
        formatted_results = [self._format_user(result) for result in results]
        return formatted_results


    # used in login
    def get_user_by_credentials(self, data, column_a, column_b, value_a, value_b):

        valid_columns = ["email", "password"]
        try:
            user_validations.complete_info(data, valid_columns)
            results = user_manager.select_by_two_values(column_a, column_b, value_a, value_b)
            if not results:
                return None #raise ValueError("Wrong credentials")
                
            else:
                formatted_results = [self._format_user(result) for result in results]
                #print(formatted_results)
                return formatted_results
        
        except: #Exception as error:
            raise 


    def update_user(self, search_col, search_value, column_modify, new_value):

        # verifying the search column
        valid_columns = ["id", "email"]
        user_validations.valid_columns(search_col, valid_columns)
        
        # verifying the value in the search column
        result = user_manager.single_select(search_col, search_value)
        user_validations.valid_value(search_col, search_value, result)
            
        valid_update_columns = ["email", "password", "phone_number"]    
        user_validations.valid_columns(column_modify, valid_update_columns)
        user_manager.single_update(search_col, search_value, column_modify, new_value)


    def delete_user(self, column, value): 

        # verifying the chosen column
        valid_columns = ["id", "email"]
        user_validations.valid_columns(column, valid_columns)

        result = user_manager.single_select(column, value)
        user_validations.valid_value(column, value, result)

        user_manager.single_delete(column, value)