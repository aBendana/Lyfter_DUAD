from flask import request, jsonify
from task_info import Task


class ParameterError(Exception):
    def __init__(self, filter_value):
        super().__init__(f"wrong parameter '{filter_value}', do not exists")



class Filter:

    def __init__(self):
        pass

    def valid_filter(self, tasks_list, key_filter, valid_value):
        
        task_filter_list = []

        for task in tasks_list:
            #print(task.get(key_filter).strip(), valid_value.strip())
            if task.get(key_filter).strip() == valid_value.strip():
                task_filter_list.append(task)

        if not task_filter_list:
            raise ParameterError(valid_value)
                
        return task_filter_list



class TaskValidations:

    def __init__(self):
        pass

    def complete_task_info(self, task_data:dict):

        self.obligatory_task_info = ("id", "name", "description", "status")
        for task_info in self.obligatory_task_info:
            if task_info not in task_data:
                raise ValueError(f"{task_info} missing from the body")   
        return True
    

    def not_repeat_id(self, tasks_list, task_data:dict):

        for task in tasks_list:
            if task.get("id").strip() == task_data.get("id").strip():
                raise ValueError(f"{task.get('id')} id already in use")
        return True
    

    def check_valid_status(self, task_data:dict):

        self.valid_status = ["Completed","Proceeding","Pending"]
        print(task_data.get("status").strip())
        if task_data.get("status").strip() in self.valid_status:
            return True
        else:
            raise ValueError(f"{task_data.get('status')} status is not valid") 
        
    

    