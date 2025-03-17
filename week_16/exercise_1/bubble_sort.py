import random


class BubbleSort:

    def __init__(self):
        pass


    def sorting_out(self, list_to_sort):

        if isinstance(list_to_sort, list):
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
                    return list_to_sort
                
        else: 
            raise TypeError("\033[3;31mONLY sort lists\033[0m")        

        return list_to_sort
        


#All this below for testing purpuses

# bb = BubbleSort()
# short_list = [50,30,85,100,45,20,10,5,9,78]
# print(bb.sorting_out(short_list))

# long_list = []
# counter = 0
# while counter <= 200:
#     element = random.randint(1, 1000)
#     long_list.append(element)
#     counter += 1
# print(bb.sorting_out(long_list))

#empty_list = []
#print(bb.sorting_out(empty_list))


#nah_tuple = (50,30,85,100,45,20,10,5,9,78)
#print(bb.sorting_out(nah_tuple))

#nah_dic = {20:2, 30:40, 1:100, 78:78, 79:80}
#print(bb.sorting_out(nah_dic))
