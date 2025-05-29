
from handler.base_handler import BaseHandler
from db.db_config import get_connection
import json
class AddEmployeeHandler(BaseHandler):
    async def post(self):
        try:
            data=json.loads(self.request.body)
            employee_name=data.get("employee_name")
            age=data.get("age")
            gender=data.get("gender")
            skillset=data.get("skillset")
            experience=data.get("experience")
            joining_date=str(data.get("joining_date"))
            job_role=data.get("job_role")
            conn=get_connection()
            cursor=conn.cursor()
            query="INSERT INTO employee(employee_name,age,gender,skillset,experience,joining_date,job_role) VALUES(%s,%s,%s,%s,%s,%s,%s);"
            cursor.execute(query,(employee_name,age,gender,skillset,experience,joining_date,job_role))
            conn.commit()
            self.write({"status":"success" , "message":"Employee added successfully"})
        except Exception as e:
            self.set_status(500)
            self.write({"status":"error","message":str(e)})
        finally:
            cursor.close()
            conn.close()
    

        


