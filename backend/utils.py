import falcon
import json
import pandas as pd
import pickle
import io,sys
import pandas.core.indexes
import numpy as np
sys.modules['pandas.indexes'] = pandas.core.indexes
from sklearn.preprocessing import LabelEncoder,OneHotEncoder
import lime
import lime.lime_tabular

class Data():
    def __init__(self):
        self.x_train = ""
        self.x_test = ""
        self.y_test = ""
        self.inversed_x_test = ""
        self.categorical_features = ""
        self.categorical_names = ""
        self.feature_names = ""
        self.label_names = ""
        self.trained_model = ""
        self.accessor = ""
        self.isOneHot = False
        self.prediction_result = ""
        self.oneHotEncoder = ""

    def input_data(self,target_name,data):
        if target_name == "X_train":
            self.x_train = data
        elif target_name == "X_test":
            self.x_test = data
        elif target_name == "y_test":
            self.y_test = data
        elif target_name == "Categorical Features":
            self.categorical_features = data
        elif target_name == "Categorical Names":
            self.categorical_names = data
        elif target_name == "Feature Names":
            self.feature_names = data
        elif target_name == "Label Names":
            self.label_names = data
        elif target_name == "Trained Model":
            self.trained_model = data

    def inverse_and_add_prediction(self):
        test = self.x_test.copy()
        ## categorical features inverse
        categorical_names = self.categorical_names
        categorical_features = self.categorical_features
        for i in categorical_features:
            le = LabelEncoder()
            le.fit(categorical_names[i])
            test.iloc[:,i] = le.inverse_transform(test.iloc[:,i])
        ## add prediction_result
        test[len(test.columns)] = self.prediction_result
        ## add index
        test[len(test.columns)] = list(np.arange(len(test)))
        test.columns = self.accessor
        self.inversed_x_test = test

    def create_accessor(self):
        self.feature_names = np.append(self.feature_names,"Prediction")
        self.feature_names = np.append(self.feature_names,"Index")
        feature_names = self.feature_names
        res = []
        for i in feature_names:
            res.append(i.replace(" ","").lower())
        self.accessor = res

    def addPrediction(self,isOneHot):
        self.isOneHot = isOneHot
        model = self.trained_model
        if not isinstance(self.x_train,np.ndarray):
            train = self.x_train.as_matrix()
        else:
            train = self.x_train
        if not isinstance(self.x_test,np.ndarray):
            test = self.x_test.as_matrix()
        else:
            test = self.x_test
        if isOneHot:
            encoder = OneHotEncoder(categorical_features=self.categorical_features)
            alldata = np.concatenate([train,test])
            encoder.fit(alldata)
            self.oneHotEncoder = encoder
            encoded_test = encoder.transform(test)
            prediction_result = model.predict_proba(encoded_test)
        else:
            ## for example, LightGBM
            prediction_result = model.predict_proba(test)
        t_res = []
        for i in prediction_result:
            t_res.append(i[0])
        self.prediction_result = t_res

class TabularLIME():
    def __init__(self):
        self.explainer = ""
        self.predict_fn = ""
        self.exp_instance = ""
        self.expScore = ""
        self.expList = ""
        self.expProba = ""

    def trainLIME(self,data):
        if not isinstance(data.x_train,np.ndarray):
            train = data.x_train.as_matrix()
        else:
            train = data.x_train
        self.explainer = lime.lime_tabular.LimeTabularExplainer(train,
        feature_names=data.feature_names, class_names=data.label_names,
        categorical_features=list(data.categorical_features),
        categorical_names=data.categorical_names, kernel_width=3)
        ## custom predict function
        self.predict_fn = lambda x: data.trained_model.predict_proba(data.oneHotEncoder.transform(x)).astype(float)
        print("train tabular LIME complete")

    def doExplanation(self,index,data):
        test = data.x_test.as_matrix()
        exp = self.explainer.explain_instance(test[int(index)], self.predict_fn, num_features=len(data.feature_names))
        self.exp_instance = exp
        self.expScore = exp.score
        self.expProba = exp.predict_proba
        self.expList = exp.as_list()

def check_train_test_dtype(df):
    message = "Data check passed"
    result = True
    if len(df.columns) < 1:
        message = "This dataframe is empty"
        result = False
        return message,result
    for column in df:
        if df[column].dtype not in ["int32","int64","float32","float64","int","float"]:
            message = "This data contains something other than int or float column"
            result = False
    return message,result

