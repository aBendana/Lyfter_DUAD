from functools import wraps
from sqlalchemy.exc import IntegrityError, ProgrammingError, OperationalError, SQLAlchemyError, DatabaseError
from sqlalchemy import insert, select, update, bindparam, delete, and_, func


# decorator for manage exceptions
def query_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)

        except IntegrityError as error:
            print("\033[91mIntegrity error:\033[0m", error)
            msg = str(error.orig) if hasattr(error, 'orig') else str(error)
            raise ValueError(f"Integrity error: {msg}")

        except ProgrammingError as error:
            print("\033[91mSyntax error:\033[0m", error)
            msg = str(error.orig) if hasattr(error, 'orig') else str(error)
            raise ValueError(f"Syntax error: {msg}")

        except OperationalError as error:
            print("\033[91mConnection error:\033[0m", error)
            msg = str(error.orig) if hasattr(error, 'orig') else str(error)
            raise ConnectionError(f"Connection error: {msg}")

        except DatabaseError as error:
            print("\033[91mDatabase error:\033[0m", error)
            msg = str(error.orig) if hasattr(error, 'orig') else str(error)
            raise ValueError(f"Database error: {msg}")
        
        except SQLAlchemyError as error:
            print("\033[91mSQLAlchemy error:\033[0m", error)
            msg = str(error.orig) if hasattr(error, 'orig') else str(error)
            raise RuntimeError(f"SQLAlchemy error: {msg}")

        except ValueError as error:
            print("\033[91mValue error:\033[0m", error)
            raise

        except Exception as error:
            print("\033[91mUnexpected error:\033[0m", error)
            raise RuntimeError(f"Unexpected error: {str(error)}")
    
    return wrapper



class QueryFunctions:

    def __init__(self, engine, table):
        self.engine = engine
        self.table = table


    @query_exceptions
    def single_insert_register(self, data:dict):
        # unpack data key=value
        columns = [self.table.c.id] if hasattr(self.table.c, "id") else []
        if hasattr(self.table.c, "rol"):
            columns.append(self.table.c.rol)
        if columns:
            stmt = insert(self.table).returning(*columns).values(data)
        else:
            stmt = insert(self.table).values(data)
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
        print(f"\033[92m(ORM)Successfully added:{data}\033[0m")
        return result


    @query_exceptions
    def single_insert(self, data: dict):
        # return all columns
        stmt = insert(self.table).returning(*self.table.c).values(data)
        with self.engine.begin() as conn:
            # return a dictionary instead a row
            data = conn.execute(stmt).mappings().fetchone()

        # enums type returning like a string (rol_type, status_type)
        formatted_data = {}
        for col_name, val in data.items():
            # enum values
            if hasattr(val, "value"):
                formatted_data[col_name] = val.value
            else:
                formatted_data[col_name] = val

        print(f"\033[92m(ORM) Successfully added: {formatted_data}\033[0m")
        return formatted_data


    @query_exceptions
    def multiple_inserts(self, dict_list):

        stmt = insert(self.table).values(dict_list)
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
        print(f"\033[92mSuccessfully added{dict_list}\033[0m")


    @query_exceptions
    def whole_table_select(self):

        stmt = select(self.table)
        with self.engine.connect() as conn:
            result = conn.execute(stmt).fetchall()
            print(f"\n\033[92m{result}\033[0m\n\n")
        return(result)
    

    @query_exceptions
    def select_with_pagination(self, data, offset, limit):
        
        stmt = select(self.table).order_by(data.id.asc()).offset(offset).limit(limit)
        with self.engine.connect() as conn:
            result = conn.execute(stmt).fetchall()
            print(f"\n\033[92m{result}\033[0m\n")
        return result


    @query_exceptions
    def single_select(self, column, value):

        stmt = select(self.table).where(getattr(self.table.c, column) == value)
        with self.engine.connect() as conn:
            result = conn.execute(stmt).fetchall()
            print(f"\n\033[92m(ORM)SELECT {result}\033[0m\n")
        return result
    

    @query_exceptions
    def select_by_two_values(self, column_a, column_b, value_a, value_b):

        stmt = select(self.table).where(and_(getattr(self.table.c, column_a) == value_a),(getattr(self.table.c, column_b) == value_b))
        with self.engine.connect() as conn:
            result = conn.execute(stmt).fetchall()
            print(f"\n\033[92m{result}\033[0m\n")
        return result


    @query_exceptions
    def get_max_id(self):
        stmt = select(func.max(self.table.c.id))
        with self.engine.connect() as conn:
            result = conn.execute(stmt).scalar()
            print(f"\n\033[92m(ORM)MAX ID: {result}\033[0m\n")
        return result



    @query_exceptions
    def single_update(self, column, value, column_modify, new_value):

        stmt = update(self.table).where(getattr(self.table.c, column) == value).values({column_modify: new_value})
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
            conn.commit()
        print(f"\033[92mSuccessfully updated {column_modify}:{new_value}\033[0m")

    
    @query_exceptions
    def single_update_by_two_values(self, search_col_a, search_value_a, search_col_b, search_value_b, column_modify, new_value):

        stmt = update(self.table).where(and_(getattr(self.table.c, search_col_a) == search_value_a, 
                                        getattr(self.table.c, search_col_b) == search_value_b)).values({column_modify: new_value})
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
            conn.commit()
        print(f"\033[92mSuccessfully updated {column_modify}:{new_value}\033[0m")


    @query_exceptions
    def multiple_update(self, column_modify, dict_list):

        stmt = update(self.table).where(getattr(self.table.c, column_modify) == bindparam("old_value")).values({column_modify: bindparam("new_value")})
        with self.engine.begin() as conn:
            conn.execute(stmt, dict_list)
            conn.commit()
        print(f"\033[92mSuccessfully updated! {column_modify}:{dict_list}\033[0m")


    @query_exceptions
    def single_delete(self, column, value):

        stmt = delete(self.table).where(getattr(self.table.c, column) == value)
        with self.engine.begin() as conn:
            result = conn.execute(stmt)
            conn.commit()
        print(f"\033[92mSuccessfully deleted {column}:{value}\033[0m")
        
