from db_connection import DatabaseConnection
from orms_queries import QueryFunctions
from db_model import InvoicesDetails
from validations import Validations


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
invoice_detail_manager = QueryFunctions(engine, InvoicesDetails.__table__)
invoice_detail_validations = Validations()


class InvoiceDetailsRepository:
    
    def __init__(self):
        pass


    def _format_invoice_detail(self, invoice_detail_record):
        return {
            "id": invoice_detail_record.id,
            "invoice_id": invoice_detail_record.invoice_id,
            "fruit_id": invoice_detail_record.fruit_id,
            "quantity": invoice_detail_record.quantity,
            "item_total": invoice_detail_record.item_total,
        }
    

    def new_detail(self, detail_data):

        # no need 'id', 'id' autogenerate (primary key)
        invoice_detail_validations.not_need_value(detail_data, "id")

        # obligatory info, no need 'id column'
        self.obligatory_info = InvoicesDetails.__table__.columns.keys()
        self.obligatory_info.remove("id")
        complete_info = invoice_detail_validations.complete_info(detail_data, self.obligatory_info)
        if complete_info:
            invoice_detail_manager.single_insert(detail_data)


    def several_invoice_details(self, details_list):

        # set obligatory info, no need 'id column'
        self.obligatory_info = InvoicesDetails.__table__.columns.keys()
        self.obligatory_info.remove("id")
        for detail_data in details_list:
            # no need 'id', 'id' autogenerate (primary key)
            invoice_detail_validations.not_need_value(detail_data, "id")
            invoice_detail_validations.complete_info(detail_data, self.obligatory_info)

        #insert all new invoices
        invoice_detail_manager.multiple_inserts(details_list)


    def get_invoice_detail(self):     
        results = invoice_detail_manager.whole_table_select()
        formatted_results = [self._format_invoice_detail(result) for result in results]
        return formatted_results


    def get_invoice_detail_by_value(self, column, value):
        
        valid_columns = ["id","invoice_id", "fruit_id"] 
        try:
            invoice_detail_validations.valid_columns(column, valid_columns)
            results = invoice_detail_manager.single_select(column, value)
            if not results:
                    raise ValueError(f" '{value}' value, does not exists")
            else:
                formatted_results = [self._format_invoice_detail(result) for result in results]
                return formatted_results
        
        except: #Exception as error:
            raise #Exception(f"Database error: {error}")


    def update_invoice_detail(self, search_col, search_value, column_modify, new_value):

        # verifying the search column
        valid_search_columns = ["id", "fruit_id" ] 
        invoice_detail_validations.valid_columns(search_col, valid_search_columns)
        
        # verifying the value in the chosen column
        valid_value = invoice_detail_manager.single_select(search_col, search_value)
        if not valid_value:
            raise ValueError(f"{search_value} value not exists in {search_col}")

        valid_update_columns = ["fruit_id", "quantity"]
        invoice_detail_validations.valid_columns(column_modify, valid_update_columns)
        invoice_detail_manager.single_update(search_col, search_value, column_modify, new_value)


    
    def update_invoice_details_by_two_search_values(self, search_col_a, search_value_a, search_col_b, search_value_b, column_modify, new_value):
        
        # verifying the search columns
        valid_search_columns = ["invoice_id", "fruit_id" ] 
        invoice_detail_validations.valid_columns(search_col_a, valid_search_columns)
        invoice_detail_validations.valid_columns(search_col_b, valid_search_columns)

        # verifying the values in the chosen columns
        valid_value_a = invoice_detail_manager.single_select(search_col_a, search_value_a)
        valid_value_b = invoice_detail_manager.single_select(search_col_b, search_value_b)
        if not valid_value_a:
            raise ValueError(f"{search_value_a} value not exists in {search_col_a}")
        if not valid_value_b:
            raise ValueError(f"{search_value_b} value not exists in {search_col_b}")

        valid_update_columns = ["quantity", "item_total"]
        invoice_detail_validations.valid_columns(column_modify, valid_update_columns)
        invoice_detail_manager.single_update_by_two_values(search_col_a, search_value_a, search_col_b, search_value_b, column_modify, new_value)


    def update_many_invoice_details(self, column_modify, dict_list):

        # verifying the chosen column
        valid_update_columns = ["fruit_id", "quantity"]
        invoice_detail_validations.valid_columns(column_modify, valid_update_columns)
        invoice_detail_manager.multiple_update(column_modify, dict_list)


    def delete_invoice_detail(self, search_col, value):

        # verifying the search column
        valid_search_columns = ["id", "invoice_id" ] 
        invoice_detail_validations.valid_columns(search_col, valid_search_columns)
        
        # verifying the value in the chosen column
        valid_value = invoice_detail_manager.single_select(search_col, value)
        if not valid_value:
            raise ValueError(f"{value} value not exists in {search_col}")

        invoice_detail_manager.single_delete(search_col, value)

