from person import Person


class Bus:

    def __init__(self,max_passengers):
        self.max_passengers = max_passengers
        

    def passengers_on_board(self):
        
        counter = 1
        on_board = []
        while (counter <= self.max_passengers):
            passenger = Person()
            on_board.append(passenger)
            counter += 1

        print(f"\nThese are the passengers on board:{on_board}\n FULL BUS!\n\n")
        return on_board


    def passengers_getting_off(self, a_list):
        counter = 1
        on_board = a_list
        while len(on_board) > 0:
            on_board.pop(-1)
            print(f"Already {counter} passenger(s) got off the bus\n{on_board}")
            counter +=1

        print(f"OK, now the bus is empty!")


colombian_bus = Bus(10)
on_board = colombian_bus.passengers_on_board()
colombian_bus.passengers_getting_off(on_board)