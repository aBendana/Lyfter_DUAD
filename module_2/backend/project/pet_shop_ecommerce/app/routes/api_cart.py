from flask import Flask, Blueprint, request, jsonify, g
from app.infrastructure.security.jwt_manager import JWT_Manager
from app.repositories.repository_products import ProductsRepository
from app.repositories.repository_carts import CartsRepository
from app.repositories.repository_products_in_cart import ProductsInCartRepository
from app.utils.transactions import Transactions
from app.utils.cache_manager import CacheManager
from app.infrastructure.security.decorator_authenticator import client_only

products_repo = ProductsRepository()
carts_repo = CartsRepository()
products_in_cart_repo = ProductsInCartRepository()
transactions = Transactions()
cache_manager = CacheManager()

cart_bp = Blueprint('cart', __name__)

# before create a cart, in api_products:
# 1. show products end point
# 2. get a product by id
@cart_bp.route("/cart", methods=["POST"])
@client_only
def create_and_fill_cart():
    try:
        user_id = g.user_id
        user_name = g.user_name
        product_in_data = request.get_json()
        product_id = product_in_data.get("product_id")
        quantity_purchased = product_in_data.get("quantity")
        if not product_id or not quantity_purchased:
            raise ValueError("Product id and quantity are required")
        
        # validate product exists
        product_exists = cache_manager.check_key(f"fruit:{product_id}")
        if not product_exists:
            products_repo.get_product_by_value("id", product_id)

        cart = carts_repo.get_cart_by_two_values("user_id", "status", user_id, "pending")

        # create a new cart if no pending cart exists
        if not cart:
            cart = carts_repo.new_cart({"user_id":user_id, "status":"pending"})
            cart_id = cart["id"]
        else:
            cart_id = cart[0]["id"]

        # update product quantity in storage
        transactions.update_take_from_stock(product_id, quantity_purchased)
        
        # delete cache by id, pattern and pagination if exists
        cache_manager.invalidate_cache_page("products", "id", int(product_id))
        cache_manager.invalidate_cache_by_id("product", "id", product_id)
        cache_manager.delete_data_with_pattern("products:*")

        # for fulfill the cart with products has to be done one by one
        products_in_cart_repo.new_product_in_cart({"cart_id":cart_id, "product_id":product_id, "quantity":quantity_purchased})

        return jsonify(message="Product added to shopping cart", user=user_name), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=f"Unexpected error: {str(error)}"), 500


@cart_bp.route("/cart", methods=["GET"])
@client_only
def show_actual_cart():
    try:
        user_id = g.user_id
        user_name = g.user_name

        # show a pending cart with it details.
        cart = carts_repo.get_cart_by_two_values("user_id", "status", user_id, "pending")
        if not cart:
            raise ValueError (f"{user_name} doesn't have an active cart")
        
        cart_id = cart[0]["id"]
        cart_details = products_in_cart_repo.get_product_in_cart_by_value("cart_id", cart_id)
        return jsonify(cart=cart, cart_details=cart_details, user=user_name), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=f"Unexpected error: {str(error)}"), 500


@cart_bp.route("/cart/item", methods=["PATCH"])
@client_only
def update_quantity_item():
    try:
        user_id = g.user_id
        user_name = g.user_name
        product_update = request.get_json()
        product_id = product_update.get("product_id")
        new_quantity = product_update.get("quantity")
        if not product_id or new_quantity is None:
            raise ValueError("Product id and new quantity are required")

        # get the pending cart of the user
        cart = carts_repo.get_cart_by_two_values("user_id", "status", user_id, "pending")
        if not cart:
            raise ValueError("No pending cart found")
        cart_id = cart[0]["id"]

        # get the product in cart
        product_in_cart = products_in_cart_repo.get_product_in_cart_by_two_values("cart_id", "product_id", cart_id, product_id)
        if not product_in_cart:
            raise ValueError("Product not found in the cart")
        product_in_cart_id = product_in_cart[0]["id"]
        current_quantity = product_in_cart[0]["quantity"]

        # update product stock in storage
        transactions.stock_logic(current_quantity, new_quantity, product_id, product_in_cart_id)

        # delete cache by id, pattern and pagination if exists
        cache_manager.invalidate_cache_page("products", "id", int(product_id))
        cache_manager.invalidate_cache_by_id("product", "id", product_id)
        cache_manager.delete_data_with_pattern("products:*")

        # update the product quantity in the cart
        # products_in_cart_repo.update_product_in_cart("id", product_in_cart_id, "quantity", new_quantity)

        if new_quantity == 0:
            return jsonify(message="Item removed from cart", user=user_name), 200
        else:
            return jsonify(message="Item's quantity updated", user=user_name), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=f"Unexpected error: {str(error)}"), 500


@cart_bp.route("/cart/item/<product_id>", methods=["DELETE"])
@client_only
def delete_item_from_cart(product_id):
    try:
        user_id = g.user_id
        user_name = g.user_name

        # get the pending cart of the user
        cart = carts_repo.get_cart_by_two_values("user_id", "status", user_id, "pending")
        if not cart:
            raise ValueError("No pending cart found")
        cart_id = cart[0]["id"]

        # get the product in cart
        product_in_cart = products_in_cart_repo.get_product_in_cart_by_two_values("cart_id", "product_id", cart_id, product_id)
        if not product_in_cart:
            raise ValueError("Product not found in the cart")
        
        # update product stock in storage
        current_quantity = product_in_cart[0]["quantity"]
        transactions.update_add_to_stock(product_id, current_quantity)

        # delete cache by id, pattern and pagination if exists
        cache_manager.invalidate_cache_page("products", "id", int(product_id))
        cache_manager.invalidate_cache_by_id("product", "id", product_id)
        cache_manager.delete_data_with_pattern("products:*")

        # delete the product from cart
        products_in_cart_repo.delete_product_in_cart("id", product_in_cart[0]["id"])

        return jsonify(user=user_name, message="Product removed from cart"), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=f"Unexpected error: {str(error)}"), 500
