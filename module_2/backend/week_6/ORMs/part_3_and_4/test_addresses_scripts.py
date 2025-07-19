from datetime import date
from db_connection import db_connection
from orms_scripts import Insert, Select, Update, Delete
from db_models import Tables
from addresses import address_data, addresses_data_list

engine = db_connection()
insert_address = Insert(engine)
select_address = Select(engine)
update_address = Update(engine)
delete_address = Delete(engine)
tables = Tables()


update_dict_list = [
    {"old_value":"Calle Luna. lote 8", "new_value":"Calle Sol, lote 50"},
    {"old_value":"Limon centro, calle principal, frente al parque", "new_value":"Limon centro, 50N del estadio"},
    {"old_value":"Alajuela, La Garita, finca #12", "new_value":"La Garita, finca #501"}
]


def main():
    insert_address.single_insert(tables.addresses_table, address_data)
    #insert_address.multiple_inserts(tables.addresses_table, addresses_data_list)
    #select_address.whole_table_select(tables.addresses_table)
    #select_address.single_select(tables.addresses_table, "id", 2)
    #update_address.single_update(tables.addresses_table, "id", 2, "address", "Calle Luna. lote 8")
    #update_address.multiple_update(tables.addresses_table, "address", update_dict_list)
    #delete_address.single_delete(tables.addresses_table, "id", 1)


if __name__ == "__main__":
    main()