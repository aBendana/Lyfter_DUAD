from flask import Flask, Blueprint, request, jsonify
from repository_carts import CartsRepository
from repository_fruits_in_cart import FruitsInCartRepository
from repository_invoices import InvoiceRepository
from repository_invoice_details import InvoiceDetailsRepository
from repository_fruits import FruitsRepository
from decorator_authenticator import admin_only
from cache_manager import CacheManager


carts_repo = CartsRepository()
fruits_in_repo = FruitsInCartRepository()
invoices_repo = InvoiceRepository()
invoice_details_repo = InvoiceDetailsRepository()
fruits_repo = FruitsRepository()
cache_manager = CacheManager()

cart_invoice_bp = Blueprint('cart_invoice', __name__)

# show all the carts
@cart_invoice_bp.route("/admin/carts", methods=['GET'])
@admin_only
def show_carts():

    try:
        formatted_carts = carts_repo.get_carts()

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_carts), 200



# show a cart with its own details/ only for cart_id
@cart_invoice_bp.route("/admin/carts/<column>/<value>", methods=['GET'])
@admin_only
def get_cart(column, value):
    
    try:
        if column != "id":
            raise ValueError("Invalid search column, only allow cart id")

        formatted_cart = carts_repo.get_cart_by_value(column, value)
        formatted_fruits_in = fruits_in_repo.get_fruit_in_cart_by_value("cart_id", value)
        return jsonify(cart=formatted_cart, fruits_in_cart=formatted_fruits_in), 200

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    

# show all invoices
@cart_invoice_bp.route("/admin/invoices", methods=['GET'])
@admin_only
def show_invoices():

    try:
        formatted_invoices = invoices_repo.get_invoices()

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500

    return jsonify(formatted_invoices), 200



# show a invoice with its own details/ only for invoice_id
@cart_invoice_bp.route("/admin/invoices/<column>/<value>", methods=['GET'])
@admin_only
def get_invoice(column, value):

    try:
        if column != "id":
            raise ValueError("Invalid search column, only allow invoice id")

        formatted_invoice = invoices_repo.get_invoice_by_value(column, value)
        formatted_invoice_details = invoice_details_repo.get_invoice_detail_by_value("invoice_id", value)
        return jsonify(invoice=formatted_invoice, invoice_details=formatted_invoice_details), 200

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    


# update a cart in order to update an invoice 
# for special customer petition when a invoice is already finished
@cart_invoice_bp.route("/admin/cart_invoice/<column>/<value>", methods=['PATCH'])
@admin_only
def update_cart_invoice(column, value):

    try:
        if column != "id":
            raise ValueError("Invalid search column, only allow cart id")
        cart = carts_repo.get_cart_by_value(column, value)

        #preparing data        
        fruits_in_cart_data = request.get_json()
        fruit_id = fruits_in_cart_data.get("fruit_id")
        new_quantity = fruits_in_cart_data.get("quantity")
        if not fruit_id or not new_quantity:
            raise ValueError("Missing fruit_id or fruit quantity")
        old_quantity = fruits_in_repo.get_fruit_in_cart_by_value("cart_id", value)[0]["quantity"]
        fruit = fruits_repo.get_fruit_by_value("id", fruit_id)

        # validating new quantity
        if new_quantity is None or new_quantity < 0 or new_quantity == old_quantity:
            raise ValueError("Invalid quantity provided")
        
        elif new_quantity > old_quantity:
            quantity_to_add = new_quantity - old_quantity
            new_total_quantity = (fruit[0]["quantity"]) - quantity_to_add
            if new_total_quantity < 0:
                raise ValueError("Not enough fruit in stock")
            fruits_repo.update_fruit("id", fruit_id, "quantity", new_total_quantity)

        elif new_quantity < old_quantity:
            quantity_to_back = old_quantity - new_quantity
            new_total_quantity = (fruit[0]["quantity"]) + quantity_to_back
            fruits_repo.update_fruit("id", fruit_id, "quantity", new_total_quantity)
        
        # updating quantity in fruits_in_cart
        fruits_in_repo.update_fruit_in_cart_by_two_search_values(
            "cart_id", value, "fruit_id", fruit_id, "quantity", new_quantity)
        
        # deleting cache because the updating of the quantity of fruit
        cache_manager.invalidate_cache_page("fruits", "id", int(fruit_id))
        cache_manager.invalidate_cache_by_id("fruit", "id", fruit_id)
        cache_manager.delete_data_with_pattern("fruits:all")
        
        # updating invoice details
        invoice_id = invoices_repo.get_invoice_by_value("cart_id", value)[0]["id"]
        invoice_details_repo.update_invoice_details_by_two_search_values(
            "invoice_id", invoice_id, "fruit_id", fruit_id, "quantity", new_quantity)
        new_item_total = fruit[0]["price"] * new_quantity
        # updating item total
        invoice_details_repo.update_invoice_details_by_two_search_values(
            "invoice_id", invoice_id, "fruit_id", fruit_id, "item_total", new_item_total)
        
        # updating invoice total
        details = invoice_details_repo.get_invoice_detail_by_value("invoice_id", invoice_id)
        new_invoice_total = sum(item["item_total"] for item in details)
        invoices_repo.update_invoice("id", invoice_id, "invoice_total", new_invoice_total)

        return jsonify(invoice=invoice_id, message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500
    



# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  