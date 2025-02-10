#Andrés Bendaña
#Módulo 1, Semana 4, Ejercicios Extra 2
#Ejercicios de Semana 3

print("EJERCICIOS SEMANA 3")
print("")
#Ejercicio 1 son los pseudocódigos de la Semana 2, ya efectuados
#Ejercicio 2 de la Semana 3 es igual a Ejercicio 3 de la Semana 4
print("EJERCICIO 3")

print("Ingrese tres números:")
primer_numero = int(input("Primer número: "))
segundo_numero = int(input("Segundo número: "))
tercer_numero = int(input("Tercer número: "))
suma = primer_numero + segundo_numero + tercer_numero

if (primer_numero == 30 or segundo_numero == 30 or tercer_numero == 30 or suma == 30):
    print(f"CORRECTO, si hay un 30 en tus números o en la suma de ellos")
else:
    print(f"INCORRECTO, no hay un 30 en tus números ni en la suma de ellos")



print("")
print("")
print("")
print("EJERCICIO EXTRA 1 y 4")
#Son ejercicios similares nada mas cambia la cantidad de números a comparar
#La lógica se ajusta para "n" números

contador = 0
maximo = 0
numeros_a_comparar = int(input("Digite la cantidad de números a comparar: "))

while(contador < numeros_a_comparar):
    numero = int(input("Ingrese un número: "))
    
    if(numero > maximo):
        maximo = numero
    
    contador = contador + 1

print(f"El número mayor es {maximo}")



print("")
print("")
print("")
print("EJERCICIO EXTRA 2")

numero = int(input("Ingrese un número: "))

if((numero % 3 == 0) & (numero % 5 == 0)):
    print(f"'FizzBuzz!' {numero} es divible por 3 y 5")
elif(numero % 3 == 0):
    print(f"'Fizz!' {numero} es divible por 3")
elif(numero % 5 == 0):
    print(f"'Buzz!' {numero} es divible por 5")
else:
    print(f"{numero} no es divible ni por 3 ni por 5")



print("")
print("")
print("")
print("EJERCICIO EXTRA 3")

contador = 0
sumatoria = 0
total_de_numeros = int(input("Ingrese la cantidad de números que desea sumar: "))
print(f"Ingrese {total_de_numeros} números!")

while (contador < total_de_numeros):
    numero = int(input(f"Ingrese un número:({contador+1}) "))
    sumatoria = sumatoria + numero
    contador = contador + 1

print(f"La suma total es de: {sumatoria}")