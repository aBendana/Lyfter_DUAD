import FreeSimpleGUI as sg
import data_category


class PreparationsForCategory:

    def __init__(self):
        pass


    def creating_list_for_categories(self, category_type, category):
        
        categories_list = []
        categories_list = data_category.read_categories_csv()
        new_category = {"type":category_type, "category":category}
        categories_list.append(new_category)
        return new_category, categories_list

    
    def new_category_exists(self, new_category):

        category_validation = False
        categories = data_category.read_categories_csv()
        #print(categories)
        for category in categories:
            if new_category == category:
                category_validation = True
                break

        return category_validation    



class CategoryWindow:

    def __init__(self):
        pass


    def make_window(self):

        sg.theme("Dark2")

        #elements in the grid
        layout = [
            [sg.Text("New Category", font=("Times", 20), 
                size=(23,1), justification='center')],

            [sg.Text("Type:", size=(7,1), font=("Arial", 11)),
            sg.Checkbox("Income", font=("Arial", 11), default = False, key = '-INCOME-'),
            sg.Checkbox("Outcome", font=("Arial", 11), default = False, key = '-OUTCOME-')],

            [sg.Text("Category:", size=(7,1), font=("Arial", 11)),
            sg.Input(default_text="", size=(30,1), font=("Arial", 11), key='-CATEGORY-')],

            [sg.Button("Next", size=(7,1), pad=((10,10),(20,10)), button_color = "red", bind_return_key=True, key='-NEXT-'),
            sg.Button("Close", size=(7,1), pad=((10,10),(20,10)), button_color = "blue", key='-CLOSE-'),
            sg.Text("", key='-WARNING-')],
            ]

        return sg.Window("DUAD", layout, finalize=True)


    def category_window_function(self):
        
        # window creation
        category_window = self.make_window()

        # capture events and loops        
        while True: 
            event, values = category_window.read()
            category_type = ""
            category = ""
            new_category = {}
            categories_list = []
            
            if event == sg.WIN_CLOSED or event == '-CLOSE-':
                break
            
            # validations for the checkboxes
            elif values['-INCOME-'] == True and values['-OUTCOME-'] == True:
                category_window['-WARNING-'].update("Please choose only one checkbox option")

            elif values['-INCOME-'] == False and values['-OUTCOME-'] == False:
                category_window['-WARNING-'].update("Please choose a checkbox option")

            elif (values['-INCOME-'] == True and values['-OUTCOME-'] == False) or (values['-INCOME-'] == False and values['-OUTCOME-']) == True:
                
                #preparing the category data to be saved
                if values['-INCOME-'] == True:
                    category_type = "Income"
                else:
                    category_type = "Outcome"
                
                category = values['-CATEGORY-']
                if not category:
                    sg.popup_error("Error: Please write the detail!", text_color='red')
                    continue

                new_category, categories_list = PreparationsForCategory.creating_list_for_categories(self, category_type, category)
                #print(categories_list)

                # saving
                if event == '-NEXT-':
                    validation_file_exists = data_category.categories_csv_exists()
                    # creating the data category file for first time
                    if  validation_file_exists == False:
                        data_category.create_categories_csv("categories.csv", categories_list, categories_list[0].keys())
                        sg.popup_auto_close("Category saved!", text_color='sky blue', font=("Arial", 15), auto_close_duration=1)

                    elif validation_file_exists == True:
                        validation_new_category_exists = PreparationsForCategory.new_category_exists(self, new_category)
                        #print(validation_new_category_exists)

                        # writing the data category file
                        if validation_new_category_exists == False:
                            data_category.write_to_categories_csv("categories.csv", categories_list, categories_list[0].keys())
                            sg.popup_auto_close("Category saved!", text_color='sky blue', font=("Arial", 15), auto_close_duration=1)                       
                        elif validation_new_category_exists == True:
                            sg.popup_auto_close("Category already exists!", text_color='red', font=("Arial", 15), auto_close_duration=2)
                    
                    #clean all inputs
                    category_window['-WARNING-'].update("")
                    for key in values:
                        category_window[key]('')
                    

        category_window.close()
        return category_window
    

def main():
    saving_categories = CategoryWindow()
    saving_categories.category_window_function()

#main()