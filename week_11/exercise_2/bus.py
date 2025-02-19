import person

class Bus:

    def __init__(self,max_passengers):
        self.max_passengers = max_passengers


    def passengers_on_board(self):
        counter = 0

        on_board = []
        while (counter <= self.max_passengers):
            person = "passenger" + str(counter)
            on_board.append(person)
            counter += 1

        print(on_board)


colombian_bus = Bus(10)
colombian_bus.passengers_on_board()