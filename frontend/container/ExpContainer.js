import React from "react"
import ReactDOM from "react-dom"
import {Container, Row, Col} from 'reactstrap'
import PlotProb from "../component/PlotProb"
import PlotCof from "../component/PlotCof"
import {connect} from "react-redux"
import PropTypes from "prop-types"

class ExpContainer extends React.Component {
  render() {
    const juicemixer = this.props.juicemixer
    return (<div>
      <p>explain Container</p>
      <Row className="section">
        <Col xs="4">
          <h3>
            Explanation Probability
          </h3>
          {
            juicemixer.isExpComplete
              ? <PlotProb dataArray={juicemixer.expProba}/>
              : null
          }
        </Col>
        <Col xs="8">
          <h3>
            Explanation Result
          </h3>
          {
            juicemixer.isExpComplete
              ? <PlotCof dataArray={juicemixer.cofScores} nameArray={juicemixer.cofNames} colorArray={juicemixer.colorArray}/>
              : null
          }
        </Col>
      </Row>
    </div>)
  }
}

function select({juicemixer}) {
  return {juicemixer}
}

ExpContainer.PropTypes = {
  juicemixer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(select)(ExpContainer)
