import { take, put,call,select } from "redux-saga/effects"
import superFetch from "../modules/superFetch"
import {
  sendData,
  returnResult
} from "../actions/checker"

export function* handleSendData() {
  while (true) {
    const action = yield take([`${sendData}`])
      const { payload} = yield call(superFetch, {
        url: "limejuice/getRecent",
        type: "GET"
    }
  )
    yield put(returnResult(Object.assign({}, payload)))
  }
}
