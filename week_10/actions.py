def create_student():
    print("")
    print("Please digit student's data:")
    
    #name and section data
    student_name = input("Student name: ")
    while (student_name == ""):
        print("\033[3;31mStudent name can't be a blank space\033[0m")
        student_name = input("Student name: ")

    student_section = input("Student section: ")
    while (student_section == ""):
        print("\033[3;31mSection can't be a blank space\033[0m")
        student_section = input("Student section: ")

    #grades data
    spanish_validation = True
    while spanish_validation == True:
        try:
            spanish_grade = int(input("Spanish grade: "))
            while((spanish_grade<0) or (spanish_grade>100)):
                print("\033[3;31mThe grade must be between 0 and 100\033[0m")
                spanish_grade = int(input("Spanish grade: "))
            spanish_validation = False
        except ValueError as error:
            print("\033[3;31mPlease ONLY numbers\033[0m")
            spanish_validation == True

    english_validation = True
    while english_validation == True:        
        try:
            english_grade = int(input("Englise grade: "))
            while((english_grade<0) or (english_grade>100)):
                print("\033[3;31mThe grade must be between 0 and 100\033[0m")
                english_grade = int(input("Englise grade: "))
            english_validation = False
        except ValueError as error:
            print("\033[3;31mPlease ONLY numbers\033[0m")
            english_validation == True

    social_validation = True
    while social_validation == True:        
        try:
            social_studies_grade = int(input("Social Studies grade: "))
            while((social_studies_grade<0) or (social_studies_grade>100)):
                print("\033[3;31mThe grade must be between 0 and 100\033[0m")
                social_studies_grade = int(input("Social Studies grade: "))
            social_validation = False
        except ValueError as error:
            print("\033[3;31mPlease ONLY numbers\033[0m")
            social_validation == True

    science_validation = True
    while science_validation == True:        
        try:
            science_grade = int(input("Science grade: "))
            while((science_grade<0) or (science_grade>100)):
                print("\033[3;31mThe grade must be between 0 and 100\033[0m")
                science_grade = int(input("Science grade: "))
            science_validation = False    
        except ValueError as error:
            print("\033[3;31mPlease ONLY numbers\033[0m")
            science_validation == True
        
    #average grade
    average_grade = (spanish_grade+english_grade+social_studies_grade+science_grade) / 4

    #student creation
    new_student = {
            'Student name': student_name, 
            'Student section': student_section, 
            'Spanish grade': spanish_grade,
            'English grade': english_grade,
            'Social Studies grade': social_studies_grade,
            'Science grade': science_grade,
            'Grade average': average_grade
            }                
        
    return new_student
        
        
def adding_student():        
    students = []
    
    validation = True
    while validation == True:
        new_student = create_student()
        students.append(new_student)
        
        decision = input("Do you want add other student? Type Y for Yes and N for No: ")
        while ((decision != "Y") and (decision != "N")):
            print("\033[3;31mOnly can type Y or N\033[0m")
            decision = input("Do you want add other student? Type Y for Yes and N for No: ")
        if (decision == "Y"):
            validation == True
        elif (decision == "N"):
            validation = False

    print("")    
    return students


def show_students():
    students = adding_student()
    for student in students:
        print("")
        for key, value in student.items():
            print(f"{key}: {value}")
    
    return students


def highers_averages():
    students = show_students()
    average_list = []
    for student in students:
        for key, value in student.items():
            if (key == "Grade average"):
                average_list.append(value)

    print(average_list)


def main():
    #create_student()
    #adding_student()
    #show_students()
    highers_averages()

main()