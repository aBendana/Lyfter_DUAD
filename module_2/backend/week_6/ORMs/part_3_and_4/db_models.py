from db_connection import db_connection
from sqlalchemy.schema import CreateSchema
from sqlalchemy.exc import ProgrammingError, OperationalError
from sqlalchemy import (
    schema, inspect, MetaData,
    Table, Column, ForeignKey, 
    Integer, SmallInteger, String, Date
)

# connection to the db
engine = db_connection()


class Schema:

    def schema_creation(self):

        schema_lyfter_week_6 = "lyfter_week_6"
        with engine.begin() as conn:
            try:
                conn.execute(CreateSchema(schema_lyfter_week_6))
                return schema_lyfter_week_6
            
            # schema already exists or can't be created
            except (ProgrammingError, OperationalError) as e:
                print(e)
                pass


class Tables:

    def __init__(self):

        self.metadata = MetaData("lyfter_week_6")

        self.users_table = Table(
                "users",
                self.metadata,
                Column("id", Integer, primary_key=True),
                Column("full_name", String(35), nullable=False),
                Column("email", String(30), unique=True, nullable=False),
                Column("phone_number", String(8), nullable=False),
                Column("birth_date", Date, nullable=False)
        )

        self.addresses_table = Table(
                "addresses",
                self.metadata,
                Column("id", Integer, primary_key=True),
                Column("user_id", ForeignKey("users.id"),  unique=True, nullable=False),
                Column("address", String(90), nullable=False),
                Column("canton", String(15), nullable=False),
                Column("province", String(12), nullable=False),
                Column("postal_code", String(8), nullable=False)
        )

        self.cars_table = Table(
                "cars",
                self.metadata,
                Column("id", Integer, primary_key=True),
                Column("user_id", ForeignKey("users.id"), nullable=True),
                Column("makers", String(20), nullable=False),
                Column("model", String(25), nullable=False),
                Column("year", SmallInteger, nullable=False),
                Column("color", String(20), nullable=False)
        )

        # verification and creation of the tables
        inspector = inspect(engine)
        tables_to_create = ["users", "addresses", "cars"]
        tables_obj_to_create = [self.cars_table, self.addresses_table, self.cars_table]

        for index, table in enumerate(tables_to_create):
            if not inspector.has_table(table, schema="lyfter_week_6"):
                tables_obj_to_create[index].create(engine)
                print(f"Table '{table}' does not exist in schema '{schema}'")
            else:
                print(f"Table '{table}' exists.")



schema = Schema()
table = Tables()
def main():
	schema.schema_creation()

if __name__ == "__main__":
    main()