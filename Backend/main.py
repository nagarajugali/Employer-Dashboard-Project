import tornado.ioloop
import tornado.web
import tornado.autoreload
from handler.employee_handler import EmployeeHandler
from handler.addemployee_handler import AddEmployeeHandler
from handler.deleteemployee_handler import DeleteEmployeeHandler
from handler.loginpage_handler import LoginHandler
from handler.editemployee_handler import EditEmployeeHandler
def make_app():
    return tornado.web.Application([
        (r"/login",LoginHandler),
         (r"/employee/([0-9]*)",DeleteEmployeeHandler),
        (r'/employee/add',AddEmployeeHandler),
        (r"/employee",EmployeeHandler),
        (r"/employee/edit/([0-9]*)", EditEmployeeHandler)])
if __name__ == "__main__":
    app=make_app()
    app.listen(8888)
    print("Server is running on http://localhost:8888")
    tornado.autoreload.start()
    tornado.ioloop.IOLoop.current().start()  