#from data import read_students_csv
global students

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
            english_grade = int(input("English grade: "))
            while((english_grade<0) or (english_grade>100)):
                print("\033[3;31mThe grade must be between 0 and 100\033[0m")
                english_grade = int(input("English grade: "))
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
        
    #average grades
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


"""#creating student list from a csv file
def create_students():
    global students
    students = read_students_csv()
    return students"""


def adding_student(students):
    
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
    #return students


def show_students(students):
    #this print is for testing purposes, print(students)
    for student in students:
        print("")
        for key, value in student.items():
            print(f"{key}: {value}")


def highers_averages(students):
    student_name_list = []
    average_list = []
    outstanding_students_list = []
    higher_averages_list = []
    student_name_average_dic = {}
    three_higher_average_dic = {}
    
    #list for all the averages
    for student in students:
        for key, value in student.items():
            if (key == "Student name"):
                student_name_list.append(value)
            if (key == "Grade average"):
                average_list.append(float(value))
    
    #creating a list of higher averages
    for index in range(0,len(average_list)):
        higher_average = max(average_list)
        #index of the higher average
        average_index = average_list.index(higher_average)
        #adding higher average
        higher_averages_list.append(higher_average)
        #creating outstanding students list
        outstanding_student = student_name_list[average_index]
        outstanding_students_list.append(outstanding_student)
        #deleting the higher average
        student_name_list.pop(average_index)
        average_list.pop(average_index)
        
    #creating a dictionary of the higher averages
    student_name_average_dic = dict(zip(outstanding_students_list, higher_averages_list))
    three_higher_average_dic = dict(list(student_name_average_dic.items())[:3])

    print("")
    print("Top three averages:")  
    for key, value in three_higher_average_dic.items():
            print(f"{key} with an average of {value}")


def overall_averages(students):
    #students = highers_averages()
    student_name_list = []
    average_list = []

    #list for all the averages
    for student in students:
        for key, value in student.items():
            if (key == "Student name"):
                student_name_list.append(value)
            if (key == "Grade average"):
                average_list.append(value)

    #average of averages
    total_grade = 0.0
    for grade in average_list:
        total_grade = total_grade + float(grade)
    overall_average = total_grade / len(average_list)
    
    student_name_average_dic = dict(zip(student_name_list, average_list))
    student_name_average_dic["all averages"] = round(overall_average, 2)

    print("")
    print("All averages:")
    for key, value in student_name_average_dic.items():
        print(f"Average for {key} is {value}")

#this main was for testing purposes
#and futures changes
"""
def main():
    adding_student()
    show_students(students)
    highers_averages(students)
    overall_averages(students)


main()"""