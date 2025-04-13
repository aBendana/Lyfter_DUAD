from pathlib import Path
import csv


class DataManagement:

    def __init__(self):
        pass


    #Checking if data.csv exists
    def data_csv_exists(self, path):  
        validation = False
        file = Path(path)
        if file.exists():
            validation = True
        
        return validation


    #creates data csv
    def create_data_csv(self, path, data):
        headers = list(data.__dict__.keys())
        with open(path, "x", newline='', encoding='utf-8') as file:
            writer = csv.writer(file, headers)
            writer.writerow(headers)
            writer.writerow(list(data.__dict__.values()))


    #add new data to data.csv
    def write_to_data_csv(self, path, data):
        with open(path, "a", newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(list(data.__dict__.values()))


    #read and import data info
    def read_data_csv(self, path):
        validation = DataManagement.data_csv_exists(self, path)
        if validation == True:
            with open(path, "r") as file:
                print("")
                data_csv = csv.DictReader(file)
                data = [row for row in data_csv]
                print(file.read())
        else:
            data = []
        return data
