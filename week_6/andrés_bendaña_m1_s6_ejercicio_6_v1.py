#Andrés Bendaña
#Módulo 1, Semana 6, Ejercicio 6

programming_words = "python-variable-function-computer-monitor"

def from_string_to_list(a_string):
    programming_words_list = []
    word = ""
    programming_words_in_order = ""

    for index, letter in enumerate(programming_words):
            if (letter != "-"):
                word += letter
            else:
                programming_words_list.append(word)
                word = ""
    programming_words_list.append(word)
    print("The string converted to a list:")
    print(programming_words_list)
    print("")

    programming_words_list.sort()
    print("This is the list in alphabetical order:")
    print(programming_words_list)
    print("")

    for index, word in enumerate(programming_words_list):
        if (index != (len(programming_words_list)-1)):
            programming_words_in_order += (word + "-")
        else:
            programming_words_in_order += word
    print("This is the final string in alphabetical order:")
    print(programming_words_in_order)
    print("")


print("The original string:")
print(programming_words)
print("")
from_string_to_list(programming_words)
