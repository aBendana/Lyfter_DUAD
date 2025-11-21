from app.infrastructure.database.db_connection import DatabaseConnection
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
schema_name = "Lyfter_Ecommerce_Pets"
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
    client = 'client'
	
class SpeciesType(PyEnum):
    dog = 'Dog'
    cat = 'Cat'
    bird = 'Bird'
    fish = 'Fish'
    reptile = 'Reptile'
    small_mammal = 'Small Mammal'
    rodent = 'Rodent'
	
class ProvinceType(PyEnum):
	san_jose = 'San Jose'
	cartago = 'Cartago'
	heredia = 'Heredia'
	alajuela = 'Alajuela'
	guanacaste = 'Guanacaste'
	puntarenas = 'Puntarenas'
	limon = 'Limon'
	
class ShippingMethodType(PyEnum):
    standard = 'Standard'
    express = 'Express'
    overnight = 'Overnight'
	
class PaymentMethodType(PyEnum):
    credit_card = 'Credit Card'
    debit_card = 'Debit Card'
    paypal = 'PayPal'
    bank_transfer = 'Bank Transfer'

class StatusType(PyEnum):
    completed = 'completed'
    pending = 'pending'

class LoginStatusType(PyEnum):
    successful = 'successful'
    failed = 'failed'


# tables
base = declarative_base()

class Products(base):
    __tablename__ = "products"
    __table_args__ = {"schema": schema_name}

    id = Column(Integer, primary_key=True, autoincrement=True)
    SKU = Column(String(30), nullable=False, unique=True)
    name = Column(String(35), nullable=False, unique=True)
    description = Column(String(60), nullable=False)
    target_species = Column(Enum(SpeciesType, name='species_type', create_type=True), nullable=False)
    supplier = Column(String(35), nullable=False)
    stock = Column(SmallInteger, nullable=False)
    cost = Column(Numeric(5, 2), nullable=False)
    price = Column(Numeric(5, 2), nullable=False)


class Users(base):
	__tablename__ = 'users'
	__table_args__ = {'schema': schema_name}

	id = Column(Integer, primary_key=True)
	name = Column(String(50),nullable=False)
	email = Column(String(30), nullable=False, unique=True)
	password = Column(String(50), nullable=False)
	phone_number = Column(String(15), nullable=False)
	role = Column(Enum(RoleType, name='role_type', create_type=True), nullable=False, server_default="client")


class ShippingAddresses(base):
    __tablename__ = "shipping_addresses"
    __table_args__ = {"schema": schema_name}

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey(schema_name+".users.id"), nullable=False)
    address = Column(String(105), nullable=False)
    canton = Column(String(25), nullable=False)
    province = Column(Enum(ProvinceType, name='province_type', create_type=True), nullable=False)
    postal_code = Column(String(5), nullable=False)


class Carts(base):
	__tablename__ = 'carts'
	__table_args__ = {'schema': schema_name}

	id = Column(Integer, primary_key=True, autoincrement=True)
	user_id = Column(Integer, ForeignKey(schema_name+".users.id"), nullable=False)
	status  = Column(Enum(StatusType, name='status', create_type=True), nullable=False, server_default=text("'pending'"))


class ProductsInCart(base):
    __tablename__ = 'products_in_cart'
    __table_args__ = {'schema': schema_name}

    id = Column(Integer, primary_key=True, autoincrement=True)
    cart_id = Column(Integer, ForeignKey(schema_name+".carts.id"), nullable=False)
    product_id = Column(Integer, ForeignKey(schema_name+".products.id"), nullable=False)
    quantity = Column(SmallInteger, nullable=False)


class Invoices(base):
    __tablename__ = 'invoices'
    __table_args__ = {'schema': schema_name}

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey(schema_name+".users.id"), nullable=False)
    cart_id = Column(Integer, ForeignKey(schema_name+".carts.id"), nullable=False)
    shipping_address_id = Column(Integer, ForeignKey(schema_name+".shipping_addresses.id"), nullable=False)
    date_placed = Column(TIMESTAMP, server_default=text("date_trunc('second', CURRENT_TIMESTAMP)"))
    shipping_method = Column(Enum(ShippingMethodType, name='shipping_method_type', create_type=True), nullable=False, 
							default=ShippingMethodType.standard)
    payment_method = Column(Enum(PaymentMethodType, name='payment_method_type', create_type=True), nullable=False)
    invoice_subtotal = Column(Numeric(10, 2), nullable=False)
    discount = Column(Numeric(10, 2), nullable=False, server_default=text("0.00"))
    shipping_cost = Column(Numeric(10, 2), nullable=False)
    sales_taxes = Column(Numeric(10, 2), nullable=False, server_default=text("7.00"))
    invoice_total = Column(Numeric(10, 2), nullable=False)


class InvoiceDetails(base):
    __tablename__ = 'invoice_details'
    __table_args__ = {'schema': schema_name}

    id = Column(Integer, primary_key=True, autoincrement=True)
    invoice_id = Column(Integer, ForeignKey(schema_name+".invoices.id"), nullable=False)
    product_id = Column(Integer, ForeignKey(schema_name+".products.id"), nullable=False)
    quantity = Column(SmallInteger, nullable=False)
    item_total = Column(Numeric(10, 2), nullable=False)
	

class LoginHistory(base):
	__tablename__ = 'login_history'
	__table_args__ = {'schema': schema_name}

	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey(schema_name+".users.id"), nullable=False)
	login_timestamp = Column(TIMESTAMP, server_default=text("date_trunc('second', CURRENT_TIMESTAMP)"), nullable=False)
	ip_address = Column(String(30), nullable=False)
	login_status = Column(Enum(LoginStatusType, name='login_status_type', create_type=True), nullable=False)
	#role = Column(Enum(RoleType, name='role_type', create_type=True), nullable=False, server_default="client")



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