from flask import Flask, request, jsonify
from functools import wraps
from data_tasks import SaveTask
from validations import ParameterError, Filter, TaskValidations


app = Flask(__name__)

data = SaveTask()
filtering = Filter()
#task_info = TaskInfo()
task_valid = TaskValidations()


# # decorator that reads tasks from .json
# def read_tasks_json(func):
#     @wraps(func)
#     def wrapper(*args, **kwargs):
#         tasks_list = data.read('tasks.json')
#         return func(tasks_list, *args, **kwargs)
#     return wrapper


# root endpoint
@app.route("/")
def root():
    return "<h1>API Tasks!</h1>"


# show tasks endpoint with query parameters
@app.route("/tasks", methods=['GET'])
#@read_tasks_json
def obtain_tasks():

    try:
        tasks_list = data.read('tasks.json')
        status_filter = request.args.get('status')
        if status_filter:
            tasks_list = filtering.valid_filter(tasks_list, 'status', status_filter)

    
    except ParameterError as error:
        return jsonify(error = f" 'status', {error}"), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(tasks_list), 200


# get a specific task by id with path parameter
@app.route("/tasks/<id>", methods=['GET'])
#@read_tasks_json
def get_task(id):
    
    try:
        tasks_list = data.read('tasks.json')
        task = filtering.valid_filter(tasks_list, 'id', id)
    
    except ParameterError as error:
        return jsonify(error = f" 'id', {error}"), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error = str(error)), 500
    
    return jsonify(task), 200


# write in json file
@app.route("/tasks", methods=['POST'])
#@read_tasks_json
def write_tasks():

    try:
        if data.json_data_exists('tasks.json'):
            tasks_list = data.read('tasks.json')
        else:
            tasks_list = []

        task_data = request.get_json()
        task_valid.complete_task_info(task_data)
        task_valid.not_repeat_id(tasks_list, task_data)
        task_valid.check_valid_status(task_data)
        tasks_list.append(task_data)
        data.write_tasks_json(tasks_list, 'tasks.json')
        
        return jsonify(tasks_list), 201
            

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# update a task by path parameter id (id can't be changed)
@app.route("/tasks/<id>", methods=['PATCH'])
#@read_tasks_json
def update_task(id):

    try:
        tasks_list = data.read('tasks.json')
        filtering.valid_filter(tasks_list, 'id', id)
        task_data = request.get_json()
        # prevents the 'id' from being changed
        task_data.pop("id", None)
        task_valid.check_valid_status(task_data)
        for index, task in enumerate(tasks_list):
            if task.get("id") == id:
                task.update(task_data)
                tasks_list[index] = task
                data.write_tasks_json(tasks_list, 'tasks.json')

                return jsonify(task), 200
    
    except ParameterError as error:
        return jsonify(error = f" 'id', {error}"), 400
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# delete a task by path parameter id
@app.route("/tasks/<id>", methods=['DELETE'])
#@read_tasks_json
def delete_task(id):
    
    try:
        tasks_list = data.read('tasks.json')
        filtering.valid_filter(tasks_list, 'id', id)
        for index, task in enumerate(tasks_list):
            if task.get("id") == id:
                tasks_list.pop(index)
                data.write_tasks_json(tasks_list, 'tasks.json')

        return jsonify(message="Successful delete", tasks=tasks_list), 200

    except ParameterError as error:
        return jsonify(error = f" 'id', {error}"), 400
    except FileNotFoundError as error:
        return jsonify(error = str(error)), 404
    except Exception as error:
        return jsonify(error="Internal server error"), 500


if __name__ == "__main__":
    app.run(host="localhost", debug=True)  