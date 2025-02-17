import actions
import data
import menu

global students

def opening():
    validation = data.exists_students_csv()
    if validation == False:
        print("At the moment there's not any students info,\nplease type your first list of students\nand then use all our features below:")
        print("""
        1. Add a student
        2. Show all students
        3. Top three averages
        4. All averages
        5. Update students CSV file
        6. Import CSV's student file
        7. Exit
        """)
        print("But first lets start!")
        actions.adding_student(students)
        print(students)
        data.create_students_csv("students.csv", students, students[0].keys())
        print("Now you can use all features")
        menu.execute_menu()
    else:
        print("\033[3;31mThere is already a students.csv file to be manipulated\033[0m")
        menu.execute_menu()


def main():
    opening()


main()        
