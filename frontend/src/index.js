import React from "react"
import ReactDOM from "react-dom"
import configureStore from "../store/configureStore"
import App from "../container/App"
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'

// const store = configureStore()

window.React = React;

ReactDOM.render(<Provider>
  <App/>
</Provider>, document.getElementById("root"))
