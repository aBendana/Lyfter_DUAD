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
    def create_data_csv(self, path, data, headers):
        with open(path, "x", encoding='utf-8') as file:
            writer = csv.DictWriter(file, headers)
            writer.writeheader()
            writer.writerows(data)


    #add new data to data.csv
    def write_to_data_csv(self, path, data, headers):
        with open(path, "w", encoding='utf-8') as file:
            writer = csv.DictWriter(file, headers)
            writer.writeheader()
            writer.writerows(data)


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
