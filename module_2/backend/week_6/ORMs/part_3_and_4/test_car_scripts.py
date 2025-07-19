from datetime import date
from db_connection import db_connection
from orms_scripts import Insert, Select, Update, Delete
from db_models import Tables
from cars import car_data, cars_data_list

engine = db_connection()
insert_car = Insert(engine)
select_car = Select(engine)
update_car = Update(engine)
delete_car = Delete(engine)
tables = Tables()


update_dict_list = [
    {"old_value":2031, "new_value":2000},
    {"old_value":2022, "new_value":1998},
    {"old_value":2034, "new_value":1999},
    ]


def main():
    #insert_car.single_insert(tables.cars_table, car_data)
    #insert_car.multiple_inserts(tables.cars_table, cars_data_list)
    #select_car.whole_table_select(tables.cars_table)
    #select_car.single_select(tables.cars_table, "id", 2)
    update_car.single_update(tables.cars_table, "id", 2, "user_id", 1)
    #update_car.multiple_update(tables.cars_table, "year", update_dict_list)
    #delete_car.single_delete(tables.cars_table, "id", 20)


if __name__ == "__main__":
    main()