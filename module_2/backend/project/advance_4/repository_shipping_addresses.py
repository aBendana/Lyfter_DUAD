from db_connection import DatabaseConnection
from orms_queries import QueryFunctions
from db_model import ShippingAddresses
from validations import Validations


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
address_manager = QueryFunctions(engine, ShippingAddresses.__table__)
address_validations = Validations()


class AddressesRepository:

    
    def __init__(self):
        pass


    def _format_address(self, address_record):
        print(type(address_record), address_record)
        return {
            "id": address_record.id,
            "user_id": address_record.user_id,
            "address": address_record.address,
            "canton": address_record.canton,
            "province": address_record.province.value if hasattr(address_record.province, "value") else address_record.province,
            "postal_code": address_record.postal_code
        }


    def insert_address(self, address_data):
        obligatory_info = [col for col in ShippingAddresses.__table__.columns.keys() if col not in ("id")]
        #validating the address data
        address_validations.not_need_value(address_data, "id")
        complete_info = address_validations.complete_info(address_data, obligatory_info)
        if complete_info:
            result = address_manager.single_insert(address_data)
            return result


    def insert_many_addresses(self, addresses_list):
        obligatory_info = [col for col in ShippingAddresses.__table__.columns.keys() if col not in ("id")]
        # validating each address data
        for address_data in addresses_list:
            address_validations.not_need_value(address_data, "id")
            address_validations.complete_info(address_data, obligatory_info)
        #insert all new addresses
        address_manager.multiple_inserts(addresses_list)


    def show_addresses(self, user_id):
        results = address_manager.single_select("user_id", user_id)
        formatted_results = [self._format_address(result) for result in results]
        return formatted_results


    def get_address_by_value(self, column_a, column_b, value_a, value_b):
        valid_columns =["id", "user_id"]
        address_validations.valid_columns(column_a, valid_columns)
        address_validations.valid_columns(column_b, valid_columns)
        results = address_manager.select_by_two_values(column_a, column_b, value_a, value_b)
        address_validations.valid_value(column_a, value_a, results)
        formatted_results = [self._format_address(result) for result in results]
        return formatted_results
    
    
    def get_address_by_two_values(self, column_a, column_b, value_a, value_b):
        valid_columns =["id", "user_id"]
        address_validations.valid_columns(column_a, valid_columns)
        address_validations.valid_columns(column_b, valid_columns)
        results = address_manager.select_by_two_values(column_a, column_b, value_a, value_b)
        address_validations.valid_value(column_a, value_a, results)
        formatted_results = [self._format_address(result) for result in results]
        return formatted_results


    def update_address(self, search_col, search_value, column_modify, new_value):
        valid_search_columns = ["id"]
        address_validations.valid_columns(search_col, valid_search_columns)
        # result = address_manager.single_select(search_col, search_value)
        # address_validations.valid_value(search_col, search_value, result)
        valid_update_columns = [col for col in ShippingAddresses.__table__.columns.keys() 
                        if col not in ("id", "user_id")]
        address_validations.valid_columns(column_modify, valid_update_columns)
        address_manager.single_update(search_col, search_value, column_modify, new_value)


    def delete_address(self, column, value):
        valid_search_columns = ["id"]
        address_validations.valid_columns(column, valid_search_columns)

        result = address_manager.single_select(column, value)
        address_validations.valid_value(column, value, result)

        address_manager.single_delete(column, value)
