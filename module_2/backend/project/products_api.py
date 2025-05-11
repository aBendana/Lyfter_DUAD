from flask import Flask, request, jsonify
from data import SaveData
from validations import Validations
from errors import ParameterError, Filter


app = Flask(__name__)

data = SaveData()
filtering = Filter()
valid_product = Validations()


# root endpoint
@app.route("/")
def root():
    return "<h1>Rocky Pet Shop Products!</h1>"


# show products and filter by category 
# and target_species with query parameters
@app.route("/products", methods=['GET'])
def show_products():

    try:
        products_list = data.read_data_json('products.json')
        category_filter = request.args.get('category')
        if category_filter:
            products_list = filtering.valid_filter(products_list, 'category', category_filter)
        
        target_species_filter = request.args.get('target_species')
        if target_species_filter:
            products_list = filtering.valid_filter(products_list, 'target_species', target_species_filter)

    
    except ParameterError as error:
        return jsonify(error = f" 'parameter', {error}"), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(products_list), 200


# get a product by id with path parameter
@app.route("/products/<product_id>", methods=['GET'])
def get_product(product_id):
    
    try:
        products_list = data.read_data_json('products.json')
        product = filtering.valid_filter(products_list, 'product_id', product_id)
    
    except ParameterError as error:
        return jsonify(error = f" 'product id', {error}"), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(product), 200


# save products
@app.route("/products", methods=['POST'])
def save_products():

    obligatory_product_info = ['product_id', 'name', 'category', 'description', 'target_species', 
                            'supplier', 'stock', 'cost', 'price']
    id_parameter = "product_id"
    valid_categories = ["food", "toys", "pharmacy", "accessories"]
    category_parameter = "category"
    integer_numbers = ["stock"]
    float_numbers =["cost", "price"]

    try:
        if data.json_data_exists('products.json'):
            products_list = data.read_data_json('products.json')
        else:
            products_list = []

        product_data = request.get_json()
        valid_product.complete_info(product_data, obligatory_product_info)
        valid_product.not_repeat_id(products_list, id_parameter, product_data)
        valid_product.check_valid_type(product_data, category_parameter, valid_categories)
        valid_product.valid_integer(product_data, integer_numbers)
        valid_product.valid_float(product_data, float_numbers)
        products_list.append(product_data)
        data.write_data_json(products_list, 'products.json')
        
        return jsonify(message="Successful saved", users=products_list), 200
            

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except TypeError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# update product by path parameter product_id (id can't be changed)
@app.route("/products/<product_id>", methods=['PATCH'])
def update_product(product_id):

    valid_categories = ["food", "toys", "pharmacy", "accessories"]
    category_parameter = "category"
    
    try:
        products_list = data.read_data_json('products.json')
        filtering.valid_filter(products_list, 'product_id', product_id)
        product_data = request.get_json()

        # prevents the 'product_id' from being changed
        product_data.pop("product_id", None)

        if "category" in product_data:
            valid_product.check_valid_type(product_data, category_parameter, valid_categories)
        if "stock" in product_data:
            valid_product.valid_integer(product_data, integer_numbers=["stock"])
        if "cost" in product_data:
            valid_product.valid_float(product_data, float_numbers=["cost"])
        if "price" in product_data:
            valid_product.valid_float(product_data, float_numbers=["price"])

        for index, product in enumerate(products_list):
            if product.get("product_id") == product_id:
                product.update(product_data)
                products_list[index] = product
                data.write_data_json(products_list, 'products.json')

                return jsonify(product), 200
    
    except ParameterError as error:
        return jsonify(error = f" 'product_id', {error}"), 400
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except TypeError as error:
        return jsonify(error=str(error)), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# delete a product by path parameter product_id
@app.route("/products/<product_id>", methods=['DELETE'])
def delete_product(product_id):
    
    try:
        products_list = data.read_data_json('products.json')
        filtering.valid_filter(products_list, 'product_id', product_id)
        for index, product in enumerate(products_list):
            if product.get("product_id") == product_id:
                products_list.pop(index)
                data.write_data_json(products_list, 'products.json')

        return jsonify(message="Successful delete", products=products_list), 200

    except ParameterError as error:
        return jsonify(error = f" 'id', {error}"), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error="Internal server error"), 500


if __name__ == "__main__":
    app.run(host="localhost", debug=True)  