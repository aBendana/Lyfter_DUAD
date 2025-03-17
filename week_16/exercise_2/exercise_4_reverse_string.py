#Módulo 1, Semana 6, Ejercicio 4


def reverse_string(phrase):

    reverse_phrase = ""
    for char in range(len(phrase), 0, -1):
        letter = phrase[char-1]
        reverse_phrase += letter
        print(f"{letter}")

    #print(reverse_phrase)
    return reverse_phrase


# def main():
#     frase = input("Write a frase: ")
#     reverse_string(frase)


# main()