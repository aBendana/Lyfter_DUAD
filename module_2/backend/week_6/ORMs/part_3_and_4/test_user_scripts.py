from datetime import date
from db_connection import db_connection
from orms_scripts import Insert, Select, Update, Delete
from db_models import Tables

engine = db_connection()
insert_user = Insert(engine)
select_user = Select(engine)
update_user = Update(engine)
delete_user = Delete(engine)
tables = Tables()


user_data = {
    "full_name": "Rafa Blanco",
    "email": "rafa@example.com",     
    "phone_number": 21218080,          
    "birth_date": date(1980, 5, 5)
}


users_data = [
    {
        "full_name": "Florinda Meza",
        "email": "florinda@example.com",     
        "phone_number": 31313131,          
        "birth_date": date(1950, 8, 3)
    },
    {
        "full_name": "Edgar Vivaz",
        "email": "edguitar@example.com",     
        "phone_number": 98989898,          
        "birth_date": date(1935, 10, 25)
    }
]


update_dict_list = [
    {"old_value":"84042021", "new_value":"01010101"},
    {"old_value":"77dfddf8", "new_value":"21212121"},
    {"old_value":"25648522", "new_value":"31313131"},
    ]


def main():
    #insert_user.single_insert(tables.users_table, user_data)
    #insert_user.multiple_inserts(tables.users_table, users_data)
    #select_user.whole_table_select(tables.users_table)
    #select_user.single_select(tables.users_table, "id", 2)
    #update_user.single_update(tables.users_table, "id", 2, "phone_number", 10101010)
    #update_user.multiple_update(tables.users_table, "phone_number", update_dict_list)
    delete_user.single_delete(tables.users_table, "id", 1)


if __name__ == "__main__":
    main()