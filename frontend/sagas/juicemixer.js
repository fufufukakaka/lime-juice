import { take, put,call,select } from "redux-saga/effects"
import superFetch from "../modules/superFetch"
import {
  startRenderAndTrain,
  returnRenderResult,
  requestRenderExplanation,
  returnRenderExplanation} from "../actions/juicemixer"

export function* handleRender() {
  while (true) {
    const action = yield take([`${startRenderAndTrain}`])
      const { payload} = yield call(superFetch, {
        url: "limejuice/render_data",
        type: "POST",
        custom: {
          headers: {
            isOneHot: action.payload.onehotencoding
          }
        }
    }
  )
    yield put(returnRenderResult(Object.assign({}, payload)))
  }
}

export function* handleExplanation(){
  while (true) {
    const action = yield take([`${requestRenderExplanation}`])
      const { payload} = yield call(superFetch, {
        url: "limejuice/request_explanation",
        type: "POST",
        custom: {
          headers: {
            targetIndex: action.payload.index
          }
        }
    }
  )
    yield put(returnRenderExplanation(Object.assign({}, payload)))
  }
}
