import data

#for testing purposes
#global students
#students = data.read_students_csv


class Student():

    def __init__(self,name,section,spanish,english,social,science,average):
        self.student_name = name
        self.student_section = section
        self.spanish_grade = spanish
        self.english_grade = english
        self.social_studies_grade = social
        self.science_grade = science
        self.grade_average = average


def create_student():
    print("")
    print("Please digit student's data:")
    
    #name and section data
    name = input("Student name: ")
    while (name == ""):
        print("\033[3;31mStudent name can't be a blank space\033[0m")
        name = input("Student name: ")

    section = input("Student section: ")
    while (section == ""):
        print("\033[3;31mSection can't be a blank space\033[0m")
        section = input("Student section: ")

    #grades data
    spanish_validation = True
    while spanish_validation == True:
        try:
            spanish = int(input("Spanish grade: "))
            while((spanish<0) or (spanish>100)):
                print("\033[3;31mThe grade must be between 0 and 100\033[0m")
                spanish = int(input("Spanish grade: "))
            spanish_validation = False
        except ValueError as error:
            print("\033[3;31mPlease ONLY numbers\033[0m")
            spanish_validation == True

    english_validation = True
    while english_validation == True:        
        try:
            english = int(input("English grade: "))
            while((english<0) or (english>100)):
                print("\033[3;31mThe grade must be between 0 and 100\033[0m")
                english = int(input("English grade: "))
            english_validation = False
        except ValueError as error:
            print("\033[3;31mPlease ONLY numbers\033[0m")
            english_validation == True

    social_validation = True
    while social_validation == True:        
        try:
            social = int(input("Social Studies grade: "))
            while((social<0) or (social>100)):
                print("\033[3;31mThe grade must be between 0 and 100\033[0m")
                social = int(input("Social Studies grade: "))
            social_validation = False
        except ValueError as error:
            print("\033[3;31mPlease ONLY numbers\033[0m")
            social_validation == True

    science_validation = True
    while science_validation == True:        
        try:
            science = int(input("Science grade: "))
            while((science<0) or (science>100)):
                print("\033[3;31mThe grade must be between 0 and 100\033[0m")
                science = int(input("Science grade: "))
            science_validation = False    
        except ValueError as error:
            print("\033[3;31mPlease ONLY numbers\033[0m")
            science_validation == True
        
    #average grades
    average = (spanish+english+social+science) / 4

    #creating student
    new_student = Student(name,section,spanish,english,social,science,average)
    return new_student


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
    #print(students)
    return students


def show_students(students):
    counter = 0
    while counter < len(students):
        print(f"Student name: {students[counter].student_name}")
        print(f"Student section: {students[counter].student_section}")
        print(f"Spanish grade: {students[counter].spanish_grade}")
        print(f"English grade: {students[counter].english_grade}")
        print(f"Social Studies grade: {students[counter].social_studies_grade}")
        print(f"Science grade: {students[counter].science_grade}")
        print(f"Grade point average: {students[counter].grade_average}")
        print("")
        counter += 1


def highers_averages(students):
    student_name_list = []
    average_list = []
    outstanding_students_list = []
    higher_averages_list = []
    student_name_average_dic = {}
    three_higher_average_dic = {}
    
    #list for all the averages
    counter = 0
    while counter < len(students):
        student_name = students[counter].student_name
        grade_average = students[counter].grade_average
        student_name_list.append(student_name)
        average_list.append(float(grade_average))
        counter += 1
    
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
    student_name_list = []
    average_list = []

    #list for all the averages
    counter = 0
    while counter < len(students):
        student_name = students[counter].student_name
        grade_average = students[counter].grade_average
        student_name_list.append(student_name)
        average_list.append(float(grade_average))
        counter += 1

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




