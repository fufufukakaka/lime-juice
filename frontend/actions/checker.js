import { createAction } from "redux-act"
import "babel-polyfill"

export const fetchInitRequest = createAction("fetch Init Request")
export const returnInitRequest = createAction("return Init Request")
export const retrieveRequest = createAction("retrieve Request")
export const returnRetrieveRequest = createAction("return Retrieve Request")
export const sendData = createAction("send Data Check")
export const returnResult = createAction("return Check Data Result")
export const registerData = createAction("register Data")
export const registerResult = createAction("return Register Result")
