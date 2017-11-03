import {Row, Col} from 'reactstrap'
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {Button, ListGroup, ListGroupItem} from 'reactstrap'
import React from "react"
import "../styles/checkresult.css"

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
        : <div className="statusMessage">Not yet check. Please input each data files.</div>)
  }
  renderList() {
    const list = []
    const listnames = [
      "X_train",
      "X_test",
      "y_train",
      "y_test",
      "Feature Names",
      "Label Names",
      "Model"
    ]
    let t = ""
    for (let i in listnames) {
      t = <ListGroupItem key={i}>
        <div className="status">
          <div className="dataName">{listnames[i]}</div>{this.renderStatus(this.props.checker.checkArray.get(i), this.props.checker.okArray.get(i), this.props.checker.commentArray.get(i), this.props.checker.isSending)}
        </div>
      </ListGroupItem>
      list.push(t)
    }
    return list
  }
  render() {
    return (<div className="section">
      <Row>
        <Col xs="12">
          {this.renderList()}
        </Col>
      </Row>
      <Button color="success" className="renderbutton">Render Table and Set LIME</Button>
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
