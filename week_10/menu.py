import actions
import data
global students
students = actions.create_students()

def menu():
    global option

    print("""
        1. Add a student
        2. Show all students
        3. Top three averages
        4. All averages
        5. Export or add to a CSV file students info
        6. Import CSV's student file
        8. Want to know if there's a CSV file already exported?
        9. Exit
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
    

def excute_menu():
    validation = True
    while validation == True:
        option = menu()
        if option == 1:
            actions.adding_student(students)
        elif option == 2:
            actions.show_students(students)
        elif option == 3:
            actions.highers_averages(students)
        elif option == 4:
            actions.overall_averages(students)
        elif option == 5:
            exists = data.exists_students_csv()
            data.create_students_csv("students.csv", students, students[0].keys())
        elif (option == 8):
            print("Students grade control is ended")
            exit()
            


def main():
    excute_menu()

main()