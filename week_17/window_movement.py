import FreeSimpleGUI as sg
import data_movemets
import data_category

class PreparationsforMovement:

    def __init__(self):
        pass


    def preparing_category_combo_data(self):
        categories_list = data_category.read_categories_csv()
        income_category_list = []
        outcome_category_list = []
        
        for category in categories_list:  
            if category['type'] == "Income":
                income_category_list.append(category['category'])
                income_category_list.sort()
            elif category['type'] == "Outcome":
                outcome_category_list.append(category['category'])
                outcome_category_list.sort()

        return income_category_list, outcome_category_list
    

    def creating_movements_list(self, category_type, category, detail, amount):

        movements_list = []
        new_movement = {
        "Type" : category_type, 
        "Category" : category,
        "Detail" : detail,
        "Amount" : amount
        }
        #print(new_movement)
        movements_list = data_movemets.read_movements_csv()
        movements_list.append(new_movement)

        return movements_list


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
                incomes_list, outcomes_list = PreparationsforMovement.preparing_category_combo_data(self)
                #print("Selected Type:", category_type)
                if category_type == "Income":
                    movement_window['-CATEGORY-'].update(values=incomes_list, value="Choose an income", size=17)
                elif category_type == "Outcome":
                    movement_window['-CATEGORY-'].update(values=outcomes_list, value="Choose an outcome", size=17)

            elif event == '-NEXT-':
                #preparing data and include possible errors
                category = values['-CATEGORY-'] 
                if category == "Choose a category" or not category:
                    sg.popup_error("Error: Please select a valid category!", text_color='red', auto_close_duration=2)
                    continue
                category = values['-CATEGORY-']
                if category == "Choose an income":
                    sg.popup_error("Error: Please select a valid income!", text_color='red', auto_close_duration=2)
                    continue
                category = values['-CATEGORY-']
                if category == "Choose an outcome":
                    sg.popup_error("Error: Please select a valid outcome!", text_color='red', auto_close_duration=2)
                    continue

                detail = values['-DETAIL-']
                if not detail:
                    sg.popup_error("Error: Please write the detail!", text_color='red')
                    continue
                
                try:
                    amount = int(values['-AMOUNT-'])  
                except ValueError:
                    sg.popup_error("Error: Please enter a valid number!", text_color='red', auto_close_duration=2)
                    continue
                amount = int(values['-AMOUNT-'])
                if amount <= 0:
                    sg.popup_error("Error: The amount must be greater than zero", text_color='red', auto_close_duration=2)
                    continue

                # saving the movements data
                #movements_list = []
                movements_list = PreparationsforMovement.creating_movements_list(self, category_type, category, detail, amount)
                validation = data_movemets.movements_csv_exists()
                if  validation == False:
                    data_movemets.create_movements_csv("movements.csv", movements_list, movements_list[0].keys())

                else:
                    #print(movements_list)
                    data_movemets.write_to_movements_csv("movements.csv", movements_list, movements_list[0].keys())
                    
                #save popup
                sg.popup_auto_close("Movement saved!", text_color='sky blue', font=("Arial", 15), auto_close_duration=1)
                
                # clean window
                for key in values:
                    movement_window[key]('')   
                movement_window['-TYPE-'].update(value="Choose a type", size=13)
                movement_window['-CATEGORY-'].update(value="Choose a category", size=17)
                
        movement_window.close()
        #return movement_window



def main():
    saving_movements = MovementWindow()
    saving_movements.movement_window_function()


# main()