from flask import Flask, Blueprint, request, jsonify, g
from jwt_manager import JWT_Manager
from flask import Blueprint, Flask, request, Response, jsonify
from repository_fruits import FruitsRepository
from repository_users import UsersRepository
from repository_carts import CartsRepository
from repository_fruits_in_cart import FruitsInCartRepository
from repository_invoices import InvoiceRepository
from repository_invoice_details import InvoiceDetailsRepository
from decorator_authenticator import client_only, all_users

jwt_manager = JWT_Manager('happylife', 'RS256')
users_repo = UsersRepository()
fruits_repo = FruitsRepository()
carts_repo = CartsRepository()
fruits_in_repo = FruitsInCartRepository()
invoices_repo = InvoiceRepository()
invoice_details_repo = InvoiceDetailsRepository()

buying_bp = Blueprint('buying', __name__)


# show fruits or show fruits by name or id (query parameter)
@buying_bp.route("/buy/fruits", methods=["GET"])
@all_users
def show_fruits():
    try:
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            
            valid_columns_search = ["id", "name"]
            if column not in valid_columns_search:
                raise ValueError(f" '{column}' Search not allowed!")
            
            if column and filter_value:
                formatted_fruits = fruits_repo.get_fruit_by_value(column, filter_value)
            else:
                raise ValueError(f"Column or column's value info incomplete")

        else:
            formatted_fruits = fruits_repo.get_fruits()
            
    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_fruits), 200
    


# get a fruit ideally by id with path parameters or any other parameter
@buying_bp.route("/buy/fruits/<column>/<value>", methods=["GET"])
@all_users
def get_fruit(column, value):
    try:
        valid_columns_search = ["id", "name"]
        if column not in valid_columns_search:
            raise ValueError(f" '{column}' Search not allowed!")
        
        formatted_fruits = fruits_repo.get_fruit_by_value(column, value)
        
    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_fruits ), 200



@buying_bp.route("/buy/fruits", methods=["POST"])
@all_users
def create_cart():
    try:
        user_id = g.user_id
        user_name = g.user_name
        fruit_in_data = request.get_json()
        fruit_id = fruit_in_data.get("fruit_id")
        quantity_buy = fruit_in_data.get("quantity")

        # cart validations
        cart = carts_repo.get_cart_by_two_values("user_id", "status", user_id, "pending")
        # create a new cart if no pending cart exists
        if not cart:
            cart = carts_repo.new_cart({"user_id":user_id, "status":"pending"})
        cart_id = cart[0]["id"]

        # for fulfill the cart with fruits has to be done one by one
        fruits_in_repo.new_fruit_in_cart({"cart_id":cart_id, "fruit_id":fruit_id, "quantity":quantity_buy})

        # update fruit quantity in storage
        fruit = fruits_repo.get_fruit_by_value("id", fruit_id)
        new_total_quantity = (fruit[0]["quantity"]) - quantity_buy
        if new_total_quantity < 0:
            raise ValueError("Not enough fruit in stock")
        fruits_repo.update_fruit("id", fruit_id, "quantity", new_total_quantity)

        return jsonify(message="Cart updated", user=user_name), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=f"Unexpected error: {str(error)}"), 500
    


@buying_bp.route("/buy/carts", methods=["GET"])
@all_users
def show_cart():
    try:
        user_id = g.user_id
        user_name = g.user_name

        # show a pending cart with it details
        cart = carts_repo.get_cart_by_two_values("user_id", "status", user_id, "pending")
        if not cart:
            return jsonify(message="No pending cart found", user=user_name), 200
        
        cart_id = cart[0]["id"]
        cart_details = fruits_in_repo.get_fruit_in_cart_by_value("cart_id", cart_id)
        return jsonify(cart=cart, cart_details=cart_details, user=user_name), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=f"Unexpected error: {str(error)}"), 500
    


@buying_bp.route("/buy/carts", methods=["PATCH"])
@all_users
def update_cart():
    try:
        user_name = g.user_name

        # validations of the cart
        # {"id": ##, "quantity": ##}
        new_cart_detail = request.get_json()
        cart_details = fruits_in_repo.get_fruit_in_cart_by_value("id", new_cart_detail.get("id"))
        if not cart_details:
            raise ValueError("Cart detail not found")
        cart = carts_repo.get_cart_by_value("id", cart_details[0]["cart_id"])
        status = cart[0]["status"]
        if (status.value if hasattr(status, "value") else status) != "pending":
            raise ValueError("The shopping cart has already been processed and completed.")

        # validate the new quantity
        new_quantity = new_cart_detail.get("quantity")
        old_quantity = cart_details[0]["quantity"]
        fruit_id = cart_details[0]["fruit_id"]
        fruit = fruits_repo.get_fruit_by_value("id", fruit_id)
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

        # update the detail of the cart
        fruits_in_repo.update_fruit_in_cart("id", new_cart_detail.get("id"), "quantity", new_quantity)
        return jsonify(message="Cart updated", quantity=new_quantity, user=user_name), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=f"Unexpected error: {str(error)}"), 500



@buying_bp.route("/buy/invoices", methods=["POST"])
@all_users
def create_invoice():
    try:
        # necessary data
        user_id = g.user_id
        user_name = g.user_name
        # cart status
        carts = carts_repo.get_cart_by_value("user_id", user_id)
        for cart in carts:
            if cart["status"] == "pending":
                cart_id = cart["id"]
                break
        # {"shipping_address" : "xxxxxxxx"}
        shipping_address = request.get_json().get("shipping_address")
        invoice_data = {
            "user_id": user_id,
            "cart_id": cart_id,
            "shipping_address": shipping_address
        }
        # create the invoice
        invoice = invoices_repo.new_invoice(invoice_data)

        # data for invoice detail
        invoice_id = invoice["id"]
        invoice_total = invoice["invoice_total"]
        fruits_in_cart = fruits_in_repo.get_fruit_in_cart_by_value("cart_id", cart_id)
        for fruit in fruits_in_cart:
            fruit_id = fruit["fruit_id"]
            quantity = fruit["quantity"]
            #fruit = fruits_repo.get_fruit_by_value("id", fruit_id)
            fruit_price = fruits_repo.get_fruit_by_value("id", fruit_id)[0]["price"]
            item_total = quantity * fruit_price
            invoice_detail = {
                "invoice_id": invoice_id,
                "fruit_id": fruit_id,
                "quantity": quantity,
                "item_total": item_total
            }
            invoice_details_repo.new_detail(invoice_detail)
            invoice_total += item_total

        # update invoice total in invoice and cart status
        invoices_repo.update_invoice("id", invoice_id, "invoice_total", invoice_total)
        carts_repo.update_cart("id", cart_id, "status", "completed")

        return jsonify(message="Invoice Ready!", invoice=invoice_id, user=user_name), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=f"Unexpected error: {str(error)}"), 500



@buying_bp.route("/buy/invoices", methods=["GET"])
@all_users
def get_invoices():
    try:
        # necessary data
        user_id = g.user_id
        user_name = g.user_name
        invoices = invoices_repo.get_invoice_by_value("user_id", user_id)
        invoice_details = invoice_details_repo.get_invoice_detail_by_value("invoice_id", invoices[0]["id"])
        return jsonify(message="Your invoices:", invoices=invoices, 
                    invoice_details=invoice_details, user=user_name), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=f"Unexpected error: {str(error)}"), 500
    
# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)