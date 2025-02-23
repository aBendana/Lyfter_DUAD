from pathlib import Path
import csv
import actions


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
    with open("students.csv", "x", encoding='utf-8') as file:
        writer = csv.DictWriter(file, headers)
        writer.writeheader()
        writer.writerows(data)


#add new students to students.csv
def write_to_students_csv(path, data,headers):
    with open("students.csv", "w", encoding='utf-8') as file:
        writer = csv.DictWriter(file, headers)
        writer.writeheader()
        writer.writerows(data)


#read and import students info
def read_students_csv():
    list_values = []
    students_obj = []
    
    validation = exists_students_csv()
    if validation == True:
        with open("students.csv", "r") as file:
            print("")
            students_csv = csv.DictReader(file)
            students = [row for row in students_csv]
            #print(file.read())
            #print("CSV file read in dictionary format:\n(*only for reading visual purposes*)\n")
            #print(students)
        
            for student_dic in students:
                for key, value in enumerate(student_dic.values()):
                    #print(value)
                    list_values.append(value)
                    #print(list_values)

                name = list_values[0]
                section = list_values[1]
                spanish = list_values[2]
                english = list_values[3]
                social = list_values[4]
                science = list_values[5]
                average = list_values[6]
                student = actions.Student(name,section,spanish,english,social,science,average)
                students_obj.append(student)
                list_values = []
        
    else:
        students_obj = []
    return students_obj