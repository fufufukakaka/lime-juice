import { take, put,call,select } from "redux-saga/effects"
import superFetch from "../modules/superFetch"
import {startRenderAndTrain,returnRenderResult} from "../actions/juicemixer"

export function* handleRender() {
  while (true) {
    const action = yield take([`${startRenderAndTrain}`])
      const { payload} = yield call(superFetch, {
        url: "limejuice/render_data",
        type: "POST"
    }
  )
    yield put(returnRenderResult(Object.assign({}, payload)))
  }
}
