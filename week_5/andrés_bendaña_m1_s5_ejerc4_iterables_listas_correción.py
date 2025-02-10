#Andrés Bendaña
#Módulo 1, Semana 5, Ejercicios Iterables y Listas
#EJERCICIO 4, CORRECCION


my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 10, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 11, 11, 11, 11,13,13]
print(my_list)

new_list = []
for index, number in enumerate(my_list):
    if ((number % 2) == 0):
        new_list.append(number)
    
my_list = new_list
print(my_list)