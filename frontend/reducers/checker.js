import { createReducer } from "redux-act"
import { List } from 'immutable'
import {sendData,
  returnResult,
  registerData,
  registerResult,
  fetchInitRequest,
  returnInitRequest,
  retrieveRequest,
  returnRetrieveRequest
} from "../actions/checker"

const initial = {
  checker: {
    //data sending status
    sendArray:List([false,false,false,false,false,false,false,false]),
    //each data status
    //{x}Check...checked or not
    checkArray:List([false,false,false,false,false,false,false,false]),
    //{x}Ok...pass check or not
    okArray:List([false,false,false,false,false,false,false,false]),
    //each data check message
    commentArray:List(["","","","","","","",""]),
    // each datasets
    dataArray:List(["","","","","","","",""]),
    isRegistering : false,
    registerComplete: false,
    isInitFetching: false,
    isInitComplete:false,
    savedDatasets:[],
    isRetrieve: false,
    isRetrieveComplete:false,
    savedDatasets:[]
  }
}

const checker = createReducer({
  [sendData]: (state,payload) => Object.assign({}, state, {
    sendArray: state.sendArray.set(payload.number,true),
    checkArray:state.checkArray.set(payload.number,false),
    okArray:state.okArray.set(payload.number,false),
    commentArray:state.commentArray.set(payload.number,""),
    dataArray:state.dataArray.set(payload.number,payload.data)
  }),
  [returnResult]: (state,payload) => Object.assign({}, state, {
    sendArray: state.sendArray.set(payload.number,false),
    checkArray:state.checkArray.set(payload.number,true),
    okArray:state.okArray.set(payload.number,payload.result),
    commentArray:state.commentArray.set(payload.number,payload.message)
  }),
  [registerData]: (state,payload) => Object.assign({}, state, {
    isRegistering: true
  }),
  [registerResult]: (state,payload) => Object.assign({}, state, {
    isRegistering: false,
    registerComplete: true
  }),
  [fetchInitRequest]:(state)  => Object.assign({}, state, {
    isFetching: true,
    isComplete: false
  }),
  [returnInitRequest]:(state,payload)  => Object.assign({}, state, {
    isFetching: false,
    isComplete: true,
    savedDatasets: payload.savedDatasets
  }),
  [retrieveRequest]:(state)  => Object.assign({}, state, {
    isRetrieve: true,
    isRetrieveComplete: false
  }),
  [returnRetrieveRequest]:(state,payload)  => Object.assign({}, state, {
    isRetrieve: false,
    isRetrieveComplete: true,
    sendArray:List([false,false,false,false,false,false,false,false]),
    checkArray:List([true,true,true,true,true,true,true,true]),
    okArray:List([true,true,true,true,true,true,true,true]),
    commentArray:List(["Check Passed","Check Passed","Check Passed","Check Passed","Check Passed","Check Passed","Check Passed","Check Passed"])
  })
}, initial.checker)

export default checker
