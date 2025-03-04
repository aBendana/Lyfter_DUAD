class PrintWithDecorator:
    
    def __init__(self):
        pass


    def printing(func):
        def wrapper(self, *args, **kwargs):
            print("\nPerforming the decorated function...")
            result = func(self, *args, **kwargs)
            print(result)
            print("Finishing execution of the decorated function.")
            return result
        return wrapper


    @printing
    def numbers(self):
        print("I print numbers:")
        number_addition = 2+3
        number_subtraction = 10-2
        number_multiplication = 3*15
        number_division = 15/3
        return number_addition, number_subtraction, number_multiplication, number_division
    

    @printing
    def the_list(self):
        print("I print a list:")
        print_a_list = ["A", "list", "that", "needs", "to", "be", "printed"]
        return print_a_list
    

    @printing
    def the_dictionary(self):
        print("I print a dictionary:")
        print_a_dictionary ={
            0 : "A",
            1 : "dictionay",
            2 : "that",
            3 : "needs",
            4 : "to",
            5 : "be",
            6 : "printed"
        }
        return print_a_dictionary
    

def main(): 
    printing_functions = PrintWithDecorator()
    printing_functions.numbers()
    printing_functions.the_list()
    printing_functions.the_dictionary()


main()
