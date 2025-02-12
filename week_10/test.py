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
        'average':65
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
    for student in students:
        for key, value in student.items():
            if (key == "name"):
                student_name_list.append(key, value)
            if (key == "average"):
                average_list.append(key, value)

    print(student_name_list)
    print(average_list)


def main():
    show_students(students)
    highers_averages(students)

main()