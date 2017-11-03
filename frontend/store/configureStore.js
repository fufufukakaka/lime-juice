import { createStore, applyMiddleware, combineReducers } from "redux"
import createSagaMiddleware from "redux-saga"
import logger from 'redux-logger'
import rootSaga from "../sagas"
// import juicemixer from "../reducers/juicemixer"
import checker from "../reducers/checker"

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    combineReducers({
      checker
    }),
    initialState,
    applyMiddleware(
      sagaMiddleware, logger
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
}
