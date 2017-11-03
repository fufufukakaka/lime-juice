import React from "react"
import ReactDOM from "react-dom"
import Datatable from "../component/datatable"
import Header from "../component/header"
import DataInput from "../component/datainput"
import TabContainer from "./TabContainer"
import {Container, Row, Col} from 'reactstrap'

class App extends React.Component {
  render() {
    return (<Container>
      <Header/>
      <div className="content">
        <TabContainer/>
        <Row className="section">
          <Col>
            <h3>
              Data Table
            </h3>
            <Datatable/>
          </Col>
        </Row>
      </div>
    </Container>)
  }
}

export default App
