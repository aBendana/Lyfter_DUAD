from db_connection import DatabaseConnection
from orms_queries import QueryFunctions
from db_model import Invoices
from validations import Validations


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
invoice_manager = QueryFunctions(engine, Invoices.__table__)
invoice_validations = Validations()


class InvoiceRepository:
    
    def __init__(self):
        pass


    def _format_invoice(self, invoice_record):
        return {
            "id": invoice_record.id,
            "user_id": invoice_record.user_id,
            "shipping_address": invoice_record.shipping_address,
            "date_placed": invoice_record.date_placed.strftime('%d/%m/%Y'),
            "invoice_total": invoice_record.invoice_total,
        }
    

    def new_invoice(self, invoice_data):

        # no need 'id', 'id' autogenerate (primary key)
        invoice_validations.not_need_value(invoice_data, "id")

        # obligatory info, no need 'id column'
        self.obligatory_info = ["user_id", "cart_id", "shipping_address"]
        complete_info = invoice_validations.complete_info(invoice_data, self.obligatory_info)
        if complete_info:
            invoice = invoice_manager.single_insert(invoice_data)
            return invoice


    def several_invoices(self, invoices_list):

        # set obligatory info, no need 'id column'
        self.obligatory_info = Invoices.__table__.columns.keys()
        self.obligatory_info.remove("id")
        for invoice_data in invoices_list:
            # no need 'id', 'id' autogenerate (primary key)
            invoice_validations.not_need_value(invoice_data, "id")
            invoice_validations.complete_info(invoice_data, self.obligatory_info)

        #insert all new invoices
        invoice_manager.multiple_inserts(invoices_list)


    def get_invoices(self):     
        results = invoice_manager.whole_table_select()
        formatted_results = [self._format_invoice(result) for result in results]
        return formatted_results


    def get_invoice_by_value(self, column, value):

        valid_columns = ["id","user_id", "cart_id", "date_placed"]

        try:
            if column not in valid_columns:
                raise ValueError(f" '{column}' column, does not exists")

            results = invoice_manager.single_select(column, value)
            if not results:
                    raise ValueError(f" '{value}' value, does not exists")
            else:
                formatted_results = [self._format_invoice(result) for result in results]
                return formatted_results
        
        except: #Exception as error:
            raise #Exception(f"Database error: {error}")


    def update_invoice(self, search_col, search_value, column_modify, new_value):

        # verifying the search column
        valid_search_columns = ["id", "user_id" ] 
        invoice_validations.valid_columns(search_col, valid_search_columns)
        
        # verifying the value in the chosen column
        valid_value = invoice_manager.single_select(search_col, search_value)
        if not valid_value:
            raise ValueError(f"{search_value} value not exists in {search_col}")

        valid_update_columns = ["shipping_address", "invoice_total"]
        invoice_validations.valid_columns(column_modify, valid_update_columns)
        invoice_manager.single_update(search_col, search_value, column_modify, new_value)


    def update_many_invoices(self, column_modify, dict_list):

        # verifying the chosen column
        valid_update_columns = ["shipping_address", "invoice_total"]
        invoice_validations.valid_columns(column_modify, valid_update_columns)
        invoice_manager.multiple_update(column_modify, dict_list)


    def delete_invoice(self, search_col, value):

        # verifying the search column
        valid_search_columns = ["id", "user_id" ] 
        invoice_validations.valid_columns(search_col, valid_search_columns)
        
        # verifying the value in the chosen column
        valid_value = invoice_manager.single_select(search_col, value)
        if not valid_value:
            raise ValueError(f"{value} value not exists in {search_col}")

        invoice_manager.single_delete(search_col, value)

