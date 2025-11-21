from redis import Redis
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv(dotenv_path=r"E:\Studies\Lyfter\Repos\Lyfter_DUAD\Lyfter_DUAD\module_2\backend\project\advance_5\dbs.env")

class RedisConnection:
    _client = None

    def __init__(self):
        if RedisConnection._client is None:
            self._connect()
        self.client = RedisConnection._client


    def _connect(self):
        try:
            self.host = os.getenv("redis_host")
            self.port = int(os.getenv("redis_port"))
            self.password = os.getenv("redis_password")

            client = Redis(host=self.host, port=self.port, password=self.password) #, decode_responses=True) # bytes to strings

            connection_status = client.ping()
            if connection_status:
                print("\nConnection to Redis successful!\n")
                RedisConnection._client = client
            # return client
        
        except Exception as e:
            print(f"\nConnection to Redis failed: {e}\n")
            RedisConnection.client = None
            # return None


    def get_client(self):
        # return an active redis client, reconnect if necessary
        if RedisConnection._client is None:
            self._connect()
        return RedisConnection._client



# if __name__ == '__main__':
#     test_connection = RedisConnection()
#     redis_client = test_connection.redis_client()