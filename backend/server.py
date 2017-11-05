import falcon
import json
import pandas as pd
import pickle
import io,sys
from falcon_multipart.middleware import MultipartMiddleware
import pandas.core.indexes
import numpy as np
sys.modules['pandas.indexes'] = pandas.core.indexes

def check_df_dtype(df):
    print(df)
    message = "Data check passed"
    result = True
    if len(df.columns) < 1:
        message = "This dataframe is empty"
        result = False
        return message,result
    for column in df:
        if df[column].dtype not in ["int32","int64","float32","float64"]:
            message = "This data contains something other than int or float column"
            result = False
    return message,result

def check_data_content(file,target_name,file_type):
    message = "Data check passed"
    result = True
    if target_name == "X_train" or target_name == "X_test":
        if file_type == ".csv":
            df = pd.read_csv(io.BytesIO(file))
            ## df can contain number only
            message,result = check_df_dtype(df)
        elif file_type == ".pickle":
            pickle_file = pickle.loads(file)
            print(isinstance(pickle_file,pd.core.frame.DataFrame))
            ## if dataframe
            if isinstance(pickle_file,pd.core.frame.DataFrame):
                message,result = check_df_dtype(pickle_file)
            ## if numpy.ndarray, convert dataframe
            elif type(pickle_file) is types.numpy.ndarray:
                df = pd.DataFrame(pickle_file)
                message,result = check_df_dtype(df)
            else:
                message = "This data not dataframe or numpy.ndarray"
                result = False
        else:
            message = "This data not dataframe or numpy.ndarray"
            result = False

    return message,result

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

        message,result = check_data_content(file,target_name,file_type)
        items = {
            'filename': payload.filename,
            "type": file_type,
            "target": target_name,
            "number": number,
            "message": message,
            "result": result
        }
        resp.body = json.dumps(items,ensure_ascii=False)

api = falcon.API(middleware=[MultipartMiddleware()])
api.add_route('/limejuice/check_data', Files())
