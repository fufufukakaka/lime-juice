import { createAction } from "redux-act"
import "babel-polyfill"

export const sendData = createAction("send Data Check")
export const returnResult = createAction("return Check Data Result")
export const registerData = createAction("register Data")
export const registerResult = createAction("return Register Result")
