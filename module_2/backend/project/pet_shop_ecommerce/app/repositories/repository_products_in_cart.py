from app.infrastructure.database.db_connection import DatabaseConnection
from app.utils.orms_queries import QueryFunctions
from app.infrastructure.database.db_model import ProductsInCart
from app.utils.validations import Validations
from app.repositories.repository_products import ProductsRepository


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
product_in_cart_manager = QueryFunctions(engine, ProductsInCart.__table__)
product_in_cart_validations = Validations()


class ProductsInCartRepository:

    def __init__(self):
        pass


    def _format_product_in_cart(self, product_in_cart_record):
        from app.repositories.repository_products import ProductsRepository
        products_repo = ProductsRepository()
        product = products_repo.get_product_by_value("id", product_in_cart_record.product_id)
        return {
            "id": product_in_cart_record.id,
            "cart_id": product_in_cart_record.cart_id,
            "product_id": product_in_cart_record.product_id,
            "quantity": product_in_cart_record.quantity,
            "product_name": product[0]["name"] if product else None
        }


    def new_product_in_cart(self, product_in_cart_data):
        #validating the cart data
        product_in_cart_validations.not_need_value(product_in_cart_data, "id")
        obligatory_info = [col for col in ProductsInCart.__table__.columns.keys() if col not in ("id")]
        complete_info = product_in_cart_validations.complete_info(product_in_cart_data, obligatory_info)
        if complete_info:
            result = product_in_cart_manager.single_insert(product_in_cart_data)
            return result


    def insert_many_products_in_cart(self, products_in_cart_list):
        obligatory_info = [col for col in ProductsInCart.__table__.columns.keys() if col not in ("id")]
        # validating each cart data
        for product_in_cart_data in products_in_cart_list:
            product_in_cart_validations.not_need_value(product_in_cart_data, "id")
            product_in_cart_validations.complete_info(product_in_cart_data, obligatory_info)
        #insert all new carts
        product_in_cart_manager.multiple_inserts(products_in_cart_list)


    def show_products_in_carts(self):
        results = product_in_cart_manager.whole_table_select()
        formatted_results = [self._format_product_in_cart(result) for result in results]
        return formatted_results


    def get_product_in_cart_by_value(self, column, value):
        valid_columns = [col for col in ProductsInCart.__table__.columns.keys() if col not in ("quantity")]
        product_in_cart_validations.valid_columns(column, valid_columns)

        results = product_in_cart_manager.single_select(column, value)
        # product_in_cart_validations.valid_value(column, value, results)

        formatted_results = [self._format_product_in_cart(result) for result in results]
        return formatted_results


    def get_product_in_cart_by_two_values(self, column_a, column_b, value_a, value_b):
        valid_columns = ProductsInCart.__table__.columns.keys()
        product_in_cart_validations.valid_columns(column_a, valid_columns)
        product_in_cart_validations.valid_columns(column_b, valid_columns)

        results = product_in_cart_manager.select_by_two_values(column_a, column_b, value_a, value_b)
        # product_in_cart_validations.valid_value(column_a, value_a, results)
        # product_in_cart_validations.valid_value(column_b, value_b, results)

        formatted_results = [self._format_product_in_cart(result) for result in results]
        return formatted_results


    def update_product_in_cart(self, search_col, search_value, column_modify, new_value):
        valid_search_columns = ["id"]
        product_in_cart_validations.valid_columns(search_col, valid_search_columns)

        result = product_in_cart_manager.single_select(search_col, search_value)
        product_in_cart_validations.valid_value(search_col, search_value, result)

        valid_update_columns = ["quantity"]
        product_in_cart_validations.valid_columns(column_modify, valid_update_columns)

        product_in_cart_manager.single_update(search_col, search_value, column_modify, new_value)
        return {column_modify:new_value}

    def delete_product_in_cart(self, column, value):
        valid_search_columns = ["id"]
        product_in_cart_validations.valid_columns(column, valid_search_columns)
        result = product_in_cart_manager.single_select(column, value)
        product_in_cart_validations.valid_value(column, value, result)
        
        product_in_cart_manager.single_delete(column, value)