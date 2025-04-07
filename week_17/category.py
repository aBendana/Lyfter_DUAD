import FreeSimpleGUI as sg
from data_managment import DataManagement


class PreparationsForCategory:

    def __init__(self):
        pass
        
    
    def category_type_value(self, income_box):

        if income_box:
            category_type = "Income"
        else:
            category_type = "Outcome"

        return category_type
    

    def new_category_exists(self, new_category):

        category_validation = False
        categories = DataManagement.read_data_csv(self, 'categories.csv')
        for category in categories:
            #print(new_category.__dict__ , category)
            if new_category.__dict__ == category:
                category_validation = True
                break

        return category_validation   



class CategoryItem:
    
    def __init__(self, type_, name):
        self.type = type_
        self.category = name


    def validate_category(self, category):
        return category.category.strip() != ""    



class Category:

    def __init__(self):
        pass


    def saving_category(self, new_category):

        validation_file_exists = DataManagement.data_csv_exists(self, 'categories.csv')
        # creating the data category file for first time
        if  validation_file_exists == False:
            DataManagement.create_data_csv(self, "categories.csv", new_category)
            sg.popup_auto_close("Category saved!", text_color='sky blue', font=("Arial", 15), auto_close_duration=1)

        elif validation_file_exists == True:
            validation_new_category_exists = PreparationsForCategory.new_category_exists(self, new_category)
            #print(validation_new_category_exists)

            # writing the data category file
            if validation_new_category_exists == False:
                DataManagement.write_to_data_csv(self, "categories.csv", new_category)
                sg.popup_auto_close("Category saved!", text_color='sky blue', font=("Arial", 15), auto_close_duration=1)                       
            elif validation_new_category_exists == True:
                sg.popup_auto_close("Category already exists!", text_color='red', font=("Arial", 15), auto_close_duration=2)

