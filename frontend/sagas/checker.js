import { take, put,call,select } from "redux-saga/effects"
import superFetch from "../modules/superFetch"
import superFetchFile from "../modules/superFetchFile"
import {
  sendData,
  returnResult,
  registerData,
  registerResult,
  fetchInitRequest,
  returnInitRequest,
  retrieveRequest,
  returnRetrieveRequest
} from "../actions/checker"

export function* handleInit() {
  while (true) {
    const action = yield take([`${fetchInitRequest}`])
      const { payload} = yield call(superFetch, {
        url: "limejuice/init_request",
        type: "GET"
    }
  )
    yield put(returnInitRequest(Object.assign({}, payload)))
  }
}

export function* handleRetrieve() {
  while (true) {
    const action = yield take([`${retrieveRequest}`])
      const { payload} = yield call(superFetch, {
        url: "limejuice/retrieve_request",
        type: "POST",
        custom: {
          headers: {
            target: action.payload.retrieveName
          }
        }
    }
  )
    yield put(returnRetrieveRequest(Object.assign({}, payload)))
  }
}

export function* handleSendData() {
  while (true) {
    const action = yield take([`${sendData}`])
    const listnames = [
      "X_train",
      "X_test",
      "y_test",
      "Categorical Features",
      "Categorical Names",
      "Feature Names",
      "Label Names",
      "Trained Model"
    ]
      const { payload} = yield call(superFetchFile, {
        url: "limejuice/check_data",
        type: "POST",
        data: action.payload.data,
        custom: {
          headers: {
            target: listnames[action.payload.number],
            number: action.payload.number
          }
        }
    }
  )
    yield put(returnResult(Object.assign({}, payload)))
  }
}

export function* handleRegisterData() {
  while (true) {
    const action = yield take([`${registerData}`])
      const { payload} = yield call(superFetch, {
        url: "limejuice/register_data",
        type: "POST",
        custom: {
          headers: {
            registerName:action.payload.registerName
          }
        }
    }
  )
    yield put(registerResult(Object.assign({}, payload)))
  }
}