def check_target_test_dtype(target_test):
    message = "Data check passed"
    result = True
    if len(target_test.columns) > 1:
        message = "This target data is over 1 column"
        result = False
    if target_test.iloc[:,0].dtype not in ["int32","int64","int"]:
        message = "This data contains something other than int column"
        result = False

    return message,result

def check_pickle_list_dtype(pickle_list,target_name):
    message = "Data check passed"
    result = True
    ## nested array or not
    if isinstance(pickle_list[0],list):
        message = "Nested array can not be used"
        result = False
    if target_name == "Feature Names":
        for i in pickle_list:
            if not isinstance(i,str):
                message = "This list contains not string data"
                result = False
    elif target_name == "Categorical Features":
        for i in pickle_list:
            if not isinstance(i,int) and not isinstance(i,np.int32) and not isinstance(i,np.int64):
                message = "This list contains not integer data"
                result = False

    return message,result

def check_pickle_dict_dtype(pickle_dict):
    message = "Data check passed"
    result = True
    ## dict or not
    if not isinstance(pickle_dict,dict):
        message = "Not dict object can not be used"
        result = False
    return message,result

def methods_for_pickle(message,result,df,file,target_name):
    pickle_file = pickle.loads(file)
    ## if dataframe
    if isinstance(pickle_file,pd.core.frame.DataFrame):
        df = pickle_file
        if target_name == "X_train" or target_name == "X_test":
            message,result = check_train_test_dtype(df)
        elif target_name == "y_test":
            message,result = check_target_test_dtype(df)
    ## if numpy.ndarray, convert dataframe
    elif isinstance(pickle_file,np.ndarray):
        if target_name == "X_train" or target_name == "X_test":
            df = pd.DataFrame(pickle_file)
            message,result = check_train_test_dtype(df)
        elif target_name == "y_test":
            df = pd.DataFrame(pickle_file)
            message,result = check_target_test_dtype(df)
        elif target_name == "Categorical Features" or target_name == "Feature Names" or target_name == "Label Names":
            message,result = check_pickle_list_dtype(pickle_file,target_name)
    elif isinstance(pickle_file,list):
        if target_name == "Categorical Features" or target_name == "Feature Names" or target_name == "Label Names":
            np_pickle_file = np.array(pickle_file)
            df = np_pickle_file
            message,result = check_pickle_list_dtype(np_pickle_file,target_name)
        else:
            message = "This data is not pickled list although this data should be list"
            result = False
    elif isinstance(pickle_file,dict):
        df = pickle_file
        if target_name == "Categorical Names":
            message,result = check_pickle_dict_dtype(pickle_file)
        else:
            message = "This data is not pickled dict although this data should be dict"
            result = False
    else:
        message = "This data is not dataframe,numpy.ndarray,list or dict"
        result = False
    if target_name == "Trained Model":
        message = "Data Check Passed"
        df = pickle_file
        result = True
    return message,result,df

def check_data_content(file,target_name,file_type):
    message = "Data check passed"
    result = True
    df = ""
    if target_name == "X_train" or target_name == "X_test":
        if file_type == ".csv":
            df = pd.read_csv(io.BytesIO(file))
            ## df can contain number only
            message,result = check_train_test_dtype(df)
        elif file_type == ".pickle":
            message,result,df = methods_for_pickle(message,result,df,file,target_name)
        else:
            message = "This data is not dataframe or numpy.ndarray"
            result = False

    elif target_name == "y_test":
        if file_type == ".csv":
            df = pd.read_csv(io.BytesIO(file))
            message,result = check_target_test_dtype(df)
        elif file_type == ".pickle":
            message,result,df = methods_for_pickle(message,result,df,file,target_name)

    elif target_name == "Categorical Features" or target_name == "Feature Names" or target_name == "Categorical Names" or target_name == "Label Names":
        ## list only(pickle)
        if file_type == ".pickle":
            message,result,df = methods_for_pickle(message,result,df,file,target_name)
        else:
            message = "This data not pickle"
            result = False
            df = ""

    elif target_name == "Trained Model":
        ## pickle,h5 model file
        if file_type == ".pickle":
            message,result,df = methods_for_pickle(message,result,df,file,target_name)
        # elif file_type == ".h5":
        #     message,result,df = methods_for_h5(message,result,df,file,target_name)
        # elif file_type == ".model":
        #     message,result,df = methods_for_model(message,result,df,file,target_name)
        else:
            message = "This data not pickle"
            result = False
            df = ""

    return message,result,df
