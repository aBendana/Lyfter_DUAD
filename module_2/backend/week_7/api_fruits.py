from flask import Flask, Blueprint, request, jsonify
from repository_fruits import FruitsRepository
from decorator_authenticator import admin_only
from validations import Validations


fruits_repo = FruitsRepository()
fruit_validations = Validations()


fruits_bp = Blueprint('fruits', __name__)

# create (insert) fruit
@fruits_bp.route("/fruits", methods=['POST'])
@admin_only
def create_fruits():

    try:
        fruit_data = request.get_json()
        fruits_repo.new_fruit(fruit_data)
        return jsonify(message="Successful saved", fruit=fruit_data), 200
            
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500 


# create - insert many fruits 
@fruits_bp.route("/fruits/many", methods=['POST'])
@admin_only
def create_many_fruits():

    try:
        fruits_data = request.get_json()
        fruits_repo.many_new_fruits(fruits_data)
        return jsonify(message="Successful saved", fruit=fruits_data), 200
            
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500


# show fruits or show fruits by name, entry_date, price or quantity(query parameter)
@fruits_bp.route("/fruits", methods=['GET'])
def show_fruits():

    try:
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            # for date_entry use format yy-mm-dd (2025-7-1)
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
@fruits_bp.route("/fruits/<column>/<value>", methods=['GET'])
def get_fruit(column, value):
    
    try:
        formatted_fruits = fruits_repo.get_fruit_by_value(column, value)
    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_fruits ), 200



# update a fruit by path parameter fruit id or name (id or name can't be changed)
@fruits_bp.route("/fruits/<column>/<value>", methods=['PATCH'])
@admin_only
def update_fruits(column, value):


    try:
        fruit_data = request.get_json()
        
        # prevents 'fruit id' or 'fruit name' from being changed
        fruit_data.pop("id", None)
        fruit_data.pop("name", None)
        
        for fruit_key, fruit_value in fruit_data.items():
            column_modify = fruit_key
            new_value = fruit_value
            # updating
            fruits_repo.update_fruit(column, value, column_modify, new_value)

        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500
    


# update many fruits
@fruits_bp.route("/fruits/many/<column>", methods=['PATCH'])
@admin_only
def update_many_fruits(column):

    
    try:
        column_modify = column
        data_to_modify = request.get_json()
        fruits_repo.update_many_fruits(column_modify, data_to_modify)

        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500



# delete fruit by path parameter id or name
#preferably not to use, keep for reference and for related functionality of the db
@fruits_bp.route("/fruits/<column>/<value>", methods=['DELETE'])
@admin_only
def delete_fruit(column, value):
    
    try:
        fruits_repo.delete_fruit(column, value)
        return jsonify(fruit=value, message="Successful deleted"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  