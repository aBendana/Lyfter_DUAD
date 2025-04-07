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
    


class Transaction:
    
    def __init__(self, type_, category, detail, amount):
        self.type = type_
        self.category = category
        self.detail = detail
        self.amount = amount


    def validate_category(self, transaction):

        if transaction.type.strip() == "Choose a type" or not transaction.type.strip():
            sg.popup_error("Error: Please select a category type!", text_color='red', auto_close=True, auto_close_duration=2)
            return False
        if transaction.category.strip() == "Choose a category" or not transaction.category.strip():
            sg.popup_error("Error: Please select a valid category!", text_color='red', auto_close=True, auto_close_duration=2)
            return False
        if transaction.category.strip() == "Choose an income":
            sg.popup_error("Error: Please select a valid income!", text_color='red', auto_close=True, auto_close_duration=2)
            return False
        if transaction.category.strip() == "Choose an outcome":
            sg.popup_error("Error: Please select a valid outcome!", text_color='red', auto_close=True, auto_close_duration=2)
            return False
        
        return True
    

    def validate_detail(self, transaction):
        return transaction.detail.strip() != ""


    def validate_amount(self, transaction):

        try:
            amount = int(transaction.amount.strip())
        except ValueError:
            sg.popup_error("Error: Please enter a valid number!", text_color='red', auto_close=True, auto_close_duration=2)
            return None

        if amount <= 0:
            sg.popup_error("Error: The amount must be greater than zero", text_color='red', auto_close=True, auto_close_duration=2)
            return None

        return amount



class Movement:

    def __init__(self):
        pass


    def saving_transaction(self, new_transaction):

        validation = DataManagement.data_csv_exists(self, 'transactions.csv')
        if  validation == False:
            DataManagement.create_data_csv(self, 'transactions.csv', new_transaction)

        else:
            DataManagement.write_to_data_csv(self, 'transactions.csv', new_transaction)
            
        #save popup
        sg.popup_auto_close("Movement saved!", text_color='sky blue', font=("Arial", 15), auto_close_duration=1)
