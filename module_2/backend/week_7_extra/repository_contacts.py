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


    def insert_contact(self, contact_data):
        obligatory_info = [col for col in Contacts.__table__.columns.keys() if col not in ("id")]
        #validating the contact data
        contact_validations.not_need_value(contact_data, "id")
        complete_info = contact_validations.complete_info(contact_data, obligatory_info)
        if complete_info:
            result = contact_manager.single_insert(contact_data)
            return result


    def insert_many_contacts(self, contacts_list):
        obligatory_info = [col for col in Contacts.__table__.columns.keys() if col not in ("id")]
        # validating each contact data
        for contact_data in contacts_list:
            contact_validations.not_need_value(contact_data, "id")
            contact_validations.complete_info(contact_data, obligatory_info)
        contact_manager.multiple_inserts(contacts_list)


    def admin_show_contacts(self):
        results = contact_manager.whole_table_select()
        formatted_results = [self._format_contact(result) for result in results]
        return formatted_results
    

    def cb_user_show_contacts(self, user_id):
        results = contact_manager.single_select("user_id", user_id)
        formatted_results = [self._format_contact(result) for result in results]
        return formatted_results


    def admin_get_contact_by_value(self, column, value):
        valid_columns = Contacts.__table__.columns.keys()
        contact_validations.valid_columns(column, valid_columns)
        results = contact_manager.single_select(column, value)
        contact_validations.valid_value(column, value, results)
        formatted_results = [self._format_contact(result) for result in results]
        return formatted_results
    

    def cb_user_get_contact_by_value(self, column_a, column_b, value_a, value_b):
        valid_columns = Contacts.__table__.columns.keys()
        contact_validations.valid_columns(column_a, valid_columns)
        contact_validations.valid_columns(column_b, valid_columns)
        results = contact_manager.select_by_two_values(column_a, column_b, value_a, value_b)
        contact_validations.valid_value(column_a, value_a, results)
        formatted_results = [self._format_contact(result) for result in results]
        return formatted_results


    def get_repeated_contact(self, column_a, column_b, value_a, value_b):
        valid_columns = ["user_id", "email", "phone_number"]
        contact_validations.valid_columns(column_a, valid_columns)
        contact_validations.valid_columns(column_b, valid_columns)
        results = contact_manager.select_by_two_values(column_a, column_b, value_a, value_b)
        formatted_results = [self._format_contact(result) for result in results]
        return formatted_results


    def update_contact(self, search_col, search_value, column_modify, new_value):
        valid_search_columns = ["id"]
        contact_validations.valid_columns(search_col, valid_search_columns)
        # valid_value = contact_manager.single_select(search_col, search_value)
        # contact_validations.valid_value(search_col, search_value, valid_value)
        valid_update_columns = ["name", "phone_number", "email"]
        contact_validations.valid_columns(column_modify, valid_update_columns)
        contact_manager.single_update(search_col, search_value, column_modify, new_value)


    def delete_contact(self, column, value):
        valid_search_columns = ["id"]
        contact_validations.valid_columns(column, valid_search_columns)
        valid_value = contact_manager.single_select(column, value)
        contact_validations.valid_value(column, value, valid_value)
        contact_manager.single_delete(column, value)