from handler.base_handler import BaseHandler
from db.db_config import get_connection
import json
class EditEmployeeHandler(BaseHandler):
    async def put(self,emp_id):
        try:
            conn=get_connection()
            cursor=conn.cursor()
            query="SELECT 1 FROM employee WHERE employee_id=%s;"
            cursor.execute(query, (emp_id,))
            if cursor.fetchone() is None:
                self.set_status(404)
                self.write({"status":"error","message":"Employee not found"})
                return
            data= json.loads(self.request.body)
            employee_id=data.get("employee_id")
            employee_name=data.get("employee_name")
            age=data.get("age")
            gender=data.get("gender")
            skillset=data.get("skillset")
            experience=data.get("experience")
            joining_date=str(data.get("joining_date"))
            job_role=data.get("job_role")
            query="UPDATE employee SET employee_name=%s,age=%s,gender=%s,skillset=%s,experience=%s,joining_date=%s,job_role=%s WHERE employee_id=%s;"
            cursor.execute(query,(employee_name,age,gender,skillset,experience,joining_date,job_role,employee_id))
            conn.commit()
            self.write({"status":"success" , "message":"Employee updated successfully"})
        except Exception as e:
            self.set_status(500)
            self.write({"status":"error","message":str(e)})
        finally:
            cursor.close()
            conn.close()
            
            