import { take, put,call,select } from "redux-saga/effects"
import superFetch from "../modules/superFetch"
import superFetchFile from "../modules/superFetchFile"
import {
  sendData,
  returnResult
} from "../actions/checker"

export function* handleSendData() {
  while (true) {
    const action = yield take([`${sendData}`])
      const { payload} = yield call(superFetchFile, {
        url: "limejuice/check_data",
        type: "POST",
        data: action.payload.data
    }
  )
    yield put(returnResult(Object.assign({}, payload)))
  }
}
