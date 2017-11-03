import { fork } from "redux-saga/effects"
import * as checker from "./checker"

export default function* rootSaga() {
  yield fork(checker.handleSendData)
}
