import FreeSimpleGUI as sg
from category import Category, PreparationsForCategory, CategoryItem
import utilities as ut


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
            category_name = ""
            
            if event == sg.WIN_CLOSED or event == '-CLOSE-':
                break

            elif ut.checkbox_validations(category_window, values['-INCOME-'], values['-OUTCOME-']):           

                category_type = PreparationsForCategory.category_type_value(self, values['-INCOME-'])
                
                # category_name = values['-CATEGORY-']
                # if not category_name:
                #     sg.popup_error("Error: Please write the detail!", text_color='red')
                #     continue

                #new_category = CategoryItem(category_type, category_name)
                #print(new_category)

                # saving
                if event == '-NEXT-':

                    new_category = CategoryItem(category_type, values['-CATEGORY-'])

                    if not CategoryItem.validate_category(self, new_category):
                        sg.popup_error("Error: Please write the detail!", text_color='red', auto_close=True, auto_close_duration=2)
                        continue

                    Category.saving_category(self, new_category)
                    
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