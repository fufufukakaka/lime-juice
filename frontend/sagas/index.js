import { fork } from "redux-saga/effects"
import * as checker from "./checker"
import * as juicemixer from "./juicemixer"

export default function* rootSaga() {
  yield fork(checker.handleSendData)
  yield fork(checker.handleRegisterData)
  yield fork(juicemixer.handleRender)
}
