from app.infrastructure.database.db_connection import DatabaseConnection
from app.utils.orms_queries import QueryFunctions
from app.infrastructure.database.db_model import InvoiceDetails
from app.utils.validations import Validations
from app.repositories.repository_products import ProductsRepository


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
invoice_details_manager = QueryFunctions(engine, InvoiceDetails.__table__)
invoice_details_validations = Validations()
products_repo = ProductsRepository()


class InvoiceDetailsRepository:

    def __init__(self):
        pass


    def _format_invoice_details(self, invoice_detail_record):
        product = products_repo.get_product_by_value("id", invoice_detail_record.product_id)
        return {
            "id": invoice_detail_record.id,
            "invoice_id": invoice_detail_record.invoice_id,
            "product_id": invoice_detail_record.product_id,
            "product_name": product[0]["name"] if product else None,
            "quantity": invoice_detail_record.quantity,
            "item_total": float(invoice_detail_record.item_total)
        }


    def new_invoice_detail_data(self, invoice_id, product_id, quantity, item_total):
        invoice_detail_data = {
            "invoice_id": invoice_id,
            "product_id": product_id,
            "quantity": quantity,
            "item_total": item_total
        }
        return invoice_detail_data


    def new_invoice_detail(self, invoice_id, product_id, quantity, item_total):
        invoice_detail_data = self.new_invoice_detail_data(invoice_id, product_id, quantity, item_total)   
        invoice_details_validations.not_need_value(invoice_detail_data, "id")
        
        obligatory_info = [col for col in InvoiceDetails.__table__.columns.keys() if col not in ("id")]
        invoice_details_validations.complete_info(invoice_detail_data, obligatory_info)
        
        result = invoice_details_manager.single_insert(invoice_detail_data)
        return result
        

    def insert_many_invoice_details(self, invoice_details_list):
        obligatory_info = [col for col in InvoiceDetails.__table__.columns.keys() if col not in ("id")]
        # validating each invoice detail data
        for invoice_detail_data in invoice_details_list:
            invoice_details_validations.not_need_value(invoice_detail_data, "id")
            invoice_details_validations.complete_info(invoice_detail_data, obligatory_info)
        #insert all new invoice details
        invoice_details_manager.multiple_inserts(invoice_details_list)


    def show_invoice_details(self):
        results = invoice_details_manager.whole_table_select()
        formatted_results = [self._format_invoice_details(result) for result in results]
        return formatted_results


    def get_invoice_detail_by_value(self, column, value):
        valid_columns = [col for col in InvoiceDetails.__table__.columns.keys() if col not in ("quantity", "item_total")]
        invoice_details_validations.valid_columns(column, valid_columns)

        results = invoice_details_manager.single_select(column, value)
        invoice_details_validations.valid_value(column, value, results)

        formatted_results = [self._format_invoice_details(result) for result in results]
        return formatted_results


    def get_invoice_detail_by_two_values(self, column_a, column_b, value_a, value_b):
        valid_columns = InvoiceDetails.__table__.columns.keys()
        invoice_details_validations.valid_columns(column_a, valid_columns)
        invoice_details_validations.valid_columns(column_b, valid_columns)

        results = invoice_details_manager.select_by_two_values(column_a, column_b, value_a, value_b)
        invoice_details_validations.valid_value(column_a, value_a, results)
        invoice_details_validations.valid_value(column_b, value_b, results)

        formatted_results = [self._format_invoice_details(result) for result in results]
        return formatted_results


    def update_invoice_detail(self, search_col, search_value, column_modify, new_value):
        valid_search_columns = ["id"]
        invoice_details_validations.valid_columns(search_col, valid_search_columns)

        result = invoice_details_manager.single_select(search_col, search_value)
        invoice_details_validations.valid_value(search_col, search_value, result)

        valid_update_columns = ["quantity", "item_total"]
        invoice_details_validations.valid_columns(column_modify, valid_update_columns)

        invoice_details_manager.single_update(search_col, search_value, column_modify, new_value)
        return {column_modify:new_value}

    def delete_invoice_detail(self, column, value):
        valid_search_columns = ["id"]
        invoice_details_validations.valid_columns(column, valid_search_columns)
        result = invoice_details_manager.single_select(column, value)
        invoice_details_validations.valid_value(column, value, result)

        invoice_details_manager.single_delete(column, value)