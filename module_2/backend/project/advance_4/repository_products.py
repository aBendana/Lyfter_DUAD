from db_connection import DatabaseConnection
from orms_queries import QueryFunctions
from db_model import Products
from validations import Validations


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
product_manager = QueryFunctions(engine, Products.__table__)
product_validations = Validations()


class ProductsRepository:

    
    def __init__(self):
        pass


    def _format_product(self, product_record):
        print(type(product_record), product_record)
        return {
            "id": product_record.id,
            "SKU": product_record.SKU,
            "name": product_record.name,
            "description": product_record.description,
            "target_species": product_record.target_species.value if hasattr(product_record.target_species, "value") else product_record.target_species,
            "supplier": product_record.supplier,
            "stock": product_record.stock,
            "cost": product_record.cost,
            "price": product_record.price,
        }


    def insert_product(self, product_data):
        #validating the product data
        product_validations.not_need_value(product_data, "id")
        obligatory_info = [col for col in Products.__table__.columns.keys() if col not in ("id")]
        complete_info = product_validations.complete_info(product_data, obligatory_info)
        if complete_info:
            result = product_manager.single_insert(product_data)
            return result


    def insert_many_products(self, products_list):
        obligatory_info = [col for col in Products.__table__.columns.keys() if col not in ("id")]
        # validating each product data
        for product_data in products_list:
            product_validations.complete_info(product_data, obligatory_info)
        #insert all new products
        product_manager.multiple_inserts(products_list)


    def show_products(self):
        results = product_manager.whole_table_select()
        formatted_results = [self._format_product(result) for result in results]
        return formatted_results


    def get_product_by_value(self, column, value):
        valid_columns =[col for col in Products.__table__.columns.keys() 
                        if col not in ("description", "stock", "cost", "price")]
        product_validations.valid_columns(column, valid_columns)

        results = product_manager.single_select(column, value)
        product_validations.valid_value(column, value, results)

        formatted_results = [self._format_product(result) for result in results]
        return formatted_results


    def update_product(self, search_col, search_value, column_modify, new_value):
        valid_search_columns = ["id"]
        product_validations.valid_columns(search_col, valid_search_columns)

        result = product_manager.single_select(search_col, search_value)
        product_validations.valid_value(search_col, search_value, result)

        valid_update_columns = [col for col in Products.__table__.columns.keys() 
                        if col not in ("id", "SKU", "name", "target_species")]
        product_validations.valid_columns(column_modify, valid_update_columns)

        product_manager.single_update(search_col, search_value, column_modify, new_value)


    def delete_product(self, column, value):
        valid_search_columns = ["id"]
        product_validations.valid_columns(column, valid_search_columns)
        result = product_manager.single_select(column, value)
        product_validations.valid_value(column, value, result)
        product_manager.single_delete(column, value)