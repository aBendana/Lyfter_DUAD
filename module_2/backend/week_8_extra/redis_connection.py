from redis import Redis
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv(dotenv_path=r"E:\Studies\Lyfter\Module_2\Backend\week_8_extra\dbs.env")

class RedisConnection:

    def __init__(self):
        self.host = os.getenv("redis_host")
        self.port = int(os.getenv("redis_port"))
        self.password = os.getenv("redis_password")

    def redis_client(self):
        try:
            client = Redis(host=self.host, port=self.port, password=self.password)
            connection_status = client.ping()
            if connection_status:
                print("\nConnection to Redis successful!\n")
            return client
        
        except Exception as e:
            print(f"\nConnection to Redis failed: {e}\n")
            return None


if __name__ == '__main__':
    test_connection = RedisConnection()
    redis_client = test_connection.redis_client()