from functools import wraps
from sqlalchemy.exc import IntegrityError, ProgrammingError, OperationalError, SQLAlchemyError, DatabaseError
from sqlalchemy import insert, select, update, bindparam, delete


# decorator for manage exceptions
def scripts_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)

        except IntegrityError as error:
            print("\033[91mIntegrity error:\033[0m", error)
        except ProgrammingError as error:
            print("\033[91mSintaxis error:\033[0m", error)
        except OperationalError as error:
            print("\033[91mConnection error:\033[0m", error)
        except SQLAlchemyError as error:
            print("\033[91mSQLAlchemy error:\033[0m", error)
        except DatabaseError as error:
            print("\033[91mData base error:\033[0m", error)
        except Exception as error:
            print("\033[91mError:\033[0m", error)    
    return wrapper
 


class QueryFunctions:

    def __init__(self, engine, table):
        self.engine = engine
        self.table = table

    @scripts_exceptions
    def single_insert(self, data:dict):

        # unpack data key=value
        stmt = insert(self.table).values(**data)
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
            conn.commit()
        print(f"\033[92mSuccessfully added:{data}\033[0m")
        

    @scripts_exceptions
    def multiple_inserts(self, dict_list):

        stmt = insert(self.table).values(dict_list)
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
        print(f"\033[92mSuccessfully added{dict_list}\033[0m")


    @scripts_exceptions
    def whole_table_select(self):

        stmt = select(self.table)
        with self.engine.connect() as conn:
            result = conn.execute(stmt).fetchall()
            print(f"\n\033[92m{result}\033[0m\n\n")
        return(result)

    
    @scripts_exceptions
    def single_select(self, column, value):

        stmt = select(self.table).where(getattr(self.table.c, column) == value)
        with self.engine.connect() as conn:
            result = conn.execute(stmt).fetchall()
            print(f"\n\033[92m{result}\033[0m\n")
        return(result)


    @scripts_exceptions
    def single_update(self, column, value, column_modify, new_value):

        stmt = update(self.table).where(getattr(self.table.c, column) == value).values({column_modify: new_value})
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
            conn.commit()
        print(f"\033[92mSuccessfully updated {column_modify}:{new_value}\033[0m")


    @scripts_exceptions
    def multiple_update(self, column_modify, dict_list):

        stmt = update(self.table).where(getattr(self.table.c, column_modify) == bindparam("old_value")).values({column_modify: bindparam("new_value")})
        with self.engine.begin() as conn:
            conn.execute(stmt, dict_list)
            conn.commit()
        print(f"\033[92mSuccessfully updated! {column_modify}:{dict_list}\033[0m")


    @scripts_exceptions
    def single_delete(self, column, value):

        stmt = delete(self.table).where(getattr(self.table.c, column) == value)
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
            conn.commit()
        print(f"\033[92mSuccessfully deleted {column}:{value}\033[0m")
        
