from flask import Flask, Blueprint, request, jsonify
from data import SaveData
from validations import Validations
from errors import ParameterError, Filter


# app = Flask(__name__)

invoices_bp = Blueprint('invoices', __name__)
data = SaveData()
filtering = Filter()
valid_invoice = Validations()


# # root endpoint
# @app.route("/")
# def root():
#     return "<h1>Invoice Control!</h1>"

# show invoices and filter by email and shipping method with query parameter
@invoices_bp.route("/invoices", methods=['GET'])
def show_invoices():

    try:
        invoices_list = data.read_data_json('invoices.json')
        email_filter = request.args.get('email')
        if email_filter:
            invoices_list = filtering.valid_filter(invoices_list, 'email', email_filter)

        shipping_filter = request.args.get('shipping_method')
        if shipping_filter:
            invoices_list = filtering.valid_filter(invoices_list, 'shipping_method', shipping_filter)

    except ParameterError as error:
        return jsonify(error = f" 'parameter', {error}"), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(invoices_list), 200


# get a invoice by invoice_id with path parameter
@invoices_bp.route("/invoices/<invoice_id>", methods=['GET'])
def get_invoice(invoice_id):
    
    try:
        invoices_list = data.read_data_json('invoices.json')
        product = filtering.valid_filter(invoices_list, 'invoice_id', invoice_id)
    
    except ParameterError as error:
        return jsonify(error = f" 'invocie id', {error}"), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(product), 200


# save invoices
@invoices_bp.route("/invoices", methods=['POST'])
def save_invoices():

    # preparing requisites for restrictions
    # obligatory data
    obligatory_1stlevel_info = ['invoice_id', 'date_placed', 'shipping_method', 'shipping_address', 
                            'phone_number','email', 'payment_method', 'items', 'invoice_total']
    obligatory_shipping_address_info = ["address", "canton", "province", "postal_code"]
    obligatory_items_data = ['product_id', 'product_name', 'quantity', 'price', 'discount',
                            'sales_tax','shipping_cost', 'total']
    
    #valid info for complete the invoice
    valid_shipping_method = ["Standard", "Express", "Overnight"]
    shipping_method_parameter = "shipping_method"
    valid_payment_method = ["debit card", "credit card", "SINPE", "bank transfer"]
    payment_method_parameter = "payment_method"
    integer_numbers = ["quantity"]
    float_numbers = ["price", "discount", "sales_tax", "shipping_cost", "total"]

    try:
        if data.json_data_exists('invoices.json'):
            invoices_list = data.read_data_json('invoices.json')
        else:
            invoices_list = []

        # collecting the data
        invoice_data = request.get_json()
        shipping_address_info = invoice_data.get("shipping_address")
        items_data = invoice_data.get("items")

        # validating the data
        valid_invoice.complete_info(invoice_data, obligatory_1stlevel_info)
        valid_invoice.complete_info(shipping_address_info, obligatory_shipping_address_info)
        valid_invoice.complete_multilevel_info(items_data, obligatory_items_data)
        valid_invoice.not_repeat_id(invoices_list, "invoice_id", invoice_data)
        valid_invoice.check_valid_type(invoice_data, shipping_method_parameter, valid_shipping_method)
        valid_invoice.check_valid_type(invoice_data, payment_method_parameter, valid_payment_method)
        valid_invoice.valid_multilevel_integer(items_data, integer_numbers)
        valid_invoice.valid_multilevel_float(items_data, float_numbers)
        valid_invoice.valid_float(invoice_data, float_numbers=["invoice_total"])

        #adding and writing the new invoice
        invoices_list.append(invoice_data)
        data.write_data_json(invoices_list, 'invoices.json')
        
        return jsonify(message="Successful saved", users=invoices_list), 200
            

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except TypeError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# update invoice by path parameter invoice_id (id can't be changed)
@invoices_bp.route("/invoices/<invoice_id>", methods=['PATCH'])
def update_invoice(invoice_id):

    valid_shipping_method = ["Standard", "Express", "Overnight"]
    shipping_method_parameter = "shipping_method"
    valid_payment_method = ["debit card", "credit card", "SINPE", "bank transfer"]
    payment_method_parameter = "payment_method"
    integer_numbers = ["quantity"]
    float_numbers = ["price", "discount", "sales_tax", "shipping_cost", "total"]
    
    try:
        invoices_list = data.read_data_json('invoices.json')
        filtering.valid_filter(invoices_list, 'invoice_id', invoice_id)
        invoice_data = request.get_json()
        items_data = invoice_data.get("items")

        # prevents the 'invoice_id' from being changed
        invoice_data.pop("invoice_id", None)
        
        if "shippig_methosd" in invoice_data:
            valid_invoice.check_valid_type(invoice_data, shipping_method_parameter, valid_shipping_method)

        if "payment_method" in invoice_data:   
            valid_invoice.check_valid_type(invoice_data, payment_method_parameter, valid_payment_method)

        if "items" in invoice_data:   
            valid_invoice.valid_multilevel_integer(items_data, integer_numbers)
            valid_invoice.valid_multilevel_float(items_data, float_numbers)

        if "invoice_total" in invoice_data:    
            valid_invoice.valid_float(invoice_data, float_numbers=["invoice_total"])

        for index, invoice in enumerate(invoices_list):
            if invoice.get("invoice_id") == invoice_id:
                invoice.update(invoice_data)
                invoices_list[index] = invoice
                data.write_data_json(invoices_list, 'invoices.json')
                
                return jsonify(message="Successful updated", invoice=invoice), 200
    
    except ParameterError as error:
        return jsonify(error = f" 'invoice_id', {error}"), 400
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except TypeError as error:
        return jsonify(error=str(error)), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# delete a invoice by path parameter invoice_id
@invoices_bp.route("/invoices/<invoice_id>", methods=['DELETE'])
def delete_invoice(invoice_id):
    
    try:
        invoices_list = data.read_data_json('invoices.json')
        filtering.valid_filter(invoices_list, 'invoice_id', invoice_id)
        for index, invoice in enumerate(invoices_list):
            if invoice.get("invoice_id") == invoice_id:
                invoices_list.pop(index)
                data.write_data_json(invoices_list, 'invoices.json')

        return jsonify(message="Successful delete", invoices=invoices_list), 200

    except ParameterError as error:
        return jsonify(error = f" 'id', {error}"), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  