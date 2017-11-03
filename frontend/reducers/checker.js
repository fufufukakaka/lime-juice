import { createReducer } from "redux-act"
import { List } from 'immutable'
import {sendData,returnResult} from "../actions/checker"

const initial = {
  checker: {
    //data sending status
    isSending:false,
    //each data status(xTrain,xTest,yTrain,yTest,featureNames,labelNames,model)
    //{x}Check...checked or not
    checkArray:List([false,false,false,false,false,false,false]),
    //{x}Ok...pass check or not
    okArray:List([false,false,false,false,false,false,false]),
    //each data check message
    commentArray:List(["","","","","","",""])
  }
}

const checker = createReducer({
  [sendData]: (state,payload) => Object.assign({}, state, {
    isSending: true,
    checkArray:state.checkArray.set(payload.number,false),
    okArray:state.okArray.set(payload.number,false),
    commentArray:state.commentArray.set(payload.number,"")
  }),
  [returnResult]: (state,payload) => Object.assign({}, state, {
    isSending: false,
    checkArray:state.checkArray.set(payload.number,true),
    okArray:state.okArray.set(payload.number,payload.checkStatus),
    commentArray:state.commentArray.set(payload.number,payload.checkComment)
  })
}, initial.checker)

export default checker
