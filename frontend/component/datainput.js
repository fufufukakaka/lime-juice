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

class DataInput extends React.Component {
  render() {
    return (<Form id="#input">
      <h4>train,test data</h4>
      <Row>
        <Col xs="3">
          <FormGroup>
            <Label for="exampleFile">X_train</Label>
            <Input type="file" name="file" id="X_train"/>
            <FormText color="muted">
              X_train data[csv or pickle(dataframe,list,numpy)]
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="3">
          <FormGroup>
            <Label for="exampleFile">X_test</Label>
            <Input type="file" name="file" id="X_test"/>
            <FormText color="muted">
              X_test data[csv or pickle(dataframe,list,numpy)]
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="3">
          <FormGroup>
            <Label for="exampleFile">y_train</Label>
            <Input type="file" name="file" id="y_train"/>
            <FormText color="muted">
              y_train data[csv or pickle(dataframe,list,numpy)]
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="3">
          <FormGroup>
            <Label for="exampleFile">y_test</Label>
            <Input type="file" name="file" id="y_test"/>
            <FormText color="muted">
              y_test data[csv or pickle(dataframe,list,numpy)]
            </FormText>
          </FormGroup>
        </Col>
      </Row>
      <h4>feature nemas, label and trained model</h4>
      <Row>
        <Col xs="4">
          <FormGroup>
            <Label for="exampleFile">feature_names</Label>
            <Input type="file" name="file" id="feature_names"/>
            <FormText color="muted">
              feature_names[list]
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="4">
          <FormGroup>
            <Label for="exampleFile">target_names</Label>
            <Input type="file" name="file" id="feature_names"/>
            <FormText color="muted">
              target_names[list]
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="4">
          <FormGroup>
            <Label for="exampleFile">Trained Model</Label>
            <Input type="file" name="file" id="Trained Model"/>
            <FormText color="muted">
              Trained Model[pickle(sklearn model) or h5(keras model)]
            </FormText>
          </FormGroup>
        </Col>
      </Row>
      <Button color="success">Submit</Button>
    </Form>)
  }
}

export default DataInput
