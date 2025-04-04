import FreeSimpleGUI as sg
from data_managment import DataManagement


class PreparationsForMainWindow:

    def table_values(self):

        movements_list_of_dictionaries = DataManagement.read_data_csv(self, 'movements.csv')
        movements_list_of_lists = []
        for index, movement in enumerate(movements_list_of_dictionaries):
            values_list = list(movement.values())
            index += 1
            values_list.insert(0,index)
            movements_list_of_lists.append(values_list)

        #print(movements_list_of_lists)
        return movements_list_of_lists


    def income_outcome_balance(self):
        
        movements_list = DataManagement.read_data_csv(self, 'movements.csv')
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
