from pathlib import Path
import csv


#Checking if students.csv exists
def exists_students_csv():
    global validation
    file = Path('students.csv')
    if file.exists():
        validation = True
    else:
        validation = False
    return validation


#creates students csv
def create_students_csv(path, data, headers):
    with open("students.csv", "w", encoding='utf-8') as file:
        writer = csv.DictWriter(file, headers)
        writer.writeheader()
        writer.writerows(data)

""""
#add new students to students.csv
def append_to_students_csv(path, data,headers):
    with open("students.csv", "a", encoding='utf-8') as file:
        writer = csv.DictWriter(file, headers)
        writer.writerows(data)"""

#read and import students info
def read_students_csv():
    with open("students.csv", "r") as file:
        print("")
        students_csv = csv.DictReader(file)
        students = [row for row in students_csv]
    print(students)
    return students


def main():
    read_students_csv()


main()
