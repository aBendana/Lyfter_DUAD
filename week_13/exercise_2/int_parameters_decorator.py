class Arguments:

    def __init__(self):
        pass


    def integers_counter(func):
        def wrapper(self, *args, **kwargs):
            print("\nPerforming the decorated function...")
            result = func(self, *args, **kwargs)
            print("\nThis is the list of parameters")
            print(result)
            
            for parameter in result:
                if isinstance(parameter, int):
                    print(f"\nYes, {parameter} is {type(parameter)}")
            
                else: 
                    print(f"\nNo, {parameter} is a {type(parameter)}")
                    print(f"Value must be a integer.")
            
            print("Finishing execution of the decorated function.")
            return result
        return wrapper    


    @integers_counter
    def only_integers(self,*args):
        print("This decorated function have more instructions")
        args_list = list(args)
        return args


def main():
    counting_integers = Arguments()
    counting_integers.only_integers(1, 2, "vaca", 4, 5, "gallina")


main()
