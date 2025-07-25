
class Validations:

    def __init__(self):
        pass

    def complete_info(self, data, obligatory_info):

        for info in obligatory_info:
            value = data.get(info)
            if info not in data or value == None or value.strip() == "":
                raise ValueError(f"{info} can't be empty or is missing from the body")   
        return True
    

    def complete_info_update(self, data, obligatory_info):
        for info in obligatory_info:
            if info in data:
                value = data.get(info)
                if value is None or (isinstance(value, str) and value.strip() == ""):
                    raise ValueError(f"'{info}' can't be empty or blank spaces")
        return True


    def complete_multilevel_info(self, data, obligatory_info):

        for item in data:
            for info in obligatory_info:
                if info not in item or item.get(info) == "":
                    raise ValueError(f"{info} missing from the body") 
        return True
    

    def not_need_parameter(self, data, parameter):

        if parameter in data:
            raise ValueError(f"{parameter}: '{data.get("id")}' is not necessary, the system generates the ID.")   
        return True


    def not_repeat_id(self, data_list, id_parameter, data):

        for info in data_list:
            if info.get(id_parameter).strip() == data.get(id_parameter).strip():
                raise ValueError(f"{info.get(id_parameter)} id already in use")
        return True
    

    def check_valid_type(self, data, type_parameter, valid_types):

        #print(data.get(type_parameter).strip())
        if data.get(type_parameter).strip() in valid_types:
            return True
        else:
            raise ValueError(f"{data.get(type_parameter)} type is not valid")
        

    def valid_integer(self, data, integer_numbers):

        for value in integer_numbers:
            number = data.get(value)
            if not isinstance(number, int):
                raise TypeError((f"{number} is not a integer number"))
        return True
    

    def valid_multilevel_integer(self, data, integer_numbers):
        
        for item in data:
            for value in integer_numbers:
                number = item.get(value)
                if not isinstance(number, int):
                    raise TypeError((f"{number} is not a integer number"))
        return True


    def valid_float(self, data, float_numbers):

        for value in float_numbers:
            number = data.get(value)
            if not isinstance(number, float):
                raise TypeError((f"{number} is not a float number"))
        return True
                

    def valid_multilevel_float(self, data, float_numbers):

        for item in data:
            for value in float_numbers:
                number = item.get(value)
                if not isinstance(number, float):
                    raise TypeError((f"{number} is not a float number"))
        return True