from db_connection import DatabaseConnection
from orms_queries import QueryFunctions
from db_model import Invoices
from validations import Validations


db_manager = DatabaseConnection()
engine = db_manager.get_engine()
invoice_manager = QueryFunctions(engine, Invoices.__table__)
invoice_validations = Validations()


class InvoicesRepository:

    def __init__(self):
        pass


    def _format_invoice(self, invoice_record):
        print(type(invoice_record), invoice_record)
        return {
            "id": invoice_record.id,
            "user_id": invoice_record.user_id,
            "cart_id": invoice_record.cart_id,
            "shipping_address_id": invoice_record.shipping_address_id,
            "date_placed": invoice_record.date_placed,
            "shipping_method": invoice_record.shipping_method.value if hasattr(invoice_record.shipping_method, "value") else invoice_record.shipping_method,
            "payment_method": invoice_record.payment_method.value if hasattr(invoice_record.payment_method, "value") else invoice_record.payment_method,
            "invoice_subtotal": float(invoice_record.invoice_subtotal),
            "discount": float(invoice_record.discount),
            "shipping_cost": float(invoice_record.shipping_cost),
            "sales_taxes": float(invoice_record.sales_taxes),
            "invoice_total": float(invoice_record.invoice_total),
        }


    def _new_invoice_data(self, user_id, cart_id, shipping_address_id, shipping_method, payment_method,
                        invoice_subtotal, discount, shipping_cost, invoice_total):
        invoice_data = {
            "user_id": user_id,
            "cart_id": cart_id,
            "shipping_address_id": shipping_address_id,
            "shipping_method": shipping_method,
            "payment_method": payment_method,
            "invoice_subtotal": invoice_subtotal,
            "discount": discount,
            "shipping_cost": shipping_cost,
            "invoice_total": invoice_total
        }
        return invoice_data


    def new_invoice(self, user_id, cart_id, shipping_address_id, shipping_method, payment_method,
                        invoice_subtotal, discount, shipping_cost, invoice_total):
        invoice_data = self._new_invoice_data(user_id, cart_id, shipping_address_id, shipping_method, payment_method,
                                            invoice_subtotal, discount, shipping_cost, invoice_total)
        
        invoice_validations.not_need_value(invoice_data, "id")
        obligatory_info = [col for col in Invoices.__table__.columns.keys() if col not in ("id", "date_placed", "sales_taxes")]
        invoice_validations.complete_info(invoice_data, obligatory_info)

        result = invoice_manager.single_insert(invoice_data)
        return result


    def show_invoices(self):
        results = invoice_manager.whole_table_select()
        formatted_results = [self._format_invoice(result) for result in results]
        return formatted_results


    def get_invoice_by_value(self, column, value):
        valid_columns = ["id", "user_id", "cart_id", "shipping_address_id", "shipping_method", "payment_method"]
        invoice_validations.valid_columns(column, valid_columns)
        results = invoice_manager.single_select(column, value)
        invoice_validations.valid_value(column, value, results)
        formatted_results = [self._format_invoice(result) for result in results]
        return formatted_results
    
    
    def get_invoice_by_two_values(self, column_a, column_b, value_a, value_b):
        valid_columns = ["id", "user_id", "cart_id"]
        invoice_validations.valid_columns(column_a, valid_columns)
        invoice_validations.valid_columns(column_b, valid_columns)

        results = invoice_manager.select_by_two_values(column_a, column_b, value_a, value_b)
        invoice_validations.valid_value(column_a, value_a, results)
        invoice_validations.valid_value(column_b, value_b, results)

        formatted_results = [self._format_invoice(result) for result in results]
        return formatted_results


    def update_invoice(self, search_col, search_value, column_modify, new_value):
        valid_search_columns = ["id"]
        invoice_validations.valid_columns(search_col, valid_search_columns)
        result = invoice_manager.single_select(search_col, search_value)
        invoice_validations.valid_value(search_col, search_value, result)

        valid_update_columns = [col for col in Invoices.__table__.columns.keys() if col not in ("id", "user_id", "cart_id", "date_placed")]
        invoice_validations.valid_columns(column_modify, valid_update_columns)
        invoice_manager.single_update(search_col, search_value, column_modify, new_value)


    def delete_invoice(self, column, value):
        valid_search_columns = ["id"]
        invoice_validations.valid_columns(column, valid_search_columns)
        result = invoice_manager.single_select(column, value)
        invoice_validations.valid_value(column, value, result)
        
        invoice_manager.single_delete(column, value)