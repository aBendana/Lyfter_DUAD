import random


class BubbleSort:

    def __init__(self):
        pass


    def sorting_out(self, list_to_sort):

        for exterior_index in range(0, len(list_to_sort) - 1):
            any_change = False

            for inside_index in range(0, (len(list_to_sort) -1 - exterior_index)):
                print(f"Comparison #({exterior_index},{inside_index}), between {list_to_sort[inside_index]} and {list_to_sort[inside_index + 1]}")
                current_value = list_to_sort[inside_index]
                next_value = list_to_sort[inside_index + 1]
                
                if current_value > next_value:
                    print(f"\033[3;31mChanging values position...{current_value} for {next_value}\033[0m")
                    list_to_sort[inside_index+1] = current_value
                    list_to_sort[inside_index] = next_value
                    any_change = True

            if any_change == False:
                return



list_to_sort = [70, -20, 3, 10**2, -1, 45, 75, 75]
sorting = BubbleSort()
sorting.sorting_out(list_to_sort)
print(list_to_sort)

print("")
list_almost_sort = [-1, -3, 1, 20, 10, 40, 50, 60]
sorting.sorting_out(list_almost_sort)
print(list_almost_sort)

#for testing purposes
# print("")
# random_list = []
# counter = 0
# while counter <= 100:
#     element = random.randint(1, 1000)
#     random_list.append(element)
#     counter += 1
# print(random_list)
# sorting.sorting_out(random_list)
# print(random_list)
