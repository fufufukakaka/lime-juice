import React from "react"
import ReactDOM from "react-dom"
import Header from "../component/header"
import TabContainer from "./TabContainer"
import {Container, Row, Col} from 'reactstrap'

class App extends React.Component {
  render() {
    return (<Container>
      <Header/>
      <div className="content">
        <TabContainer/>
      </div>
    </Container>)
  }
}

export default App
