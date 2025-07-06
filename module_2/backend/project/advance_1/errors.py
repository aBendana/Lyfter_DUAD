class ParameterError(Exception):
    def __init__(self, filter_value):
        super().__init__(f"wrong parameter '{filter_value}', do not exists")


class Filter:

    def __init__(self):
        pass

    def valid_filter(self, data_list, key_filter, valid_value):
        
        filter_list = []

        for data in data_list:
            #print(task.get(key_filter).strip(), valid_value.strip())
            if data.get(key_filter).strip() == valid_value.strip():
                filter_list.append(data)

        if not filter_list:
            raise ParameterError(valid_value)
                
        return filter_list