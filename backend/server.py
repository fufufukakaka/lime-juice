import falcon
import json
import pandas as pd
import pickle
import io,sys,os,traceback
from falcon_multipart.middleware import MultipartMiddleware
from utils import Data,check_data_content,TabularLIME
import pandas.core.indexes
from os.path import join, relpath,dirname,abspath
from glob import glob
import numpy as np
sys.modules['pandas.indexes'] = pandas.core.indexes

dataset = Data()
t_lime = TabularLIME()

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
        isOneHot = req.get_header("isOneHot")
        dataset.addPrediction(isOneHot)
        dataset.create_accessor()
        dataset.inverse_and_add_prediction()
        t_lime.trainLIME(dataset)
        data = {
            "feature_names":list(dataset.feature_names),
            "accessor":list(dataset.accessor),
            "tabledata":json.loads(dataset.inversed_x_test.to_json(orient="records"))
        }
        resp.body = json.dumps(data,ensure_ascii=False)

class RenderExp(object):
    def on_post(self,req,resp):
        index = req.get_header("targetIndex")
        t_lime.doExplanation(index,dataset)
        data = {
            "expHtml":t_lime.explainHtml
        }
        resp.body = json.dumps(data,ensure_ascii=False)

class Inits(object):
    def on_get(self,req,resp):
        path = 'stored_data'
        current_dir = dirname(abspath(__file__))
        files = [relpath(x, path) for x in glob(join(current_dir,path, '*'))]
        res = []
        for i in files:
            res.append(i.split(".")[0])
        data = {
            "savedDatasets":res,
        }
        resp.body = json.dumps(data,ensure_ascii=False)

class Register(object):
    def on_post(self,req,resp):
        dataset_name = req.get_header("registerName")
        message = "Data Saved"
        current_dir = dirname(abspath(__file__))
        saved_list = ["X_train","X_test","y_test",
        "Categorical Features","Categorical Names","Feature Names","Label Names","Trained Model"]
        object_list = [dataset.x_train,dataset.x_test,dataset.y_test,
        dataset.categorical_features,dataset.categorical_names,dataset.feature_names,
        dataset.label_names,dataset.trained_model]
        try:
            directory = join(current_dir,"stored_data",dataset_name)
            if not os.path.exists(directory):
                os.makedirs(directory)
            for i,j in zip(saved_list,object_list):
                path = join(current_dir,"stored_data",dataset_name,i+".pickle")
                pickle.dump(j,open(path,"wb"))
        except:
            ex, ms, tb = sys.exc_info()
            print(ms)
            message = str(ms)
        data = {
            "status":message
        }
        resp.body = json.dumps(data,ensure_ascii=False)

class Retrieve(object):
    def on_post(self,req,resp):
        dataset_name = req.get_header("target")
        message = "Data Retrieve"
        current_dir = dirname(abspath(__file__))
        saved_list = ["X_train","X_test","y_test",
        "Categorical Features","Categorical Names","Feature Names","Label Names","Trained Model"]
        # try:
        for i in saved_list:
            path = join(current_dir,"stored_data",dataset_name,i+".pickle")
            t = pickle.load(open(path,"rb"))
            dataset.input_data(i,t)
        # except:
        #     saved_dataset['feature_names'] = "None"
        #     ex, ms, tb = sys.exc_info()
        #     print(ms)
        #     message = str(ms)

        data = {
            "status":message,
            "feature_names":list(dataset.feature_names),
        }
        resp.body = json.dumps(data,ensure_ascii=False)

api = falcon.API(middleware=[MultipartMiddleware()])
api.add_route('/limejuice/init_request', Inits())
api.add_route('/limejuice/retrieve_request', Retrieve())
api.add_route('/limejuice/check_data', Files())
api.add_route('/limejuice/render_data', Render())
api.add_route('/limejuice/request_explanation', RenderExp())
api.add_route('/limejuice/register_data', Register())
