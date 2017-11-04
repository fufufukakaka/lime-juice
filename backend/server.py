import falcon
import json
from falcon_multipart.middleware import MultipartMiddleware

class Files(object):
    def on_post(self, req, resp):
        print(req.stream.read().decode("utf-8"))
        payload = req.stream.read().decode("utf-8")
        number = payload["number"]
        print(number)
        data = payload["data"]
        print(data)
        raw = data.file.read()
        items = {
            'filetype': str(type(raw))
        }
        resp.body = json.dumps(items,ensure_ascii=False)

api = falcon.API(middleware=[MultipartMiddleware()])
api.add_route('/limejuice/check_data', Files())
