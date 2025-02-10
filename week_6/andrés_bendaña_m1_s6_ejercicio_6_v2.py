#Andrés Bendaña
#Módulo 1, Semana 6, Ejercicio 6

programming_words = "python-variable-function-computer-monitor"
programming_words_list = []

def from_string_to_list(a_string):
    word = ""
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
    return programming_words_list

    
def sort_the_list_alphabetically(a_list):  
    programming_words_list_sorted = programming_words_list
    programming_words_list_sorted.sort()
    return programming_words_list_sorted


def from_sorted_list_to_sorted_string():
    programming_words_list_sorted = sort_the_list_alphabetically(programming_words_list)
    print("This is the list in alphabetical order:")
    print(programming_words_list_sorted)
    print("")
    
    programming_words_sorted = ""
    for index, word in enumerate(programming_words_list_sorted):
        if (index != (len(programming_words_list_sorted)-1)):
            programming_words_sorted += (word + "-")
        else:
            programming_words_sorted += word

    print("This is the final string in alphabetical order:")
    print(programming_words_sorted)
    print("")


def main():
    print("This is the original string:")
    print(programming_words)
    print("")
    from_string_to_list(programming_words)
    sort_the_list_alphabetically(programming_words_list)
    from_sorted_list_to_sorted_string()


main()
