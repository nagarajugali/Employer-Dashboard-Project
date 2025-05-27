from handler.base_handler import BaseHandler
from db.db_config import get_connection
import bcrypt
import jwt
from datetime import datetime, timezone,timedelta
import json,os,dotenv
dotenv.load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
class LoginHandler(BaseHandler):
    async def post(self):
        data=json.loads(self.request.body)
        username=data.get("username")
        password=data.get("password")
        if not username or not password:
            self.set_status(400)
            self.write({"status": "error", "message": "Username and password are required."})
            return
        conn=get_connection()
        cursor=conn.cursor(dictionary=True)
        cursor.execute("SELECT username,password_hash FROM login;")
        result=cursor.fetchone()
        # Check if the username and password match and create a JWT token
        if result['username'] == username and bcrypt.checkpw(password.encode('utf-8'),(result['password_hash']).encode('utf-8')):
            # creating expiration time for the token
            payload = {
                "username": username,
                "exp": datetime.now(timezone.utc) + timedelta(hours=1)  # Token valid for 1 hour
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
            self.set_status(200)
            self.write({"status": "success", "message": "Login successful.", "token": token})
        else:
            self.set_status(401)
            self.write({"status": "error", "message": "Invalid username or password."})
        cursor.close()
        conn.close()


