import { createAction } from "redux-act"
import "babel-polyfill"

export const startRenderAndTrain = createAction("start render and train data")
export const returnRenderResult = createAction("return render and train result")
export const fetchInitRequest = createAction("fetch Init Request")
export const returnInitRequest = createAction("return Init Request")
