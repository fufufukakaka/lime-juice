import React from "react"
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap'
import {Row, Col} from 'reactstrap'
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {sendData, returnData} from "../actions/checker"

class DataInput extends React.Component {
  checkData(e, target) {
    e.preventDefault()
    console.log(target)
    this.props.dispatch(sendData({number: target}))
  }
  render() {
    return (<Form id="#input">
      <h4>train,test data</h4>
      <Row>
        <Col xs="3">
          <FormGroup>
            <Label for="exampleFile">X_train</Label>
            <Input type="file" name="file" id="X_train" onChange={(e) => {
                this.checkData(e, 0)
              }}/>
            <FormText color="muted">
              X_train data[csv or pickle(dataframe,list,numpy)]
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="3">
          <FormGroup>
            <Label for="exampleFile">X_test</Label>
            <Input type="file" name="file" id="X_test" onChange={(e) => {
                this.checkData(e, 1)
              }}/>
            <FormText color="muted">
              X_test data[csv or pickle(dataframe,list,numpy)]
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="3">
          <FormGroup>
            <Label for="exampleFile">y_train</Label>
            <Input type="file" name="file" id="y_train" onChange={(e) => {
                this.checkData(e, 2)
              }}/>
            <FormText color="muted">
              y_train data[csv or pickle(dataframe,list,numpy)]
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="3">
          <FormGroup>
            <Label for="exampleFile">y_test</Label>
            <Input type="file" name="file" id="y_test" onChange={(e) => {
                this.checkData(e, 3)
              }}/>
            <FormText color="muted">
              y_test data[csv or pickle(dataframe,list,numpy)]
            </FormText>
          </FormGroup>
        </Col>
      </Row>
      <h4>feature names, label and trained model</h4>
      <Row>
        <Col xs="4">
          <FormGroup>
            <Label for="exampleFile">feature_names</Label>
            <Input type="file" name="file" id="feature_names" onChange={(e) => {
                this.checkData(e, 4)
              }}/>
            <FormText color="muted">
              feature_names[list]
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="4">
          <FormGroup>
            <Label for="exampleFile">target_names</Label>
            <Input type="file" name="file" id="feature_names" onChange={(e) => {
                this.checkData(e, 5)
              }}/>
            <FormText color="muted">
              target_names[list]
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="4">
          <FormGroup>
            <Label for="exampleFile">Trained Model</Label>
            <Input type="file" name="file" id="Trained Model" onChange={(e) => {
                this.checkData(e, 6)
              }}/>
            <FormText color="muted">
              Trained Model[pickle(sklearn model) or h5(keras model)]
            </FormText>
          </FormGroup>
        </Col>
      </Row>
    </Form>)
  }
}

function select({checker}) {
  return {checker}
}

DataInput.PropTypes = {
  checker: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(select)(DataInput)
