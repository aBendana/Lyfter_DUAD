import FreeSimpleGUI as sg
from movement import PreparationsForMovement, Transaction, Movement
import utilities as ut


class MovementWindow:

    def __init__(self):
        pass
        

    def make_window(self):

        #elements in the grid
        sg.theme("Dark2")

        layout = [
            
            [sg.Text("New Movement", font=("Times", 20), 
                size=(34,1), justification='center')],

            [sg.Text("Type:", size=(7,1), font=("Arial", 11)),
            sg.Combo(["Income", "Outcome"], default_value="Choose a type", size=13, font=("Arial", 11), enable_events=True, readonly=True, key='-TYPE-')],

            [sg.Text("Category:", size=(7,1), font=("Arial", 11)),
            sg.Combo([], default_value="Choose a category", size=17, font=("Arial", 11), readonly=True, key='-CATEGORY-')],

            [sg.Text("Detail:", size=(7,1), font=("Arial", 11)),
            sg.Input(default_text="", size=(48,1), font=("Arial", 11), key='-DETAIL-')],

            [sg.Text("Amount:", size=(7,1), font=("Arial", 11)),
            sg.Input(default_text="", size=(10,1), font=("Arial", 11), key='-AMOUNT-')],

            [sg.Button("Next", size=(7,1), pad=((10,10),(20,10)), button_color = "red", bind_return_key=True, key='-NEXT-'),
            sg.Button("Close", size=(7,1), pad=((10,10),(20,10)), button_color = "blue", key='-CLOSE-')],
    ]

        return sg.Window("DUAD", layout, finalize=True)


    def movement_window_function(self):

        # window creation
        movement_window = self.make_window()

        # capture events and loops        
        while True: 
            event, values = movement_window.read()

            if event == sg.WIN_CLOSED or event == '-CLOSE-':
                break

            elif event == '-TYPE-':  
                category_type = values['-TYPE-']
                incomes_list, outcomes_list = PreparationsForMovement.preparing_category_combo_data(self)

                if category_type == "Income":
                    movement_window['-CATEGORY-'].update(values=incomes_list, value="Choose an income", size=17)
                elif category_type == "Outcome":
                    movement_window['-CATEGORY-'].update(values=outcomes_list, value="Choose an outcome", size=17)

            elif event == '-NEXT-':
                # creating the data and validations

                new_transaction = Transaction(values['-TYPE-'], values['-CATEGORY-'], values['-DETAIL-'], values['-AMOUNT-'])
                
                if not Transaction.validate_category(self, new_transaction):
                    continue

                # detail = values['-DETAIL-']
                if not Transaction.validate_detail(self, new_transaction):
                    sg.popup_error("Error: Please write the detail!", text_color='red', auto_close=True, auto_close_duration=2)
                    continue
                
                amount = Transaction.validate_amount(self, new_transaction)
                if  amount == None:
                    continue

                # saving the transaction
                Movement.saving_transaction(self, new_transaction)

                # clean window
                for key in values:
                    movement_window[key]('')   
                movement_window['-TYPE-'].update(value="Choose a type", size=13)
                movement_window['-CATEGORY-'].update(value="Choose a category", size=17)
                
        movement_window.close()



def main():
    saving_movements = MovementWindow()
    saving_movements.movement_window_function()


# main()