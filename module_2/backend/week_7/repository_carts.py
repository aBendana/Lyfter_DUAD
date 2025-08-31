from db_connection import DatabaseConnection
from orms_queries import QueryFunctions
from db_model import Carts
from validations import Validations
# from data_fruits import fruit_data


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
cart_manager = QueryFunctions(engine, Carts.__table__)
cart_validations = Validations()


class CartsRepository:
    
    def __init__(self):
        pass


    def _format_cart(self, cart_record):
        return {
            "id": cart_record.id,
            "user_id": cart_record.user_id,
            "status": cart_record.status.value
        }
    

    def new_cart(self, cart_data):

        # no need 'id', 'id' autogenerate (primary key)
        cart_validations.not_need_value(cart_data, "id")

        # obligatory info, no need 'id column'
        self.obligatory_info = ["user_id"]
        complete_info = cart_validations.complete_info(cart_data, self.obligatory_info)
        if complete_info:
            cart = cart_manager.single_insert(cart_data)
            print(cart)
            return cart


    def several_carts(self, carts_list):

        # set obligatory info, no need 'id column'
        self.obligatory_info = ["user_id"]
        for cart_data in carts_list:
            # no need 'id', 'id' autogenerate (primary key)
            cart_validations.not_need_value(cart_data, "id")
            cart_validations.complete_info(cart_data, self.obligatory_info)

        #insert all new invoices
        cart_manager.multiple_inserts(carts_list)


    def get_carts(self):     
        results = cart_manager.whole_table_select()
        formatted_results = [self._format_cart(result) for result in results]
        return formatted_results


    def get_cart_by_value(self, column, value):
        
        valid_columns = Carts.__table__.columns.keys() 
        try:
            cart_validations.valid_columns(column, valid_columns)
            results = cart_manager.single_select(column, value)
            if not results:
                    raise ValueError(f" '{value}' value, does not exists")
            else:
                formatted_results = [self._format_cart(result) for result in results]
                return formatted_results
        
        except: #Exception as error:
            raise #Exception(f"Database error: {error}")


    def get_cart_by_two_values(self, column_a, column_b, value_a, value_b):
        valid_columns = Carts.__table__.columns.keys() 
        try:
            cart_validations.valid_columns(column_a, valid_columns)
            cart_validations.valid_columns(column_b, valid_columns)
            results = cart_manager.select_by_two_values(column_a, column_b, value_a, value_b)
            formatted_results = [self._format_cart(result) for result in results]
            return formatted_results
        
        except: #Exception as error:
            raise #Exception(f"Database error: {error}")

    def update_cart(self, search_col, search_value, column_modify, new_value):

        # verifying the search column
        valid_search_columns = ["id", "user_id" ] 
        cart_validations.valid_columns(search_col, valid_search_columns)
        
        # verifying the value in the chosen column
        valid_value = cart_manager.single_select(search_col, search_value)
        if not valid_value:
            raise ValueError(f"{search_value} value not exists in {search_col}")

        valid_update_columns = ["status"]
        cart_validations.valid_columns(column_modify, valid_update_columns)
        cart_manager.single_update(search_col, search_value, column_modify, new_value)


    def update_many_invoice_details(self, column_modify, dict_list):

        # verifying the chosen column
        valid_update_columns = ["status"]
        cart_validations.valid_columns(column_modify, valid_update_columns)
        cart_manager.multiple_update(column_modify, dict_list)


    def delete_invoice_detail(self, search_col, value):

        # verifying the search column
        valid_search_columns = ["id", "user_id" ] 
        cart_validations.valid_columns(search_col, valid_search_columns)
        
        # verifying the value in the chosen column
        valid_value = cart_manager.single_select(search_col, value)
        if not valid_value:
            raise ValueError(f"{value} value not exists in {search_col}")

        cart_manager.single_delete(search_col, value)

