#Andrés Bendaña
#Módulo 1, Semana 4, Ejercicio 3

import random

numero_aleatorio = 0
numero_digitado = 1

while (numero_aleatorio != numero_digitado):
    numero_aleatorio = random.randint(1,10)
    numero_digitado =int(input("Digite un número entre 1 y 10: "))
    
    print(f"El número aleatorio es: {numero_aleatorio}")
    print(f"Tú número es: {numero_digitado}")
    print("")

print("Finalmente has adivinado")

