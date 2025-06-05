import tornado.web
class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin","http://localhost:3000")
        self.set_header("Access-Control-Allow-Methods","POST, GET, DELETE,PUT, OPTIONS")
        self.set_header("Access-Control-Allow-Headers","Content-Type")
    def options(self,*args,**kwargs):
        self.set_status(204)
        self.finish()