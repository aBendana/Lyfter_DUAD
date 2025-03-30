import FreeSimpleGUI as sg
import window_movement
import window_category
import data_movemets
import data_category


class PreparationsForMainWindow:

    def table_values(self):

        movements_list_of_dictionaries = data_movemets.read_movements_csv()
        movements_list_of_lists = []
        for index, movement in enumerate(movements_list_of_dictionaries):
            values_list = list(movement.values())
            index += 1
            values_list.insert(0,index)
            movements_list_of_lists.append(values_list)

        #print(movements_list_of_lists)
        return movements_list_of_lists


    def income_outcome_balance(self):
        
        movements_list = data_movemets.read_movements_csv()
        income_amount_list = []
        income_total = 0
        outcome_amount_list = []
        outcome_total = 0
        
        for movement in movements_list:  
            if movement['Type'] == "Income":
                income_amount_list.append(int(movement['Amount']))
                
            elif movement ['Type'] == "Outcome":
                outcome_amount_list.append(int(movement['Amount']))
                
        income_total = sum(income_amount_list)
        outcome_total = sum(outcome_amount_list)
        balance = income_total - outcome_total
        
        return balance
    


class MainWindow: 

    def make_window(self):

        balance = PreparationsForMainWindow.income_outcome_balance(self)

        sg.theme("Darkblack1")
        headings = ['#','Type','Category','Detail','Amount']

        layout = [
            [sg.Text("Daily Movements:", font=("Times", 20, "italic"), justification='left'),
            sg.Push(), sg.Text("Balance:", font=("Times", 15, "italic"), justification='right'),
            sg.Text(balance, font=("Times", 15, "italic bold"), text_color="green", justification='right', key='-BALANCE-')],

            [sg.Table(values = PreparationsForMainWindow.table_values(self),
                    headings = headings,
                    pad=(10,10),
                    cols_justification="clllc",
                    auto_size_columns = False,
                    col_widths=[4, 10, 15, 25, 7],
                    num_rows=15,
                    row_height=30,
                    alternating_row_color='gray',
                    key='-TABLE-'
                    )],

            [sg.Button("New Movement", pad=((10,10),(20,10)), key='-MOVEMENT-'), 
            sg.Button("New Category", pad=((10,10),(20,10)), key='-CATEGORY-'),
            sg.Push(),sg.Button("Refresh", pad=((10,10),(20,10)), button_color = "green", enable_events=True, 
                                bind_return_key=True, key='-REFRESH-'),
            sg.Button("Close", pad=((10,10),(20,10)), button_color = "blue", key='-CLOSE-')]
            ]

        return sg.Window("DUAD", layout)


    def main_window_function(self):

        # window creation
        main_window = self.make_window()

        # beginning for first time
        if data_category.categories_csv_exists() == False:
            sg.popup_quick("There is no movements, begin creating types of categories and then movements", title='DUAD',
                        text_color='blue',background_color="gray", auto_close_duration=4, non_blocking=False)
            window_category.main()


        # capture events and loops        
        while True: 
            event, values = main_window.read()
        
            if event == sg.WIN_CLOSED or event == '-CLOSE-':
                break

            elif event == '-MOVEMENT-':
                window_movement.main()

            elif event == '-CATEGORY-':
                window_category.main()

            # updating balance and table
            elif event == '-REFRESH-':
                #main_window.refresh()
                main_window["-BALANCE-"].update(value = PreparationsForMainWindow.income_outcome_balance(self))
                main_window["-TABLE-"].update(values = PreparationsForMainWindow.table_values(self))

        main_window.close()

        return main_window
    

def main():
    main_window = MainWindow()
    main_window.main_window_function()


main()