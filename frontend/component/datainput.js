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
      <Row>
        <Col xs="6">
          <FormGroup>
            <Label for="exampleFile">X_train</Label>
            <Input type="file" name="file" id="X_train"/>
            <FormText color="muted">
              X_train data
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="6">
          <FormGroup>
            <Label for="exampleFile">X_test</Label>
            <Input type="file" name="file" id="X_test"/>
            <FormText color="muted">
              X_test data
            </FormText>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          <FormGroup>
            <Label for="exampleFile">y_train</Label>
            <Input type="file" name="file" id="y_train"/>
            <FormText color="muted">
              y_train data
            </FormText>
          </FormGroup>
        </Col>
        <Col xs="6">
          <FormGroup>
            <Label for="exampleFile">y_test</Label>
            <Input type="file" name="file" id="y_test"/>
            <FormText color="muted">
              y_test data
            </FormText>
          </FormGroup>
        </Col>
      </Row>
      <Button color="success">Submit</Button>
    </Form>)
  }
}

export default DataInput
