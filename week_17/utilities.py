import FreeSimpleGUI as sg


def checkbox_validations(window, income_box, outcome_box):

    if income_box == True and outcome_box == True:
        window['-WARNING-'].update("Please choose only one checkbox option")

    elif income_box == False and outcome_box == False:
        window['-WARNING-'].update("Please choose a checkbox option")

    elif (income_box == True and outcome_box == False) or (income_box == False and outcome_box) == True:
        return True
    

# def validate_category(transaction):

#     if transaction.type.strip() == "Choose a type" or not transaction.type.strip():
#         sg.popup_error("Error: Please select a category type!", text_color='red', auto_close=True, auto_close_duration=2)
#         return False
#     if transaction.category.strip() == "Choose a category" or not transaction.category.strip():
#         sg.popup_error("Error: Please select a valid category!", text_color='red', auto_close=True, auto_close_duration=2)
#         return False
#     if transaction.category.strip() == "Choose an income":
#         sg.popup_error("Error: Please select a valid income!", text_color='red', auto_close=True, auto_close_duration=2)
#         return False
#     if transaction.category.strip() == "Choose an outcome":
#         sg.popup_error("Error: Please select a valid outcome!", text_color='red', auto_close=True, auto_close_duration=2)
#         return False
    
#     return True


# def validate_amount(transaction):

#     try:
#         transaction = int(transaction.amount.strip())
#     except ValueError:
#         sg.popup_error("Error: Please enter a valid number!", text_color='red', auto_close=True, auto_close_duration=2)
#         return None

#     if transaction <= 0:
#         sg.popup_error("Error: The amount must be greater than zero", text_color='red', auto_close=True, auto_close_duration=2)
#         return None

#     return transaction