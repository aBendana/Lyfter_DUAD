students = []

def create_student():
    validation = True

    while validation == True:

        try:
            print("")
            print("Please digit student's data:")
            student_name = input("Student name: ")
            student_section = input("Student section: ")

            spanish_grade = int(input("Spanish note: "))
            english_grade = int(input("English note: "))
            social_studies_grade = int(input("Social Studies note: "))
            science_grade = int(input("Science note: "))
            average_grade = (spanish_grade+english_grade+social_studies_grade+science_grade) / 4

        except ValueError as error:
            print("Please ONLY numbers")

        new_student = {
            'name': student_name, 
            'section': student_section, 
            'spanish': spanish_grade,
            'english': english_grade,
            'social': social_studies_grade,
            'science': science_grade,
            'average': average_grade
            }                
                
        students.append(new_student)
        
        decision = input("Do you want add other student? Type Y for Yes and N for No: ")
        if (decision == "Y"):
            validation == True
        elif (decision == "N"):
            validation = False

    return students


create_student()
print("")
print(students)        