from db_connection import DatabaseConnection
from orms_queries import QueryFunctions
from db_model import Fruits
from validations import Validations
# from data_fruits import fruit_data


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
fruit_manager = QueryFunctions(engine, Fruits.__table__)
fruit_validations = Validations()


class FruitsRepository:
    
    def __init__(self):
        pass


    def _format_fruit(self, fruit_record):
        return {
            "id": fruit_record.id,
            "name": fruit_record.name,
            "price": fruit_record.price,
            "entry_date": fruit_record.entry_date.strftime('%d/%m/%Y'),
            "quantity": fruit_record.quantity,
        }
    

    def new_fruit(self, fruit_data):

        # no need 'id', 'id' autogenerate (primary key)
        fruit_validations.not_need_value(fruit_data, "id")

        # obligatory info, no need 'id column'
        self.obligatory_info = Fruits.__table__.columns.keys()
        self.obligatory_info.remove("id")
        complete_info = fruit_validations.complete_info(fruit_data, self.obligatory_info)
        if complete_info:
            fruit_manager.single_insert(fruit_data)


    def many_new_fruits(self, fruits_list):

        # set obligatory info, no need 'id column'
        self.obligatory_info = Fruits.__table__.columns.keys()
        self.obligatory_info.remove("id")
        for fruit_data in fruits_list:
            # no need 'id', 'id' autogenerate (primary key)
            fruit_validations.not_need_value(fruit_data, "id")
            fruit_validations.complete_info(fruit_data, self.obligatory_info)

        #insert all new fruits
        fruit_manager.multiple_inserts(fruits_list)


    def get_fruits(self):     
        results = fruit_manager.whole_table_select()
        formatted_results = [self._format_fruit(result) for result in results]
        return formatted_results


    def get_fruit_by_value(self, column, value):
        
        valid_columns = Fruits.__table__.columns.keys()

        try:
            if column not in valid_columns:
                raise ValueError(f" '{column}' column, does not exists")

            results = fruit_manager.single_select(column, value)
            if not results:
                    raise ValueError(f" '{value}' value, does not exists")
            else:
                formatted_results = [self._format_fruit(result) for result in results]
                return formatted_results
        
        except: #Exception as error:
            raise #Exception(f"Database error: {error}")


    def update_fruit(self, search_column, search_value, column_modify, new_value):

        # verifying the chosen column
        valid_columns = ["id","name"]
        if search_column not in valid_columns:
            raise ValueError(f"{search_column} column is not valid")
        
        # verifying the value in the chosen column
        valid_value = fruit_manager.single_select(search_column, search_value)
        if not valid_value:
            raise ValueError(f"{search_value} value not exists in {search_column}")
            
        valid_update_columns = ["price", "entry_date", "quantity"]    
        fruit_validations.valid_columns(column_modify, valid_update_columns)
        fruit_manager.single_update(search_column, search_value, column_modify, new_value)


    def update_many_fruits(self, column_modify, dict_list):

        # verifying the chosen column
        valid_columns = ["price", "entry_date", "quantity"]
        if column_modify not in valid_columns:
            raise ValueError(f"{column_modify} column doesn't allow modifications or not exists")

        fruit_manager.multiple_update(column_modify, dict_list)


    def delete_fruit(self, column, value):

        # verifying the chosen column
        valid_columns = ["id","name"]
        if column not in valid_columns:
            raise ValueError(f"{column} column is not valid")
        
        # verifying the value in the chosen column
        valid_value = fruit_manager.single_select(column, value)
        if not valid_value:
            raise ValueError(f"{value} value not exists in {column}")

        fruit_manager.single_delete(column, value)


# fruit = FruitsRepository()
# fruit.new_fruit(fruit_data)
