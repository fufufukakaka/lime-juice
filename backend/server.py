import falcon
import json
import pandas as pd
import pickle
import io,sys
from falcon_multipart.middleware import MultipartMiddleware
from utils import Data,check_data_content
import pandas.core.indexes
import numpy as np
sys.modules['pandas.indexes'] = pandas.core.indexes

dataset = Data()

class Files(object):
    def on_post(self, req, resp):
        payload = req.get_param("data")
        target_name = req.get_header("target")
        number = req.get_header("number")
        filename = payload.filename
        file = payload.file.read()
        check_types = [".csv",".pickle",".h5",".model"]
        file_type = "else"
        for i in check_types:
            if i in filename:
                file_type = i
                break

        message,result,data = check_data_content(file,target_name,file_type)
        items = {
            'filename': payload.filename,
            "type": file_type,
            "target": target_name,
            "number": number,
            "message": message,
            "result": result
        }
        if result:
            dataset.input_data(target_name,data)
        resp.body = json.dumps(items,ensure_ascii=False)

class Render(object):
    def on_post(self,req,resp):
        dataset.create_accessor()
        dataset.inverse_test_data()
        data = {
            "feature_names":list(dataset.feature_names),
            "accessor":list(dataset.accessor),
            "tabledata":json.loads(dataset.inversed_x_test.to_json(orient="records"))
        }
        resp.body = json.dumps(data,ensure_ascii=False)

api = falcon.API(middleware=[MultipartMiddleware()])
api.add_route('/limejuice/check_data', Files())
api.add_route('/limejuice/render_data', Render())
