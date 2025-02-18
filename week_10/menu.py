import actions
import data

global students
students = data.read_students_csv()


def menu():
    global option

    print("""
        1. Add a student
        2. Show all students
        3. Top three averages
        4. All averages
        5. Update students CSV file
        6. Import CSV's student file
        7. Exit
        """)
    
    validation = True
    while validation == True:
        try:
            option = int(input("Choose an option: "))
            while((option<=0) or (option>8)):
                print("\033[3;31mOption must be number in the menu\033[0m")
                option = int(input("Choose an option: "))
            validation = False
        except ValueError as error:
            print("\033[3;31mPlease ONLY numbers\033[0m")
            validation == True
    
    return option
    

def execute_menu():
    validation = True
    while validation == True:
        option = menu()
        if option == 1:
            validation = data.exists_students_csv()
            if validation == False:
                print("\nAt the moment there's not any students info, please type your first list of students\nand then you can use all our features:")
                actions.adding_student(students)
                data.create_students_csv("students.csv", students, students[0].keys())
                print("Now you can use all features")
                validation = True
            else:
                actions.adding_student(students)
                print("\033[3;31mDon't forget to save your changes\033[0m")

        elif option == 2:
            validation = data.exists_students_csv()
            if validation == False:
                print("\nAt the moment there's not any students info, please choose option 1 to start\nand then you can use all our features.")
                validation = True
            else:
                actions.show_students(students)
        
        elif option == 3:
            validation = data.exists_students_csv()
            if validation == False:
                print("\nAt the moment there's not any students info, please choose option 1 to start\nand then you can use all our features.")
                validation = True
            else:
                actions.highers_averages(students)
        
        elif option == 4:
            validation = data.exists_students_csv()
            if validation == False:
                print("\nAt the moment there's not any students info, please choose option 1 to start\nand then you can use all our features.")
                validation = True
            else:
                actions.overall_averages(students)
        
        elif option == 5:
            validation = data.exists_students_csv()
            if validation == False:
                print("\nThere's any data to save, please choose option 1 to start\nand then you can use all our features.")
                validation = True
            else:
                data.write_to_students_csv("students.csv", students, students[0].keys())
                print("Changes have been saved")
        
        elif option == 6:
            validation = data.exists_students_csv()
            if validation == False:
                print("\nstudents.csv doesn't exists, please choose option 1 to start\nand then you can use all our features.")
                validation = True
            else:
                imported_students = data.read_students_csv()
                print(imported_students)
                print("\nImportant: If you don't see the last info added is because you don't save it\nbut you can still do it (option 5).")
        
        elif (option == 7):
            print("Students grade control is ended\n ")
            exit()
