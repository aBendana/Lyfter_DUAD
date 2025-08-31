from db_connection import DatabaseConnection
from orms_queries import QueryFunctions
from db_model import Contacts
from validations import Validations
# from data_users import user_data


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
contact_manager = QueryFunctions(engine, Contacts.__table__)
contact_validations = Validations()


class ContactsRepository:

    
    def __init__(self):
        pass


    def _format_contact(self, contact_record):
        print(type(contact_record), contact_record)
        return {
            "id": contact_record.id,
            "user_id": contact_record.user_id,
            "name": contact_record.name,
            "phone_number": contact_record.phone_number,
            "email": contact_record.email,
        }


    def insert_contact(self, user_id, role, contact_data):
        obligatory_info = [col for col in Contacts.__table__.columns.keys() if col not in ("id")]
        # avoid errors in the user_id saving
        if role == "cb_user":
            contact_validations.not_need_value(contact_data, "user_id")
            contact_data["user_id"] = user_id

        #validating the contact data
        contact_validations.not_need_value(contact_data, "id")
        complete_info = contact_validations.complete_info(contact_data, obligatory_info)
        if complete_info:
            result = contact_manager.single_insert(contact_data)
            return result


    def insert_many_contacts(self, user_id, role, contacts_list):
        obligatory_info = [col for col in Contacts.__table__.columns.keys() if col not in ("id")]
        # validating each contact data
        for contact_data in contacts_list:
            # avoid errors in the user_id saving
            if role == "cb_user":
                contact_validations.not_need_value(contact_data, "user_id")
                contact_data["user_id"] = user_id
            contact_validations.complete_info(contact_data, obligatory_info)
        #insert all new contacts
        contact_manager.multiple_inserts(contacts_list)


    def get_contacts(self, user_id, role):
        if role == "administrator":
            results = contact_manager.whole_table_select()
        elif role == "cb_user":
            results = contact_manager.single_select("user_id", user_id)
        else:
            raise ValueError("Invalid specified role")

        formatted_results = [self._format_contact(result) for result in results]
        return formatted_results


    def get_contact_by_value(self, role, user_id, column, value):
        valid_columns = Contacts.__table__.columns.keys()
        contact_validations.valid_columns(column, valid_columns)
        if role == "administrator":
            results = contact_manager.single_select(column, value)
        elif role == "cb_user":
            results = contact_manager.select_by_two_values("user_id", column, user_id, value)
        if not results:
            raise ValueError(f" '{value}' value is wrong")

        formatted_results = [self._format_contact(result) for result in results]
        return formatted_results
    

    def update_contact(self, user_id, role, search_col, search_value, column_modify, new_value):
        valid_search_columns = ["id", "email"]
        contact_validations.valid_columns(search_col, valid_search_columns)
        
        # verifying the value in the search column
        if role == "administrator":
            valid_value = contact_manager.single_select(search_col, search_value)
        elif role == "cb_user":
            valid_value = contact_manager.select_by_two_values("user_id", search_col, user_id, search_value)
        if not valid_value:
                raise ValueError(f"'{search_value}' value is wrong")

        valid_update_columns = ["name", "phone_number", "email"]
        contact_validations.valid_columns(column_modify, valid_update_columns)
        contact_manager.single_update(search_col, search_value, column_modify, new_value)


    def delete_contact(self, user_id, role, column, value):
        # verifying the chosen column
        valid_search_columns = ["id", "email"]
        contact_validations.valid_columns(column, valid_search_columns)

        if role == "administrator":
            valid_value = contact_manager.single_select(column, value)
        elif role == "cb_user":
            valid_value = contact_manager.select_by_two_values("user_id", column, user_id, value)
        if not valid_value:
            raise ValueError(f"{value} value is wrong")
        
        contact_manager.single_delete(column, value)