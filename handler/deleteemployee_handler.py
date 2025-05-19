from handler.base_handler import BaseHandler
from db.db_config import get_connection
class DeleteEmployeeHandler(BaseHandler):
    async def delete(self,empl_id):
        try:
            conn=get_connection()
            cursor=conn.cursor()
            query="SELECT 1 FROM employee WHERE employee_id=%s;"
            cursor.execute(query,(empl_id,))
            result=cursor.fetchone()
            if result:
                query="DELETE FROM employee WHERE employee_id=%s;"
                cursor.execute(query,(empl_id,))
                conn.commit()
                self.set_status(200)
                self.write({"status":"success","message":"Employee deleted successfully"})
            else:
                self.set_status(404)
                self.write({"status":"error","message":"Employee not found"})
        except Exception as e:
            self.set_status(500)
            self.write({"status":"error","message":str(e)})
        finally:
            cursor.close()
            conn.close()