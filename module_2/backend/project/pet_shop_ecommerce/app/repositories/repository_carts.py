from app.infrastructure.database.db_connection import DatabaseConnection
from app.utils.orms_queries import QueryFunctions
from app.infrastructure.database.db_model import Carts
from app.utils.validations import Validations


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
cart_manager = QueryFunctions(engine, Carts.__table__)
cart_validations = Validations()


class CartsRepository:

    def __init__(self):
        pass


    def _format_cart(self, cart_record):
        # print(type(cart_record), cart_record)
        return {
            "id": cart_record.id,
            "user_id": cart_record.user_id,
            "status": cart_record.status.value if hasattr(cart_record.status, "value") else cart_record.status
        }


    def new_cart(self, cart_data):
        #validating the cart data
        cart_validations.not_need_value(cart_data, "id")
        obligatory_info = [col for col in Carts.__table__.columns.keys() if col not in ("id", "status")]
        complete_info = cart_validations.complete_info(cart_data, obligatory_info)
        if complete_info:
            result = cart_manager.single_insert(cart_data)
            return result


    def insert_many_carts(self, carts_list):
        obligatory_info = [col for col in Carts.__table__.columns.keys() if col not in ("id", "status")]
        # validating each cart data
        for cart_data in carts_list:
            cart_validations.not_need_value(cart_data, "id")
            cart_validations.complete_info(cart_data, obligatory_info)
        #insert all new carts
        cart_manager.multiple_inserts(carts_list)


    def show_carts(self):
        results = cart_manager.whole_table_select()
        formatted_results = [self._format_cart(result) for result in results]
        return formatted_results


    def get_cart_by_value(self, column, value):
        valid_columns = Carts.__table__.columns.keys()
        cart_validations.valid_columns(column, valid_columns)

        results = cart_manager.single_select(column, value)
        cart_validations.valid_value(column, value, results)

        formatted_results = [self._format_cart(result) for result in results]
        return formatted_results
    
    
    def get_cart_by_two_values(self, column_a, column_b, value_a, value_b):
        valid_columns = Carts.__table__.columns.keys() 
        cart_validations.valid_columns(column_a, valid_columns)
        cart_validations.valid_columns(column_b, valid_columns)

        results = cart_manager.select_by_two_values(column_a, column_b, value_a, value_b)
        # cart_validations.valid_value(column_a, value_a, results)
        # cart_validations.valid_value(column_b, value_b, results)

        formatted_results = [self._format_cart(result) for result in results]
        return formatted_results


    def update_cart(self, search_col, search_value, column_modify, new_value):
        valid_search_columns = ["id"]
        cart_validations.valid_columns(search_col, valid_search_columns)

        result = cart_manager.single_select(search_col, search_value)
        cart_validations.valid_value(search_col, search_value, result)

        valid_update_columns = ["status"]
        cart_validations.valid_columns(column_modify, valid_update_columns)

        cart_manager.single_update(search_col, search_value, column_modify, new_value)
        return {column_modify:new_value}


    def delete_cart(self, column, value):
        valid_search_columns = ["id"]
        cart_validations.valid_columns(column, valid_search_columns)

        result = cart_manager.single_select(column, value)
        cart_validations.valid_value(column, value, result)
        
        cart_manager.single_delete(column, value)