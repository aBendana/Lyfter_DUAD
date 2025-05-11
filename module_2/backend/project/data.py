import json
from pathlib import Path


class SaveData:

    def __init__(self):
        pass
        
    
    def json_data_exists(self, path):  
        
        validation = False
        file = Path(path)
        if file.exists():
            validation = True
        
        return validation


    def read_data_json(self, path):
        data_list = []
        if self.json_data_exists(path):
            with open(path, "r", encoding="utf-8") as file:
                data_list = json.load(file)
        else:
            raise FileNotFoundError(f"{path} json data not found")

        #print(tasks_list)
        return data_list


    def write_data_json(self, data, path):
        try:
            with open(path, 'w', encoding="utf-8") as file:
                json.dump(data, file, indent=4)
        except Exception as error:
            print(error)

