#Módulo 1, Semana 6, Ejercicio 5


def count_capital_letter(frase):
    
    capital_counter = 0
    capital_list = []
    for char in range(len(frase)):
        letter = frase[char]
        if letter.isupper():
            capital_list.append(letter)
            capital_counter += 1
    
    print(capital_list)
    print(f"There are {capital_counter} capital letters in the frase")

    return capital_counter
            

def count_lowercase_letter(frase):
    
    lowercase_counter = 0
    lowercase_list = []
    for char in range(len(frase)):
        letter = frase[char]
        if letter.islower():
            lowercase_list.append(letter)
            lowercase_counter += 1

    print(" ")
    print(lowercase_list)
    print(f"There are {lowercase_counter} lowercase letters in the frase")

    return lowercase_counter


# def main():
#     #Don't use "&" symbol, 
#     #With most symbols the program works fine
#     frase = input("Write a frase: ")
#     count_capital_letter(frase)
#     count_lowercase_letter(frase)


# main()