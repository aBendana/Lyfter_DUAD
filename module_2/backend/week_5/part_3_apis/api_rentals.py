from flask import Flask, Blueprint, request, jsonify
from api_db_connection import connection
from rental_repository import RentalsRepository
from validations import Validations


#app = Flask(__name__)

rentals_bp = Blueprint('rentals', __name__)
valid_rental = Validations()

# creating the connection with the db
db_manager = connection()
rentals_repo = RentalsRepository(db_manager)


# show rentals or show rental by make, model, status or year (query parameter)
@rentals_bp.route("/rentals", methods=['GET'])
def show_rentals():

    try:
        #formatted rentals is the list of car rentals
        formatted_rentals = rentals_repo.get_all()
        
        car_filter = request.args.get('car_id')
        user_filter = request.args.get('user_id')
        status_filter = request.args.get('status')

        if car_filter:
            formatted_rentals = rentals_repo.get_by_query_parameter('car_id', car_filter)
        elif user_filter:
            formatted_rentals = rentals_repo.get_by_query_parameter('user_id', user_filter)
        elif status_filter:
            formatted_rentals = rentals_repo.get_by_query_parameter('status', status_filter)

    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_rentals), 200


# get a car rental by id with path parameter
@rentals_bp.route("/rentals/<column>/<parameter>", methods=['GET'])
def get_rental(column, parameter):
    
    try:
        formatted_rental = rentals_repo.get_by_path_parameter(column, parameter)
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(formatted_rental ), 200


# create (save) rentals
@rentals_bp.route("/rentals", methods=['POST'])
def create_rentals():

    obligatory_car_info = ['car_id', 'user_id', 'status']
    # the rental status for the first time creation should be 'rentend' or 'reserved'
    valid_status = ['rented', 'reserved']
    status_parameter = "status"

    try:
        rental_data = request.get_json()
        valid_rental.not_need_parameter(rental_data, "id")
        valid_rental.complete_info(rental_data, obligatory_car_info)
        valid_rental.check_valid_type(rental_data, status_parameter, valid_status)
        rentals_repo.create(rental_data)
        
        return jsonify(message="Successful saved", rental=rental_data), 200
            

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# update a car rental by path parameter rental id (id and date can't be changed)
@rentals_bp.route("/rentals/<column>/<parameter>", methods=['PATCH'])
def update_rental(column, parameter):

    obligatory_rental_info = ['car_id', 'user_id', 'rental_date', 'status']
    valid_status = ['rented', 'reserved', 'completed', 'cancelled', 'incident']
    status_parameter = "status"
    
    try:
        formatted_rental = rentals_repo.get_by_path_parameter(column, parameter)
        rental_data = request.get_json()
        
        # prevents the 'car rental id' and 'rental date'  from being changed
        rental_data.pop("id", None)
        rental_data.pop("rental_date", None)

        # checking valid status
        if "status" in rental_data:
            valid_rental.check_valid_type(rental_data, status_parameter, valid_status)
        
        # preparing the update and not "" values allowed
        formatted_rental.update(rental_data)
        valid_rental.complete_info_update(formatted_rental, obligatory_rental_info)

        # updating
        rentals_repo.update(formatted_rental)

        return jsonify(message="Successful updated", rental=formatted_rental), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# **this end point ain't gonna be used in this homework**
# delete a rental by path parameter rental id
@rentals_bp.route("/rentals/<_id>", methods=['DELETE'])
def delete_rental(_id):
    
    try:
        rentals_repo.delete(_id)
        return jsonify(rental=_id, message="Successful delete"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  