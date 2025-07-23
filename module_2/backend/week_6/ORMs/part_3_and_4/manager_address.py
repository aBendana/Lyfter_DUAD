from db_connection import db_connection
from orms_scripts import QueryFunctions
from db_models import Tables
from data_addresses import address_data, addresses_data_list, update_addresses_dict_list


engine = db_connection()
table = Tables()
address_table = table.addresses_table
address_manager = QueryFunctions(engine,address_table)


class AdressesManager:
    
    def __init__(self):
        pass


    def create_address(self, address_data):
        # we can add validations about province, canton or other attributes of the table
        # validations could be in other module with classes and different methods 
        # to control the data about addresses
        address_manager.single_insert(address_data)

    def create_addresses(self, data_list):
        address_manager.multiple_inserts(data_list)

    def get_addresses(self):    
        address_manager.whole_table_select()

    def get_address_by_value(self, column, value):
        address_manager.single_select(column, value)

    def update_address(self, column, value, column_modify, new_value):
        address_manager.single_update(column, value, column_modify, new_value)

    def update_many_addresses(self, column_modify, dict_list):
        address_manager.multiple_update(column_modify, dict_list)

    def delete_address(self, column, value):
        address_manager.single_delete(column, value)



# some example of use
address = AdressesManager()
address.create_address(address_data)
address.get_addresses()
address.get_address_by_value("id", 4)
address.update_many_addresses("address", update_addresses_dict_list)
address.delete_address("id", 1)