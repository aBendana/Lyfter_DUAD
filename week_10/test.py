students = [
    {
        'name':"perro",
        'section':"casita",
        'spanish':100,
        'english':50,
        'social':30,
        'science':20,
        'average':100
    },
    {
        'name':"chancho",
        'section':"chozita",
        'spanish':50,
        'english':35,
        'social':45,
        'science':65,
        'average':75
    },
    {
        'name':"vaco",
        'section':"pueblita",
        'spanish':100,
        'english':100,
        'social':35,
        'science':45,
        'average':90
    },
    {
        'name':"coco",
        'section':"playita",
        'spanish':100,
        'english':30,
        'social':35,
        'science':10,
        'average':89
    },
    {
        'name':"fufo",
        'section':"fufera",
        'spanish':100,
        'english':80,
        'social':35,
        'science':70,
        'average':95
    },
]


def show_students(students):
    for student in students:
        print("")
        for key, value in student.items():
            print(f"{key}: {value}")


def highers_averages(students):
    student_name_list = []
    average_list = []
    outstanding_students_list = []
    higher_averages_list = []
    
    #list for all the averages
    for student in students:
        for key, value in student.items():
            if (key == "name"):
                student_name_list.append(value)
            if (key == "average"):
                average_list.append(value)
    
    #three higher averages
    for index in range(0,len(average_list)):
        higher_average = max(average_list)
        #index of the higher average
        average_index = average_list.index(higher_average)
        #creating outstanding students list
        outstanding_student = student_name_list[average_index]
        outstanding_students_list.append(outstanding_student)
        #deleting the higher average
        student_name_list.pop(average_index)
        average_list.pop(average_index)
        higher_averages_list.append(higher_average)

    

    print(student_name_list)
    print(average_list)
    print(outstanding_students_list)
    print(higher_averages_list)

    length = len(outstanding_students_list)
    print(length)


def main():
    #show_students(students)
    highers_averages(students)

main()