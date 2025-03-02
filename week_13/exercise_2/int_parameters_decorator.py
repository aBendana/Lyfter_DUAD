class Arguments:

    def __init__(self):
        pass


    def integers_counter(func):
        def the_verificator(*args):
            list_of_integers = func(*args)
            print("\nThis is the list of parameters")
            print(list_of_integers)
            
            for parameter in list_of_integers:
                try:
                    parameter_type = int(parameter)
                    print(f"\nYes, {parameter_type} is {type(parameter)}")
            
                except ValueError as error:
                    print(f"\nNo, {parameter} is a {type(parameter)}")
                    print(f'Value must be a integer. Error: {error}')

            return func
        return the_verificator    


    @integers_counter
    def only_integers(self,*args):
        print("This function have a bunch of instructions,\n but not today!")

        return args

def main():
    counting_integers = Arguments()
    counting_integers.only_integers(1, 2, "vaca", 4, 5, "gallina")


main()
