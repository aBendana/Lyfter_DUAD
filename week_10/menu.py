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
            actions.adding_student(students)
            print("\033[3;31mDon't forget to save the changes (option 5)\033[0m")
        elif option == 2:
            actions.show_students(students)
        elif option == 3:
            actions.highers_averages(students)
        elif option == 4:
            actions.overall_averages(students)
        elif option == 5:
            data.write_to_students_csv("students.csv", students, students[0].keys())
            print("Changes have been saved")
        elif option == 6:
            imported_students = data.read_students_csv()
            print(imported_students)
        elif (option == 7):
            print("Students grade control is ended\n ")
            exit()
            

""""
def main():
    excute_menu()

main()"""