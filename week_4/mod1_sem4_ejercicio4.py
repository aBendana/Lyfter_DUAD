#Andrés Bendaña
#Módulo 1, Semana 4, Ejercicio 4

primer_num = int(input("Digite el primer número: "))
segundo_num = int(input("Digite el segundo número: "))
tercer_num = int(input("Digite el tercer número: "))

if ((primer_num > segundo_num) & (primer_num > tercer_num)):
    print(f"El número mayor es: {primer_num}")

elif (segundo_num > tercer_num):
    print(f"El número mayor es: {segundo_num}")

else:
    print(f"El número mayor es: {tercer_num}")