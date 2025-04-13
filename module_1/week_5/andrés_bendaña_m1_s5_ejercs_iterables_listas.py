#Andrés Bendaña
#Módulo 1, Semana 5, Ejercicios Iterables y Listas


print("EJERCICIO 1")

first_list = ["Hay", "en", "que", "iteracion", "indices", "muy"]
second_list = ["casos", "los", "la", "por", "es", "util"]

for index in range(0, len(first_list)):
    word = first_list[index] + " " + second_list[index]
    print(f"{word}")



print("")
print("")
print("")
print("EJERCICIO 2")

string_to_reverse = "Imprimiento esto en reversa"

for char in range(len(string_to_reverse), 0, -1): 
    letter = string_to_reverse[char-1]
    print(f"{letter}")



print("")
print("")
print("")
print("EJERCICIO 3")

my_list = ["a", 1, 2, 3, 4, 5, 6, "z"]
print(my_list)

new_first = my_list.pop(-1)
new_last = my_list.pop(0)

my_list.insert(0, new_first)
my_list.append(new_last)
print(my_list)



print("")
print("")
print("")
print("EJERCICIO 4")

my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
print(my_list)

for index, number in enumerate(my_list):
    if ((number % 2) != 0):
        my_list.pop(index)
    
print(my_list)



print("")
print("")
print("")
print("EJERCICIO 5")

print("Ingrese 10 números")
counter = 0
my_list = []
largest_number = 0

while (counter < 10):
    number = int(input(f"{counter+1}. "))
    my_list.insert(counter, number)

    if (number > largest_number):
        largest_number = number

    counter += 1

print(f"La lista es: {my_list}")
print(f"El número mayor es: {largest_number}")