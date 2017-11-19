import { createReducer } from "redux-act"
import { List } from 'immutable'
import {
  startRenderAndTrain,
  returnRenderResult,
  requestRenderExplanation,
  returnRenderExplanation} from "../actions/juicemixer"

const initial = {
  juicemixer: {
    isFetching: false,
    isComplete:false,
    tableData:{},
    featureNames:[],
    accessor:[],
    datasetArray:[],
    isExpFetching: false,
    isExpComplete: false,
    targetIndex: "",
    expHtml: ""
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
  }),
  [requestRenderExplanation] : (state,payload) => Object.assign({}, state, {
    isExpFetching: true,
    isExpComplete: false,
    targetIndex: payload.index
  }),
  [returnRenderExplanation] : (state,payload) => Object.assign({}, state, {
    isExpFetching: false,
    isExpComplete: true,
    expHtml: payload.expHtml
  })
}, initial.juicemixer)

export default juicemixer
