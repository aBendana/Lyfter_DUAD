from flask import Flask, Blueprint, request, jsonify, g
from app.repositories.repository_carts import CartsRepository
from app.repositories.repository_products_in_cart import ProductsInCartRepository
from app.repositories.repository_shipping_addresses import AddressesRepository
from app.repositories.repository_invoices import InvoicesRepository
from app.repositories.repository_invoice_details import InvoiceDetailsRepository
from app.utils.transactions import Transactions
from app.infrastructure.security.decorator_authenticator import client_only

cart_repo = CartsRepository()
products_in_cart_repo = ProductsInCartRepository()
shipping_addresses_repo = AddressesRepository()
invoice_repo = InvoicesRepository()
invoice_details_repo = InvoiceDetailsRepository()
transactions = Transactions()

invoice_bp = Blueprint('invoice', __name__)

# before create an invoice, in api_cart:
# 1. fulfill a cart with products
# 2. show actual cart and check if you ready to checkout
@invoice_bp.route("/invoice", methods=["POST"])
@client_only   
def create_invoice():
    try:
        user_id = g.user_id
        user_name = g.user_name
        # check if a pending cart exists
        cart = cart_repo.get_cart_by_two_values("user_id", "status", user_id, "pending")
        if not cart:
            raise ValueError("No pending cart found.")
        cart_id = cart[0]["id"]

        invoice_data = request.get_json()
        # validating shipping address
        shipping_address_id = invoice_data.get("shipping_address_id")
        shipping_addresses_repo.get_address_by_two_values("id", "user_id", shipping_address_id, user_id)

        shipping_method = invoice_data.get("shipping_method")
        payment_method = invoice_data.get("payment_method")
        discount_rate = invoice_data.get("discount", 0)  # default to 0 if not provided


        products_in_cart = products_in_cart_repo.get_product_in_cart_by_value("cart_id", cart_id)
        if not products_in_cart:
            raise ValueError("The cart is empty. Add products to cart before checkout.")
        # create invoice
        invoice = invoice_repo.create_full_invoice(user_id, cart_id, shipping_address_id, shipping_method, 
                                                    payment_method, products_in_cart, discount_rate)
        
        # create invoice details
        invoice_id = invoice["id"]
        for item in products_in_cart:
            product_id = item["product_id"]
            quantity = item["quantity"]
            item_total = transactions.calculate_item_total(item)
            invoice_details_repo.new_invoice_detail(invoice_id, product_id, quantity, item_total)

        # update cart status to 'completed'
        cart_repo.update_cart("id", cart_id, "status", "completed")

        return jsonify(message="Invoice created successfully", invoice=invoice, user=user_name), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=f"Unexpected error: {str(error)}"), 500


@invoice_bp.route("/invoice", methods=["GET"])
@client_only   
def get_invoices():
    try:
        user_id = g.user_id
        user_name = g.user_name

        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            if column and filter_value:
                formatted_invoice = invoice_repo.get_invoice_by_two_values("id", "user_id", filter_value, user_id)
                formatted_invoice_details = invoice_details_repo.get_invoice_detail_by_value("invoice_id", formatted_invoice[0]["id"])
                return jsonify(invoice=formatted_invoice, invoice_details=formatted_invoice_details, user=user_name), 200
            else:
                raise ValueError(f"Column or column's value info incomplete")
        else:
            #show all invoices of the use
            formatted_invoices = invoice_repo.get_invoice_by_value("user_id", user_id)
            return jsonify(invoices=formatted_invoices, user=user_name), 200
        
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=f"Unexpected error: {str(error)}"), 500