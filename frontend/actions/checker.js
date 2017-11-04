import { createAction } from "redux-act"
import "babel-polyfill"

export const sendData = createAction("send Data Check")
export const returnResult = createAction("return Check Data Result")
