import {Row, Col} from 'reactstrap'
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {Button, ListGroup, ListGroupItem} from 'reactstrap'
import {Form, FormGroup, Input, Label} from 'reactstrap'
import React from "react"
import "../styles/checkresult.css"
import {fetchInitRequest} from "../actions/checker"
import {startRenderAndTrain} from "../actions/juicemixer"
import DataHistory from "./dataHistory"

class CheckResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      onehotencoding: false
    };
  }
  componentWillMount() {
    this.Initialization(this.props)
  }
  Initialization(props) {
    this.props.dispatch(fetchInitRequest())
  }
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
      ? <div>
        <FormGroup check="check">
          <Label check="check">
            <Input type="checkbox" onChange={(e) => {
                this.setOneHot(e, e.target.value)
              }}/>{' '}
            Data Should be OnehotEncoding?
          </Label>
        </FormGroup>
        <Button color="success" className="renderbutton" onClick={(e) => {
            this.submitCall(e)
          }}>Render Table and Set LIME</Button><DataHistory alldatachecked={res} savedDatasets={this.props.checker.savedDatasets}/></div>
      : <div>
        <Button color="info" className="renderbutton">Please input necessary datas</Button><DataHistory alldatachecked={res} savedDatasets={this.props.checker.savedDatasets}/></div>)
  }
  setOneHot(e, value) {
    this.setState({
      onehotencoding: !this.state.onehotencoding
    })
  }
  submitCall(e) {
    e.preventDefault()
    this.props.dispatch(startRenderAndTrain({onehot: this.state.onehotencoding}))
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
