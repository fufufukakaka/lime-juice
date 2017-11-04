import React, {Component} from 'react'
import PropTypes from "prop-types"
import {Button, FormGroup} from 'reactstrap'

class FileInputForm extends Component {
  render() {
    const {fields: {
        avatar
      }, handleSubmit, resetForm, submitting} = this.props
    return (<FormGroup>
      <Button className="input-file-btn" color="success" outline="outline">
        {listnames[i]}
        <input type="file" className="input-file"/>
      </Button>
      <span>File is not chosen</span>
      <FormText color="muted">
        {descs[i]}
      </FormText>
    </FormGroup>)
  }
}

FileInputForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default FileInputForm
