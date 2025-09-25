from db_connection import DatabaseConnection
from orms_queries import QueryFunctions
from db_model import LoginHistory
from repository_users import UsersRepository
from validations import Validations
from random import randint


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
login_manager = QueryFunctions(engine, LoginHistory.__table__)
users_repo = UsersRepository()
login_validations = Validations()


class LoginHistoryRepository:

    def __init__(self):
        pass


    def _format_login(self, login_record):
        print(type(login_record), login_record)
        return {
            "id": login_record.id,
            "user_id": login_record.user_id,
            "login_timestamp": login_record.login_timestamp,
            "ip_address": login_record.ip_address,
            "login_status": login_record.login_status.value if hasattr(login_record.login_status, "value") else login_record.login_status
        }


    def insert_login_history(self, login_data):
        obligatory_info = [col for col in LoginHistory.__table__.columns.keys() if col not in ("id", "login_timestamp")]
        #validating the login data
        login_validations.not_need_value(login_data, "id")
        complete_info = login_validations.complete_info(login_data, obligatory_info)
        if complete_info:
            result = login_manager.single_insert(login_data)
            return result
        

    def _random_ip_address(self):
        ip_address = ""
        for _ in range(4):
            octet = str(randint(1, 255))
            ip_address += octet + "."
        return ip_address[:-1]
    

    def login_status_verification(self, user_id, successful):
        if user_id == 1001 and successful == False:
            login_data = {
                "user_id": user_id, # assuming a non-existing user_id for failed login attempts
                "ip_address": self._random_ip_address(),
                "login_status": "failed"
            }
            self.insert_login_history(login_data)
            raise ValueError("Wrong credentials, email or password is incorrect")

        elif user_id != 1001 and successful == False:
            login_data = {
                "user_id": user_id,
                "ip_address": self._random_ip_address(),
                "login_status": "failed"
            }
            self.insert_login_history(login_data)
            raise ValueError("Wrong password")
        
        elif user_id != 1001 and successful:
            login_data = {
                "user_id": user_id,
                "ip_address": self._random_ip_address(),
                "login_status": "successful"
            }
            self.insert_login_history(login_data)


    def get_login_history(self):
        results = login_manager.whole_table_select()
        formatted_results = [self._format_login(result) for result in results]
        return formatted_results


    def get_login_history_by_value(self, column, value):
        valid_columns = [col for col in LoginHistory.__table__.columns.keys() if col not in ("login_timestamp")]
        login_validations.valid_columns(column, valid_columns)
        results = login_manager.single_select(column, value)
        if not results:
            raise ValueError(f" '{value}' value is wrong")
        
        # adding the name and role of the user in login history
        formatted_results = []
        for result in results:
            formatted_result = self._format_login(result)
            user_id = formatted_result["user_id"]
            formatted_result["user_name"] = users_repo.get_user_by_value_for_api("id", user_id)[0]["name"]
            formatted_result["role"] = users_repo.get_user_by_value_for_api("id", user_id)[0]["role"]
            formatted_results.append(formatted_result)
        #formatted_results = [self._format_login(result) for result in results]
        return formatted_results
    

    def delete_login_history(self, column, value):
        # verifying the chosen column
        valid_search_columns = ["id"]
        login_validations.valid_columns(column, valid_search_columns)

        valid_value = login_manager.single_select(column, value)
        if not valid_value:
            raise ValueError(f"{value} value is wrong")
        
        login_manager.single_delete(column, value)