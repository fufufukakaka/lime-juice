import React from "react"
import ReactDOM from "react-dom"
import configureStore from "../store/configureStore"
import App from "../container/App"
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import "../styles/Container.css"

const store = configureStore()

window.React = React;

ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById("root"))
