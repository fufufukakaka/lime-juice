import { createReducer } from "redux-act"
import { List } from 'immutable'
import {startRenderAndTrain,returnRenderResult} from "../actions/juicemixer"

const initial = {
  juicemixer: {
    isFetching: false,
    isComplete:false,
    tableData:{},
    featureNames:[],
    accessor:[],
    datasetArray:[]
  }
}

const juicemixer = createReducer({
  [startRenderAndTrain]: (state,payload) => Object.assign({}, state, {
    isFetching: true,
    isComplete: false,
    isOneHot: payload.onehotencoding
  }),
  [returnRenderResult]: (state,payload) => Object.assign({}, state, {
    isFetching: false,
    isComplete: true,
    tableData: payload.tabledata,
    featureNames:payload.feature_names,
    accessor:payload.accessor
  })
}, initial.juicemixer)

export default juicemixer
