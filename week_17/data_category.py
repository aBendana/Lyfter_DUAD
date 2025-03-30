from pathlib import Path
import csv


#Checking if categories.csv exists
def categories_csv_exists():
    global validation
    file = Path('categories.csv')
    if file.exists():
        validation = True
    else:
        validation = False
    return validation


#creates categories csv
def create_categories_csv(path, data, headers):
    with open("categories.csv", "x", encoding='utf-8') as file:
        writer = csv.DictWriter(file, headers)
        writer.writeheader()
        writer.writerows(data)


#add new category to categories.csv
def write_to_categories_csv(path, data,headers):
    with open("categories.csv", "w", encoding='utf-8') as file:
        writer = csv.DictWriter(file, headers)
        writer.writeheader()
        writer.writerows(data)


#read and import categories info
def read_categories_csv():
    validation = categories_csv_exists()
    if validation == True:
        with open("categories.csv", "r") as file:
            print("")
            categories_csv = csv.DictReader(file)
            categories = [row for row in categories_csv]
            print(file.read())
    else:
        categories = []
    return categories

