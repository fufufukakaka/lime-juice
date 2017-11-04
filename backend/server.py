import falcon
import json
import pandas as pd
import io
from falcon_multipart.middleware import MultipartMiddleware

class Files(object):
    def on_post(self, req, resp):
        payload = req.get_param("data")
        df = pd.read_csv(io.BytesIO(payload.file.read()))
        items = {
            'df_length': len(df)
        }
        resp.body = json.dumps(items,ensure_ascii=False)

api = falcon.API(middleware=[MultipartMiddleware()])
api.add_route('/limejuice/check_data', Files())
