import {Row, Col} from 'reactstrap'
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {Button, ListGroup, ListGroupItem} from 'reactstrap'
import React from "react"
import "../styles/checkresult.css"
import {startRenderAndTrain} from "../actions/juicemixer"

class CheckResult extends React.Component {
  renderStatus(checked, ok, comment, sending) {
    return (
      sending
      ? <i className="fa fa-spinner fa-spin fa-fw"></i>
      : checked
        ? ok
          ? <div className="statusMessage">
            <i className="fa fa-fw fa-check"></i>
            Check Passed</div>
          : <div className="statusMessage">
            <i className="fa fa-fw fa-exclamation-circle"></i>
            {comment}</div>
        : <div className="statusMessage">Not yet check. Please input this data files.</div>)
  }
  renderList() {
    const list = []
    const listnames = [
      "X_train",
      "X_test",
      "y_test",
      "Categorical Features",
      "Categorical Names",
      "Feature Names",
      "Label Names",
      "Trained Model"
    ]
    let t = ""
    for (let i in listnames) {
      t = <ListGroupItem key={i}>
        <div className="status">
          <div className="dataName">{listnames[i]}</div>{this.renderStatus(this.props.checker.checkArray.get(i), this.props.checker.okArray.get(i), this.props.checker.commentArray.get(i), this.props.checker.sendArray.get(i))}
        </div>
      </ListGroupItem>
      list.push(t)
    }
    return list
  }
  renderSubmitButton() {
    let res = true
    const okarray = this.props.checker.okArray.toJS()
    for (let i in okarray) {
      if (!okarray[i]) {
        res = false
      }
    }
    return (
      res
      ? <Button color="success" className="renderbutton" onClick={(e) => {
          this.submitCall(e)
        }}>Render Table and Set LIME</Button>
      : <Button color="info" className="renderbutton">Please input necessary datas</Button>)
  }
  submitCall(e) {
    e.preventDefault()
    this.props.dispatch(startRenderAndTrain())
  }
  render() {
    return (<div className="section">
      <Row>
        <Col xs="12">
          {this.renderList()}
        </Col>
      </Row>
      {this.renderSubmitButton()}
    </div>)
  }
}

function select({checker}) {
  return {checker}
}

CheckResult.PropTypes = {
  checker: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(select)(CheckResult)
