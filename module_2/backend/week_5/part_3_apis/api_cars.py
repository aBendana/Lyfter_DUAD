from flask import Flask, Blueprint, request, jsonify
from api_db_connection import connection
from cars_repository import CarsRepository
from validations import Validations


#app = Flask(__name__)

cars_bp = Blueprint('cars', __name__)
valid_car = Validations()

# creating the connection with the db
db_manager = connection()
cars_repo = CarsRepository(db_manager)


# show cars or show cars by make, model, status or year (query parameter)
@cars_bp.route("/cars", methods=['GET'])
def show_cars():

    try:
        #formatted cars is the list of cars
        formatted_cars = cars_repo.get_all()
        
        make_filter = request.args.get('make')
        model_filter = request.args.get('model')
        year_filter = request.args.get('year')
        status_filter = request.args.get('status')

        if make_filter:
            formatted_cars = cars_repo.get_by_query_parameter('make', make_filter)
        elif model_filter:
            formatted_cars = cars_repo.get_by_query_parameter('model', model_filter)
        elif year_filter:
            formatted_cars = cars_repo.get_by_query_parameter('year', year_filter)
        elif status_filter:
            formatted_cars = cars_repo.get_by_query_parameter('status', status_filter)

    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_cars), 200


# get a car by id with path parameter
@cars_bp.route("/cars/<column>/<parameter>", methods=['GET'])
def get_car(column, parameter):
    
    try:
        formatted_car = cars_repo.get_by_path_parameter(column, parameter)
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_car ), 200


# create (save) cars
@cars_bp.route("/cars", methods=['POST'])
def create_cars():

    obligatory_car_info = ['make', 'model', 'year', 'status']
    valid_status = ['available', 'rented', 'reserved', 'in maintenance', 'out of use']
    status_parameter = "status"

    try:
        car_data = request.get_json()
        valid_car.not_need_parameter(car_data, "id")
        valid_car.complete_info(car_data, obligatory_car_info)
        valid_car.check_valid_type(car_data, status_parameter, valid_status)
        cars_repo.create(car_data)
        
        return jsonify(message="Successful saved", car=car_data), 200
            

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# update a car by path parameter car id (id can't be changed)
@cars_bp.route("/cars/<column>/<parameter>", methods=['PATCH'])
def update_car(column, parameter):

    obligatory_car_info = ['make', 'model', 'year', 'status']
    valid_status = ['available', 'rented', 'reserved', 'in maintenance', 'out of use']
    status_parameter = "status"
    
    try:
        formatted_car = cars_repo.get_by_path_parameter(column, parameter)
        car_data = request.get_json()
        
        # prevents the 'car id' from being changed
        car_data.pop("id", None)

        # checking valid status
        if "status" in car_data:
            valid_car.check_valid_type(car_data, status_parameter, valid_status)
        
        # preparing the update and not "" values allowed
        formatted_car.update(car_data)
        valid_car.complete_info_update(formatted_car, obligatory_car_info)
        
        # updating
        cars_repo.update(formatted_car)

        return jsonify(message="Successful updated", car=formatted_car), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# **this end point ain't gonna be used in this homework**
# delete a car by path parameter car id
@cars_bp.route("/cars/<_id>", methods=['DELETE'])
def delete_car(_id):
    
    try:
        cars_repo.delete(_id)
        return jsonify(car=_id, message="Successful delete"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  