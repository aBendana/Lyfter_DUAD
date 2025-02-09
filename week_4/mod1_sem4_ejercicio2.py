#Andrés Bendaña
#Módulo 1, Semana 4, Ejercicio 2

nombre = input("Digite su nombre: ")
apellido = input("Digite su apellido: ")
edad = int(input("Cuál es su edad en años: "))

if (edad <= 5):
    print("Su edad es de bebé")

elif ((edad >= 6) & (edad <= 12)):
    print("Su edad es de niño")

elif ((edad >= 13) & (edad <= 15)):
    print("Su edad es de preadolescente")

elif ((edad >= 16) & (edad <= 20)):
    print("Su edad es de adolescente")

elif ((edad >= 21) & (edad <= 35)):
    print("Su edad es de adulto joven")

elif ((edad >= 36) & (edad <= 59)):
    print("Su edad es de adulto")

else:
    print("Su edad es de adulto mayor")