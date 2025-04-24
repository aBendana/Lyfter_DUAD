import json
from pathlib import Path

class Data_Task:

    def __init__(self, identifier, name, description, status):
        self.identifier = identifier
        self.name = name
        self.description = description
        self.status = status


class SaveTask:

    def __init__(self):
        pass
        
    
    def json_data_exists(self, path):  
        
        validation = False
        file = Path(path)
        if file.exists():
            validation = True
        
        return validation


    def read(self, path):
        tasks_list = []
        if self.json_data_exists('tasks.json'):
            with open(path, "r", encoding="utf-8") as file:
                tasks_list = json.load(file)
        else:
            raise FileNotFoundError("json data not found")

        #print(tasks_list)
        return tasks_list


    def write_tasks_json(self, task, file_name):
        try:
            with open(file_name, 'w', encoding="utf-8") as file:
                json.dump(task, file, indent=4)
        except Exception as error:
            print(error)

