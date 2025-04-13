#Andrés Bendaña
#Módulo 1, Semana 6, Ejercicio 2


global_constant_variable = "I'm GLOBAL CONSTANT"
global_list = [1, 3, 5, 7, 9]


def from_inside():
    local_variable = "I'm LOCAL"
    print(f"From inside I call: {global_constant_variable}")
    print(f"From inside I call: {local_variable}")
    

def modify_global_list_1():
    global_list.append(11)
    for index in range(len(global_list)):
        global_list[index] = global_list[index] * 2
        index =+ 1
    print(f"First modification of GLOBAL LIST: {global_list}")


def modify_global_list_2():
    for index in range(len(global_list)):
        global_list[index] = global_list[index] + 4
        index =+ 1
    print(f"Second modification of GLOBAL LIST: {global_list}")


def main():
    from_inside()
    print("-")
    print(f"Original GLOBAL LIST: {global_list}")
    modify_global_list_1()
    modify_global_list_2()


main()

print("-")
#print(f"I call a {local_variable}")
print("From outside I CANNOT call LOCAL VARIABLE")
print(f"But from outside I CAN call: {global_constant_variable}")
print(f"From outside I call GLOBAL LIST: {global_list}")
print("The last modification of GLOBAL LIST was printed")