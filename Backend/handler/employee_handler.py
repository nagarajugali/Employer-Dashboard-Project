import tornado.web
from db.db_config import get_connection
from handler.base_handler import BaseHandler
class EmployeeHandler(BaseHandler):
    async def get(self):
        try:
            conn=get_connection()
            cursor=conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM employee;")
            employee=cursor.fetchall()
            for emp in employee:
                emp["joining_date"]=emp["joining_date"].strftime("%Y-%m-%d")
            self.set_status(200)
            self.write({"status":"success","data":employee})
            
        except Exception as e:
            self.set_status(500)
            self.write({"status":"error","message":str(e)})
        finally:
            cursor.close()
            conn.close()    