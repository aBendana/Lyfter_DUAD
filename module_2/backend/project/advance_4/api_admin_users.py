from flask import Flask, Blueprint, request, jsonify
from decorator_authenticator import admin_only
from repository_users import UsersRepository
from repository_login_history import LoginHistoryRepository
from repository_invoices import InvoicesRepository
from repository_invoice_details import InvoiceDetailsRepository
from repository_carts import CartsRepository
from repository_products_in_cart import ProductsInCartRepository
from transactions import Transactions


users_repo = UsersRepository()
login_repo = LoginHistoryRepository()
invoices_repo = InvoicesRepository()
invoice_details_repo = InvoiceDetailsRepository()
carts_repo = CartsRepository()
products_in_cart_repo = ProductsInCartRepository()
transactions = Transactions()

admin_users_bp = Blueprint('admin_users', __name__)

# create (insert) user
@admin_users_bp.route("/admin/users", methods=['POST'])
@admin_only
def create_users():
    try:
        user_data = request.get_json()
        users_repo.insert_user(user_data)
        return jsonify(message="Successful saved", user=user_data), 200
            
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500 


# create - insert many users
@admin_users_bp.route("/admin/users/many", methods=['POST'])
@admin_only
def create_many_users():
    try:
        users_data = request.get_json()
        users_repo.insert_many_users(users_data)
        return jsonify(message="Successful saved", users=users_data), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500


# show users or show users by name, email, phone number or role(query parameter)
@admin_users_bp.route("/admin/users", methods=['GET'])
@admin_only
def show_users():
    try:
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            if column and filter_value:
                formatted_users = users_repo.get_user_by_value_for_api(column, filter_value)
            else:
                raise ValueError(f"Column or column's value info incomplete")
        else:
            formatted_users = users_repo.show_users()

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_users), 200


# update a user by path parameter user id (id, name, role can't be changed)
@admin_users_bp.route("/admin/users/<user_id>", methods=['PATCH'])
@admin_only
def update_user(user_id):
    try:
        user_data = request.get_json()
        # prevents 'user id', 'user name' or 'role' from being changed
        user_data.pop("id", None)
        user_data.pop("name", None)
        user_data.pop("role", None)

        for user_key, user_value in user_data.items():
            column_modify = user_key
            new_value = user_value
            # updating
            users_repo.update_user("id", user_id, column_modify, new_value)

        return jsonify(message1="Successful updated", message2="'user id', 'user name' or 'role' can't be changed", 
                    user_data_updated=user_data), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500


# delete user by path parameter id or name
#preferably not to use, keep for reference and for related functionality of the db
@admin_users_bp.route("/admin/users/<user_id>", methods=['DELETE'])
@admin_only
def delete_user(user_id):
    try:
        users_repo.delete_user("id", user_id)
        return jsonify(user=user_id, message="Successful delete"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500



# show users login history
@admin_users_bp.route("/admin/users/login-history", methods=['GET'])
@admin_only
def show_login_history():
    try:
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            if column and filter_value:
                formatted_logins = login_repo.get_login_history_by_value(column, filter_value)
            else:
                raise ValueError(f"Column or column's value info incomplete")
        else:
            formatted_logins = login_repo.get_login_history()

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_logins), 200


# delete a login_history by id
#preferably not to use, keep for reference and for related functionality of the db
@admin_users_bp.route("/admin/users/login-history/<id_value>", methods=['DELETE'])
@admin_only
def delete_login_history(id_value):
    try:
        login_repo.delete_login_history("id", id_value)
        return jsonify(user=id_value, message="Successful delete"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500
    

# show all invoices or invoices by user id, cart id, shipping method or payment method (query parameter)
@admin_users_bp.route("/admin/invoices", methods=['GET'])
@admin_only
def show_invoices():
    try:
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            if column and filter_value:
                formatted_invoices = invoices_repo.get_invoice_by_value(column, filter_value)  # specific invoice
                invoice_id = formatted_invoices[0]["id"]
                formatted_invoice_details = invoice_details_repo.get_invoice_detail_by_value("invoice_id", invoice_id) # details of that invoice
                user_id = formatted_invoices[0]["user_id"]
                user_name = users_repo.get_user_by_value_for_api("id", user_id)[0]["name"] # owner of that invoice
                return jsonify(invoices=formatted_invoices, invoice_details=formatted_invoice_details, user_id=user_id, user_name=user_name), 200
            else:
                raise ValueError(f"Column or column's value info incomplete")
        else:
            formatted_invoices = invoices_repo.show_invoices()

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500

    return jsonify(formatted_invoices), 200


# update a cart in order to update an invoice 
# for special customer petition when a invoice is already finished
@admin_users_bp.route("/admin/invoices/<invoice_id>", methods=['PATCH'])
@admin_only
def update_cart_invoice(invoice_id):
    try:
        product_update = request.get_json()
        product_id = product_update.get("product_id")
        new_quantity = product_update.get("quantity")
        discount_rate = product_update.get("discount_rate", 0)  # default to 0 if not provided
        if not product_id or new_quantity is None:
            raise ValueError("Product id and new quantity are required")

        # get the cart_id from the invoice
        cart_id = invoices_repo.get_invoice_by_value("id", invoice_id)[0]["cart_id"]

        # get the product in cart
        product_in_cart = products_in_cart_repo.get_product_in_cart_by_two_values("cart_id", "product_id", cart_id, product_id)
        if not product_in_cart:
            raise ValueError("Product not found in the cart")
        current_quantity = product_in_cart[0]["quantity"]

        # calculate the difference to update stock
        transactions.stock_logic(current_quantity, new_quantity, product_id, product_in_cart)

        # update the product quantity in the cart
        products_in_cart_repo.update_product_in_cart("id", product_in_cart[0]["id"], "quantity", new_quantity)
        
        # recalculate invoice totals
        #calculate invoice subtotal
        products_in_cart = products_in_cart_repo.get_product_in_cart_by_value("cart_id", cart_id)
        invoice_subtotal = transactions.calculate_invoice_subtotal(products_in_cart)

        # apply discount if exists
        discount_amount = transactions.calculate_discount(invoice_subtotal, discount_rate)

        # shipping cost based on shipping method
        shipping_cost = invoices_repo.get_invoice_by_value("id", invoice_id)[0]["shipping_cost"]   

        # invoice total, taxes are fixed at 7% in db_model
        invoice_total = transactions.calculate_invoice_total(invoice_subtotal, discount_amount, shipping_cost)

        # update the invoice
        invoices_repo.update_invoice("id", invoice_id, "invoice_subtotal", invoice_subtotal)
        invoices_repo.update_invoice("id", invoice_id, "discount", discount_amount)
        invoices_repo.update_invoice("id", invoice_id, "invoice_total", invoice_total)

        # update invoice details
        item_in_cart = products_in_cart_repo.get_product_in_cart_by_two_values("cart_id", "product_id", cart_id, product_id) # get the updated product in cart
        item_total = transactions.calculate_item_total_for_update_detail(item_in_cart)
        detail_id = invoice_details_repo.get_invoice_detail_by_two_values("invoice_id", "product_id", invoice_id, product_id)[0]["id"] # get the detail id to update
        # update the invoice detail
        invoice_details_repo.update_invoice_detail("id", detail_id, "quantity", new_quantity)
        invoice_details_repo.update_invoice_detail("id", detail_id, "item_total", item_total)

        return jsonify(message="Invoice updated", invoice=invoice_id), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500