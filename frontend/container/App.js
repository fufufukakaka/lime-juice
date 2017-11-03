import React from "react"
import ReactDOM from "react-dom"
import Datatable from "../component/datatable"
import Header from "../component/header"
import DataInput from "../component/datainput"
import {Container, Row, Col} from 'reactstrap'
import "../styles/Container.css"

class App extends React.Component {
  render() {
    return (<Container>
      <Header/>
      <div className="content">
        <Row className="section">
          <Col>
            <DataInput/>
          </Col>
        </Row>
        <Row className="section">
          <Col>
            <Datatable/>
          </Col>
        </Row>
      </div>
    </Container>)
  }
}

export default App
