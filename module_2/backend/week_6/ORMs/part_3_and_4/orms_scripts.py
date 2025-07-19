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



class Insert:

    def __init__(self, engine):
        self.engine = engine

    @scripts_exceptions
    def single_insert(self, table, data:dict):

        # unpack data key=value
        stmt = insert(table).values(**data)
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
            conn.commit()
        print(f"\033[92mSuccessfully added:{data}\033[0m")
        

    @scripts_exceptions
    def multiple_inserts(self, table, dict_list):

        stmt = insert(table).values(dict_list)
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
        print(f"\033[92mSuccessfully added{dict_list}\033[0m")

    

class Select:

    def __init__(self, engine):
        self.engine = engine


    @scripts_exceptions
    def whole_table_select(self, table):

        stmt = select(table)
        with self.engine.connect() as conn:
            result = conn.execute(stmt).fetchall()
            print(f"\n\033[92m{result}\033[0m\n\n")
        return(result)

    
    @scripts_exceptions
    def single_select(self, table, column, value):

        stmt = select(table).where(getattr(table.c, column) == value)
        with self.engine.connect() as conn:
            result = conn.execute(stmt).fetchall()
            print(f"\n\033[92m{result}\033[0m\n")
        return(result)



class Update:

    def __init__(self, engine):
        self.engine = engine


    @scripts_exceptions
    def single_update(self, table, column, value, column_modify, new_value):

        stmt = update(table).where(getattr(table.c, column) == value).values({column_modify: new_value})
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
            conn.commit()
        print(f"\033[92mSuccessfully updated {column_modify}:{new_value}\033[0m")


    @scripts_exceptions
    def multiple_update(self, table, column_modify, dict_list):

        stmt = update(table).where(getattr(table.c, column_modify) == bindparam("old_value")).values({column_modify: bindparam("new_value")})
        with self.engine.begin() as conn:
            conn.execute(stmt, dict_list)
            conn.commit()
        print(f"\033[92mSuccessfully updated! {column_modify}:{dict_list}\033[0m")



class Delete:

    def __init__(self, engine):
        self.engine = engine


    @scripts_exceptions
    def single_delete(self, table, column, value):

        stmt = delete(table).where(getattr(table.c, column) == value)
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
            conn.commit()
        print(f"\033[92mSuccessfully deleted {column}:{value}\033[0m")
        
