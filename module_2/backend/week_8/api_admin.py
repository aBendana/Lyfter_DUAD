from flask import Flask, Blueprint, request, jsonify, g
from jwt_manager import JWT_Manager
from flask import Blueprint, Flask, request, Response, jsonify
import requests
from repository_users import UsersRepository
from repository_carts import CartsRepository
from repository_fruits_in_cart import FruitsInCartRepository
from repository_invoices import InvoiceRepository
from repository_invoice_details import InvoiceDetailsRepository
from decorator_authenticator import admin_only
from api_fruits import show_fruits, get_fruit

jwt_manager = JWT_Manager('happylife', 'RS256')
users_repo = UsersRepository()
fruits_repo = UsersRepository()
carts_repo = CartsRepository()
fruits_in_repo = FruitsInCartRepository()
invoices_repo = InvoiceRepository()
invoice_details_repo = InvoiceDetailsRepository()

admin_bp = Blueprint('admin', __name__)

# login
@admin_bp.route("/admin/login", methods=['POST'])
def login():
    try:
        user_data = request.get_json()
        email = user_data.get('email')
        password = user_data.get('password')
        result = users_repo.get_user_by_credentials(user_data, 'email', 'password', email, password)
        user_id = result[0]["id"]
        rol_type = result[0]["rol"]
        token = jwt_manager.encode({'id':user_id, 'rol':rol_type})
        return jsonify(message="Successful Login!", token=token)
    
    except ValueError as error:
        msg = str(error)
        if "Info missing required" in msg:
            return jsonify(error = msg), 400
        elif "Wrong credentials" in msg:
            return jsonify(error = msg), 403
        else:
            return jsonify(error = msg), 422
    except Exception as error:
        return jsonify(error = str(error)), 500


# welcome
@admin_bp.route("/admin/dashboard", methods=['GET'])
@admin_only
def admin_dashboard():
    return jsonify(message="Welcome to the admin panel!")


# create a fruit
@admin_bp.route("/admin/fruits", methods=['POST'])
@admin_only
def create_fruit():
    fruit_data = request.get_json()
    fruit = requests.post("http://localhost:5000/fruits", json=fruit_data)
    return jsonify(fruit=fruit.json()),201


# show all fruits
@admin_bp.route("/admin/fruits", methods=['GET'])
@admin_only
def get_fruits():
    fruits = requests.get("http://localhost:5000/fruits")
    return jsonify(message="All fruits in the cellar", fruits=fruits.json()),200


# show a specific fruit
@admin_bp.route("/admin/fruits/<column>/<value>", methods=['GET'])
@admin_only
def get_fruit(column, value):
    fruit = requests.get(f"http://localhost:5000/fruits/{column}/{value}")
    return jsonify(message="Results", fruit=fruit.json()),200


