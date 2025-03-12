class BubbleSort:

    def __init__(self):
        pass


    def sorting_out(self, list_to_sort):

        counter = 0
        for exterior_index in range((len(list_to_sort)), 0, -1):
            #the print of the counter helps see the comparations
            print(counter)
            any_change = False

            for inside_index in range((len(list_to_sort) - 1), 0 + counter, -1):
                print(f"Comparison #({exterior_index},{inside_index}), between {list_to_sort[inside_index]} and {list_to_sort[inside_index - 1]}")
                current_value = list_to_sort[inside_index]
                previous_value = list_to_sort[inside_index - 1]
                
                if current_value < previous_value:
                    print(f"\033[3;31mChanging values position...{current_value} for {previous_value}\033[0m")
                    list_to_sort[inside_index-1] = current_value
                    list_to_sort[inside_index] = previous_value
                    any_change = True

            if any_change == False:
                return
            
            counter +=1



list_to_sort = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
sorting = BubbleSort()
sorting.sorting_out(list_to_sort)
print(list_to_sort)

print("")
print("")
list_almost_sort = [10, 20, 40, 30, 50, 60, 80, 70, 90, 100]
sorting.sorting_out(list_almost_sort)
print(list_almost_sort)