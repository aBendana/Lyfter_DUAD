from db_connection import DatabaseConnection
from orms_queries import QueryFunctions
from db_model import FruitsInCart
from validations import Validations
# from data_fruits import fruit_data


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
fruit_in_c_manager = QueryFunctions(engine, FruitsInCart.__table__)
fruit_in_c_validations = Validations()


class FruitsInCartRepository:
    
    def __init__(self):
        pass


    def _format_fruit_in_cart(self, fruit_in_cart_record):
        from repository_fruits import FruitsRepository
        fruits_repo = FruitsRepository()
        fruit = fruits_repo.get_fruit_by_value("id", fruit_in_cart_record.fruit_id)
        return {
            "id": fruit_in_cart_record.id,
            "cart_id": fruit_in_cart_record.cart_id,
            "fruit_id": fruit_in_cart_record.fruit_id,
            "quantity": fruit_in_cart_record.quantity,
            "fruit_name": fruit[0]["name"] if fruit else None
        }
    

    def new_fruit_in_cart(self, fruit_in_cart_data):

        # no need 'id', 'id' autogenerate (primary key)
        fruit_in_c_validations.not_need_value(fruit_in_cart_data, "id")

        # obligatory info, no need 'id column'
        self.obligatory_info = FruitsInCart.__table__.columns.keys()
        self.obligatory_info.remove("id")
        complete_info = fruit_in_c_validations.complete_info(fruit_in_cart_data, self.obligatory_info)
        if complete_info:
            fruit_in_c_manager.single_insert(fruit_in_cart_data)


    def several_fruits_in_c(self, fruits_in_list):

        # set obligatory info, no need 'id column'
        self.obligatory_info = FruitsInCart.__table__.columns.keys()
        self.obligatory_info.remove("id")
        for fruits_in_data in fruits_in_list:
            # no need 'id', 'id' autogenerate (primary key)
            fruit_in_c_validations.not_need_value(fruits_in_data, "id")
            fruit_in_c_validations.complete_info(fruits_in_data, self.obligatory_info)

        #insert all new invoices
        fruit_in_c_manager.multiple_inserts(fruits_in_list)


    def get_fruits_in(self):     
        results = fruit_in_c_manager.whole_table_select()
        formatted_results = [self._format_fruit_in_cart(result) for result in results]
        return formatted_results


    def get_fruit_in_cart_by_value(self, column, value):

        valid_columns = ["id", "cart_id", "fruit_id"] 
        try:
            fruit_in_c_validations.valid_columns(column, valid_columns)
            results = fruit_in_c_manager.single_select(column, value)
            if not results:
                    raise ValueError(f" '{value}' value, does not exists")
            else:
                formatted_results = [self._format_fruit_in_cart(result) for result in results]
                return formatted_results
        
        except: #Exception as error:
            raise #Exception(f"Database error: {error}")


    def update_fruit_in_cart(self, search_col, search_value, column_modify, new_value):

        # verifying the search column
        valid_search_columns = ["id", "cart_id", "fruit_id" ] 
        fruit_in_c_validations.valid_columns(search_col, valid_search_columns)
        
        # verifying the value in the chosen column
        valid_value = fruit_in_c_manager.single_select(search_col, search_value)
        if not valid_value:
            raise ValueError(f"{search_value} value not exists in {search_col}")

        valid_update_columns = ["fruit_id", "quantity"]
        fruit_in_c_validations.valid_columns(column_modify, valid_update_columns)
        fruit_in_c_manager.single_update(search_col, search_value, column_modify, new_value)


    def update_fruit_in_cart_by_two_search_values(self, search_col_a, search_value_a, search_col_b, search_value_b, column_modify, new_value):
        
        # verifying the search columns
        valid_search_columns = ["cart_id", "fruit_id" ] 
        fruit_in_c_validations.valid_columns(search_col_a, valid_search_columns)
        fruit_in_c_validations.valid_columns(search_col_b, valid_search_columns)

        # verifying the values in the chosen columns
        valid_value_a = fruit_in_c_manager.single_select(search_col_a, search_value_a)
        valid_value_b = fruit_in_c_manager.single_select(search_col_b, search_value_b)
        if not valid_value_a:
            raise ValueError(f"{search_value_a} value not exists in {search_col_a}")
        if not valid_value_b:
            raise ValueError(f"{search_value_b} value not exists in {search_col_b}")

        valid_update_columns = ["fruit_id", "quantity"]
        fruit_in_c_validations.valid_columns(column_modify, valid_update_columns)
        fruit_in_c_manager.single_update_by_two_values(search_col_a, search_value_a, search_col_b, search_value_b, column_modify, new_value)


    def update_many_fruits_in_cart(self, column_modify, dict_list):

        # verifying the chosen column
        valid_update_columns = ["fruit_id", "quantity"]
        fruit_in_c_validations.valid_columns(column_modify, valid_update_columns)
        fruit_in_c_manager.multiple_update(column_modify, dict_list)


    def delete_fruit_in_cart(self, search_col, value):

        # verifying the search column
        valid_search_columns = ["id", "cart_id", "fruit_id" ] 
        fruit_in_c_validations.valid_columns(search_col, valid_search_columns)
        
        # verifying the value in the chosen column
        valid_value = fruit_in_c_manager.single_select(search_col, value)
        if not valid_value:
            raise ValueError(f"{value} value not exists in {search_col}")

        fruit_in_c_manager.single_delete(search_col, value)

