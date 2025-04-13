#Andrés Bendaña
#Módulo 1, Semana 7, Ejercicio 1

menu = {
    0: "erase",
    1: "add",
    2: "subtrat",
    3: "multiply",
    4: "divide",
    5: "exit"
    }


def input_menu():
    validation = False

    for key, value in menu.items():
        print(key,value)
    print("")

    while (validation == False):
        try:
            option = int(input("Select a option: "))
            option_to_use = menu[option]
            validation = True
            return option, option_to_use
        except KeyError as error:
            print(f'The option does not exist. Error: {error}')
            print("Please repeat")
            validation = False 
        except ValueError as error:
            print(f'Option must be a number. Error: {error}')
            print("Please repeat")
            validation = False 


def input_value_2():
    validation = False
    while (validation == False):
        try:
            value_2 = int(input("Digit a second number: "))
            validation = True
            return value_2
        except ValueError as error:
            print(f'Value must be a number. Error: {error}')
            print("Please repeat")
            validation = False 


def actions():
    option = 0
    value_1 = 0

    while (option <= 5):
        print(f"The actual value is: {value_1}")
        (option, option_to_use) = input_menu()
        
        if (option == 1):
            value_2 = input_value_2()
            print(f"Operation: {value_1} {option_to_use} {value_2}")
            total = value_1 + value_2
            print(f"The total is {total}")
            value_1 = total
            print("")

        elif (option == 2):
            value_2 = input_value_2()
            print(f"Operation: {value_1} {option_to_use} {value_2}")
            total = value_1 - value_2
            print(f"The total is {total}")
            value_1 = total
            print("")
            
        elif (option == 3):
            value_2 = input_value_2()
            print(f"Operation: {value_1} {option_to_use} {value_2}")
            total = value_1 * value_2
            print(f"The total is {total}")
            value_1 = total
            print("")
        
        elif (option == 4):
            value_2 = input_value_2()
            print(f"Operation: {value_1} {option_to_use} {value_2}")
            total = value_1 / value_2
            print(f"The total is {total}")
            value_1 = total
            print("")

        elif (option == 5):
            print("Thanks for use this calculator!")
            exit()
            
        else:
            value_1 = 0


def main():
    actions()


main()    