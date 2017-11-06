import { createReducer } from "redux-act"
import { List } from 'immutable'
import {startRenderAndTrain,returnRenderResult,fetchInitRequest,returnInitRequest} from "../actions/juicemixer"

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
  [startRenderAndTrain]: (state) => Object.assign({}, state, {
    isFetching: true,
    isComplete: false
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
