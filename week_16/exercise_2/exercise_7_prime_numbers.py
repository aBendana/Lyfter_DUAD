#Módulo 1, Semana 6, Ejercicio 7


#list_of_numbers = [1, 4, 6, 7, 13, 9, 67, 8, 27, 271, 273, 191, 5, 47, 48, 2, 419]

def verify_prime_numbers(list_of_numbers):
    verification = False
    prime_numbers_list = []
    
    for i, number in enumerate(list_of_numbers):

        for index in range(2, number):
            if ((number % index) == 0):
                #print("I'm going ok")
                verification = False
                break
            else:
                verification = True
        
        if (verification == True):
            prime_numbers_list.append(number)

    return prime_numbers_list


# def main():
#     print(verify_prime_numbers(list_of_numbers))


# main()
