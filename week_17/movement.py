import FreeSimpleGUI as sg
from data_managment import DataManagement


class PreparationsForMovement:

    def __init__(self):
        pass


    def preparing_category_combo_data(self):
        categories_list = DataManagement.read_data_csv(self, 'categories.csv')
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
        
        movements_list = DataManagement.read_data_csv(self, 'movements.csv' )
        movements_list.append(new_movement)

        return movements_list
    

class Movement:

    def __init__(self):
        pass


    def saving_movement(self, movements_list):

        validation = DataManagement.data_csv_exists(self, 'movements.csv')
        if  validation == False:
            DataManagement.create_data_csv(self, "movements.csv", movements_list, movements_list[0].keys())

        else:
            #print(movements_list)
            DataManagement.write_to_data_csv(self, "movements.csv", movements_list, movements_list[0].keys())
            
        #save popup
        sg.popup_auto_close("Movement saved!", text_color='sky blue', font=("Arial", 15), auto_close_duration=1)
