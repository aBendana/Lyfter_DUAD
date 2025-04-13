#Andrés Bendaña
#Módulo 1, Semana 6, Ejercicio 3

list_to_sum = [4, 6, 2, 29,]


def sum_list(a_list):
    total_sum = 0
    for i in range(len(a_list)):
        total_sum = total_sum + a_list[i]
    return total_sum


def main():
    print(f"The total sum of the elements of the list is : {sum_list(list_to_sum)}")
    

main()