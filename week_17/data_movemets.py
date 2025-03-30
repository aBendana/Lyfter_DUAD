from pathlib import Path
import csv


#Checking if movements.csv exists
def movements_csv_exists():
    validation = False
    file = Path('movements.csv')
    if file.exists():
        validation = True
    
    return validation


#creates movements csv
def create_movements_csv(path, data, headers):
    with open("movements.csv", "x", encoding='utf-8') as file:
        writer = csv.DictWriter(file, headers)
        writer.writeheader()
        writer.writerows(data)


#add new movements to movements.csv
def write_to_movements_csv(path, data, headers):
    with open("movements.csv", "w", encoding='utf-8') as file:
        writer = csv.DictWriter(file, headers)
        writer.writeheader()
        writer.writerows(data)


#read and import movements info
def read_movements_csv():
    validation = movements_csv_exists()
    if validation == True:
        with open("movements.csv", "r") as file:
            print("")
            movements_csv = csv.DictReader(file)
            movements = [row for row in movements_csv]
            print(file.read())
    else:
        movements = []
    return movements

