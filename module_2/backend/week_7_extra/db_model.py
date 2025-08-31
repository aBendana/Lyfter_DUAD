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
schema_name = "lyfter_week_7_extra"
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
class RoleType(PyEnum):
    administrator = 'administrator'
    cb_user = 'cb_user' #contact book user

class LoginStatusType(PyEnum):
    successful = 'successful'
    failed = 'failed'


# tables
base = declarative_base()


class Users(base):
	__tablename__ = 'users'
	__table_args__ = {'schema': schema_name}

	id = Column(Integer, primary_key=True)
	name = Column(String(50),nullable=False)
	email = Column(String(30), nullable=False, unique=True)
	password = Column(String(50), nullable=False)
	role = Column(Enum(RoleType, name='role_type', create_type=True), nullable=False, server_default="cb_user")


class Contacts(base):
	__tablename__ = 'contacts'
	__table_args__ = {'schema': schema_name}

	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey(schema_name+".users.id"), nullable=False)
	name = Column(String(50),nullable=False)
	phone_number = Column(String(15), nullable=False, unique=True)
	email = Column(String(30), nullable=False, unique=True)


class LoginHistory(base):
	__tablename__ = 'login_history'
	__table_args__ = {'schema': schema_name}

	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey(schema_name+".users.id"), nullable=False)
	login_timestamp = Column(TIMESTAMP, server_default=text("date_trunc('second', CURRENT_TIMESTAMP)"), nullable=False)
	ip_address = Column(String(30), nullable=False)
	login_status = Column(Enum(LoginStatusType, name='login_status_type', create_type=True), nullable=False)



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