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
    isExpFetching: false,
    isExpComplete: false,
    targetIndex: "",
    expScore: 0,
    cofNames : "",
    cofScores : "",
    colorArray:"",
    expProba: ""
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
    expScore: payload.expScore,
    cofNames : payload.cofNames,
    cofScores : payload.cofScores,
    colorArray: payload.colorArray,
    expProba: payload.expProba
  })
}, initial.juicemixer)

export default juicemixer
