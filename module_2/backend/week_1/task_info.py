
class Task:

    def __init__(self, task_data):
    
        self.id = task_data.get('id')
        self.name = task_data.get('name')
        self.description = task_data.get('description')
        self.status = task_data.get('status')


    # def task_json(self):

    #     return{
    #         "id" : self.id,
    #         "name" : self.name,
    #         "description" : self.description,
    #         "status" : self.status
    #     }