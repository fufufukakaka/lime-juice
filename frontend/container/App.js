import React from "react"
import ReactDOM from "react-dom"
import Datatable from "../component/datatable"
import Header from "../component/header"
import {Container, Row, Col} from 'reactstrap'

class App extends React.Component {
  render() {
    return (<Container>
      <Col>
        <Header/>
      </Col>
      <Col>
        <Datatable/>
      </Col>
    </Container>)
  }
}

export default App
