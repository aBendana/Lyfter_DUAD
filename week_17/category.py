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
    
    
    def creating_list_for_categories(self, category_type, category):
        
        categories_list = []
        categories_list = DataManagement.read_data_csv(self, 'categories.csv')
        new_category = {"type":category_type, "category":category}
        categories_list.append(new_category)
        return new_category, categories_list

    
    def new_category_exists(self, new_category):

        category_validation = False
        categories = DataManagement.read_data_csv(self, 'categories.csv')
        #print(categories)
        for category in categories:
            if new_category == category:
                category_validation = True
                break

        return category_validation   


class Category:

    def __init__(self):
        pass


    def saving_category(self, new_category, categories_list):

        validation_file_exists = DataManagement.data_csv_exists(self, 'categories.csv')
        # creating the data category file for first time
        if  validation_file_exists == False:
            DataManagement.create_data_csv(self, "categories.csv", categories_list, categories_list[0].keys())
            sg.popup_auto_close("Category saved!", text_color='sky blue', font=("Arial", 15), auto_close_duration=1)

        elif validation_file_exists == True:
            validation_new_category_exists = PreparationsForCategory.new_category_exists(self, new_category)
            #print(validation_new_category_exists)

            # writing the data category file
            if validation_new_category_exists == False:
                DataManagement.write_to_data_csv(self, "categories.csv", categories_list, categories_list[0].keys())
                sg.popup_auto_close("Category saved!", text_color='sky blue', font=("Arial", 15), auto_close_duration=1)                       
            elif validation_new_category_exists == True:
                sg.popup_auto_close("Category already exists!", text_color='red', font=("Arial", 15), auto_close_duration=2)


#for testint purposes
# def main():
#     c = Category()
#     new_category = {"type":'Income', "category":'PSB'}
#     categories_list = data_category.read_categories_csv()
#     c.saving_category(new_category, categories_list)

# main()