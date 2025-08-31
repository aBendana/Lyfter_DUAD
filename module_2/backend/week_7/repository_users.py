from db_connection import DatabaseConnection
from orms_queries import QueryFunctions
from db_model import Users
from validations import Validations
# from data_users import user_data


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
user_manager = QueryFunctions(engine, Users.__table__)
user_validations = Validations()


class UsersRepository:

    
    def __init__(self):
        pass

    # used in decorator_authenticatorm, return a global g.user_role
    def _format_user(self, user_record):
        return {
            "id": user_record.id,
            "name": user_record.name,
            "email": user_record.email,
            "password": user_record.password,
            "rol": user_record.rol
        }

    # used in this repository and api for show-get users purposes
    def _get_format_user(self, user_record):
        return {
            "id": user_record.id,
            "name": user_record.name,
            "email": user_record.email,
            "password": user_record.password,
            "rol": user_record.rol.value if hasattr(user_record.rol, "value") else user_record.rol
        }


    def insert_user_register(self, user_data):
        # no need 'id', 'id' autogenerate (primary key)
        user_validations.not_need_value(user_data, "id")
        user_validations.not_need_value(user_data, "rol")

        # obligatory info, no need 'id column'
        self.obligatory_info = [col for col in Users.__table__.columns.keys() if col not in ("id", "rol")]
        complete_info = user_validations.complete_info(user_data, self.obligatory_info)
        if complete_info:
            result = user_manager.single_insert_register(user_data)
            return result.fetchone()


    def insert_user(self, user_data):
        # no need 'id', 'id' autogenerate (primary key)
        user_validations.not_need_value(user_data, "id")

        # obligatory info, no need 'id column'
        self.obligatory_info = [col for col in Users.__table__.columns.keys() if col not in ("id")]
        complete_info = user_validations.complete_info(user_data, self.obligatory_info)
        if complete_info:
            result = user_manager.single_insert(user_data)
            return result


    def insert_many_users(self, users_list):

        # set obligatory info, no need 'id column'
        self.obligatory_info = [col for col in Users.__table__.columns.keys() if col not in ("id", "rol")]
        for fruit_data in users_list:
            # no need 'id', 'id' autogenerate (primary key)
            user_validations.not_need_value(fruit_data, "id")
            user_validations.complete_info(fruit_data, self.obligatory_info)

        #insert all new users
        user_manager.multiple_inserts(users_list)


    def get_users(self):     
        results = user_manager.whole_table_select()
        formatted_results = [self._get_format_user(result) for result in results]
        return formatted_results
    

    def get_user_by_value_for_api(self, column, value):

        valid_columns = Users.__table__.columns.keys()
        valid_columns.remove("password")

        try:
            if column not in valid_columns:
                raise ValueError(f" '{column}' column, does not exists")

            results = user_manager.single_select(column, value)
            print(results)
            if not results:
                raise ValueError(f" '{value}' value, does not exists")

            formatted_results = [self._get_format_user(result) for result in results]
            return formatted_results

        except:  # Exception as error:
            raise  # Exception(f"Database error: {error}")


    def get_user_by_value(self, column, value):

        valid_columns = ["id", "email"]
        try:
            if column not in valid_columns:
                raise ValueError(f" '{column}' column, does not exists")

            results = user_manager.single_select(column, value)
            print(results)
            if not results:
                    raise ValueError(f" '{value}' value, does not exists")
            else:
                # formatted_results = self._format_user(results)
                formatted_results = [self._format_user(result) for result in results]
                return formatted_results
        
        except: #Exception as error:
            raise #Exception(f"Database error: {error}")


    def get_user_by_credentials(self, data, column_a, column_b, value_a, value_b):

        self.valid_columns = ["email", "password"]
        try:
            user_validations.complete_info(data, self.valid_columns)
            results = user_manager.select_by_two_values(column_a, column_b, value_a, value_b)
            if not results:
                raise ValueError(f"Wrong credentials")
                
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
        valid_value = user_manager.single_select(search_col, search_value)
        if not valid_value:
            raise ValueError(f"{search_value} value not exists in {search_col}")
            
        valid_update_columns = ["email", "password"]    
        user_validations.valid_columns(column_modify, valid_update_columns)
        user_manager.single_update(search_col, search_value, column_modify, new_value)


    def update_many_users(self, column_modify, dict_list):

        # verifying the chosen column
        valid_udpate_columns = Users.__table__.columns.keys()
        valid_udpate_columns.remove("id")
        user_validations.valid_columns(column_modify, valid_udpate_columns)
        user_manager.multiple_update(column_modify, dict_list)


    def delete_user(self, column, value):

        # verifying the chosen column
        valid_columns = ["id", "email"]
        if column not in valid_columns:
            raise ValueError(f"{column} column is not valid")
        
        # verifying the value in the chosen column
        valid_value = user_manager.single_select(column, value)
        if not valid_value:
            raise ValueError(f"{value} value not exists in {column}")

        user_manager.single_delete(column, value)
