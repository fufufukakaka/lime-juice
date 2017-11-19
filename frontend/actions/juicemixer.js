import { createAction } from "redux-act"
import "babel-polyfill"

export const startRenderAndTrain = createAction("start render and train data")
export const returnRenderResult = createAction("return render and train result")
export const requestRenderExplanation = createAction("request render explanation")
export const returnRenderExplanation = createAction("return render explanation")
