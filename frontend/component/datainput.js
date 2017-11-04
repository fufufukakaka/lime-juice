import React from "react"
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  ListGroup,
  ListGroupItem
} from 'reactstrap'
import {Row, Col} from 'reactstrap'
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {sendData, returnData} from "../actions/checker"
import FileInputForm from "./fileupload"
import {Field} from 'redux-form'
import "../styles/fileupload.css"
import {List} from 'immutable'

class DataInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filename: List([
        "File is not chosen",
        "File is not chosen",
        "File is not chosen",
        "File is not chosen",
        "File is not chosen",
        "File is not chosen",
        "File is not chosen"
      ]),
      files: {}
    }
  }
  checkData(e, target, selectFile : File) {
    e.preventDefault()
    this.setState({
      filename: this.state.filename.set(target, selectFile[0].name)
    })
    let formData = new FormData()
    formData.append("data", selectFile[0])
    this.props.dispatch(sendData({number: target, data: formData}))
  }
  renderFileInput() {
    const list = []
    const listnames = [
      "X_train",
      "X_test",
      "y_train",
      "y_test",
      "Feature Names",
      "Label Names",
      "Trained Model"
    ]
    const descs = [
      "X_train data[csv or pickle(dataframe,list,numpy)]",
      "X_test data[csv or pickle(dataframe,list,numpy)]",
      "y_train data[csv or pickle(dataframe,list,numpy)]",
      "y_test data[csv or pickle(dataframe,list,numpy)]",
      "feature_names[list]",
      "target_names[list]",
      "Trained Model[pickle(sklearn model) or h5(keras model)]"
    ]
    let t = ""
    for (let i in listnames) {
      t = <ListGroupItem key={i}>
        <FormGroup>
          <Button className="input-file-btn" color="success" outline="outline">
            {listnames[i]}
            <input type="file" className="input-file" onChange={(e) => {
                this.checkData(e, i, e.target.files)
              }}/>
          </Button>
          <span>{this.state.filename.get(i)}</span>
          <FormText color="muted">
            {descs[i]}
          </FormText>
        </FormGroup>
      </ListGroupItem>
      list.push(t)
    }
    return list
  }
  render() {
    return (<Form id="#input">
      {this.renderFileInput()}
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
