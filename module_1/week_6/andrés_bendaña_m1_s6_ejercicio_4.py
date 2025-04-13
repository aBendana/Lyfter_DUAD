#Andrés Bendaña
#Módulo 1, Semana 6, Ejercicio 4


def reverse_string(frase):

    for char in range(len(frase), 0, -1):
        letter = frase[char-1]
        print(f"{letter}")


def main():
    frase = input("Write a frase: ")
    reverse_string(frase)


main()