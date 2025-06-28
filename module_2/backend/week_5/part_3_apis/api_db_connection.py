from db import PgManager


# no use of a try except structure because in PgManager is already made it
def connection():

    return PgManager(
            db_name="postgres",
            user="postgres",
            password="JhLv#99*",
            host="localhost"
        )

#connection()