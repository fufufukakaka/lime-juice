import { take, put,call,select } from "redux-saga/effects"
import superFetch from "../modules/superFetch"
import superFetchFile from "../modules/superFetchFile"
import {
  sendData,
  returnResult,
  registerData,registerResult
} from "../actions/checker"

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
