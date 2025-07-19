from sqlalchemy import create_engine

def db_connection():

    DB_URI = 'postgresql://postgres:JhLv#99*@localhost:5432/postgres'
    engine = create_engine(DB_URI, echo=True)

    try:
        connection = engine.connect()
        print("Connection successful!")
        connection.close()
    except Exception as e:
        print("Connection failed:", e)

    return engine
