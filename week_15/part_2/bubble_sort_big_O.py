class BubbleSort: # O(1)

    def __init__(self): # O(1)
        pass # O(1)


    def sorting_out(self, list_to_sort): # O(n^2)

        for exterior_index in range(0, len(list_to_sort) - 1): # O(n)
            any_change = False # O(1)

            for inside_index in range(0, (len(list_to_sort) -1 - exterior_index)): # O(n^2)
                print(f"Comparison #({exterior_index},{inside_index}), between {list_to_sort[inside_index]} and {list_to_sort[inside_index + 1]}") # O(1)
                current_value = list_to_sort[inside_index] # O(1)
                next_value = list_to_sort[inside_index + 1] # O(1)
                
                if current_value > next_value: # O(1)
                    print(f"\033[3;31mChanging values position...{current_value} for {next_value}\033[0m") # O(1)
                    list_to_sort[inside_index+1] = current_value # O(1)
                    list_to_sort[inside_index] = next_value # O(1)
                    any_change = True # O(1)

            if any_change == False: # O(1)
                return # O(1)



list_to_sort = [70, -20, 3, 10**2, -1, 45, 75, 75] # O(1)
sorting = BubbleSort() # O(1)
sorting.sorting_out(list_to_sort) # O(n^2)
print(list_to_sort) # O(1)

print("") # O(1)
list_almost_sort = [-1, -3, 1, 20, 10, 40, 50, 60] # O(1)
sorting.sorting_out(list_almost_sort) # O(n^2)
print(list_almost_sort) # O(1)
