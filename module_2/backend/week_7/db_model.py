from db_connection import DatabaseConnection
from sqlalchemy.schema import CreateSchema
from sqlalchemy.exc import ProgrammingError, OperationalError
from sqlalchemy.orm import declarative_base
from sqlalchemy import (
    schema, inspect,
    Column, ForeignKey, text, Enum, 
    Integer, SmallInteger, String, Date, Numeric, TIMESTAMP
)
from enum import Enum as PyEnum


# connection to the db
db_connect = DatabaseConnection()
engine = db_connect.get_engine()

# schema
schema_name = "lyfter_week_7"
class Schema:

	def __init__(self, engine, schema_name:str):
		self.engine = engine
		self.schema_name = schema_name
		

	def schema_creation(self):

		with self.engine.begin() as conn:
			try:
				conn.execute(CreateSchema(self.schema_name))
				print(f"Schema {self.schema_name}, created successfully") 
			
			# schema already exists or can't be created
			except (ProgrammingError, OperationalError) as e:
				print(f"Schema creation failed or already exists: {e}")
				pass


# special types
class RolType(PyEnum):
    administrator = 'administrator'
    client = 'client'

class StatusType(PyEnum):
    completed = 'completed'
    pending = 'pending'


# tables
base = declarative_base()

class Fruits(base):
    __tablename__ = 'fruits'
    __table_args__ = {'schema': schema_name}

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False, unique=True)
    price = Column(Numeric(6, 2), nullable=False)
    entry_date = Column(Date, nullable=False)
    quantity = Column(SmallInteger, nullable=False)


class Users(base):
	__tablename__ = 'users'
	__table_args__ = {'schema': schema_name}

	id = Column(Integer, primary_key=True)
	name = Column(String(50),nullable=False)
	email = Column(String(30), nullable=False, unique=True)
	password = Column(String(50), nullable=False)
	rol = Column(Enum(RolType, name='rol_type', create_type=True), nullable=False, server_default=text("'client'"))


class Carts(base):
	__tablename__ = 'carts'
	__table_args__ = {'schema': schema_name}

	id = Column(Integer, primary_key=True, autoincrement=True)
	user_id = Column(Integer, ForeignKey(schema_name+".users.id"), nullable=False)
	status  = Column(Enum(StatusType, name='status', create_type=True), nullable=False, server_default=text("'pending'"))


class FruitsInCart(base):
    __tablename__ = 'fruits_in_cart'
    __table_args__ = {'schema': schema_name}

    id = Column(Integer, primary_key=True, autoincrement=True)
    cart_id = Column(Integer, ForeignKey(schema_name+".carts.id"), nullable=False)
    fruit_id = Column(Integer, ForeignKey(schema_name+".fruits.id"), nullable=False)
    quantity = Column(SmallInteger, nullable=False)


class Invoices(base):
    __tablename__ = 'invoices'
    __table_args__ = {'schema': schema_name}

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey(schema_name+".users.id"), nullable=False)
    cart_id = Column(Integer, ForeignKey(schema_name+".carts.id"), nullable=False)
    shipping_address = Column(String(110), nullable=False)
    date_placed = Column(TIMESTAMP, server_default=text("date_trunc('second', CURRENT_TIMESTAMP)"))
    invoice_total = Column(Numeric(12, 2), nullable=False, server_default=text("0.00"))


class InvoicesDetails(base):
    __tablename__ = 'invoice_details'
    __table_args__ = {'schema': schema_name}

    id = Column(Integer, primary_key=True, autoincrement=True)
    invoice_id = Column(Integer, ForeignKey(schema_name+".invoices.id"), nullable=False)
    fruit_id = Column(Integer, ForeignKey(schema_name+".fruits.id"), nullable=False)
    quantity = Column(SmallInteger, nullable=False)
    item_total = Column(Numeric(10, 2), nullable=False)




# schema 
schema = Schema(engine, schema_name)

def main():
	try:
		# schema
		schema.schema_creation()
		# tables creation
		base.metadata.create_all(engine)
	except Exception as e:
		print(f"Error: {e}")

if __name__ == '__main__':
	main()