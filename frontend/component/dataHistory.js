import {Row, Col} from 'reactstrap'
import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'
import {registerData, retrieveRequest} from "../actions/checker"

class DataHistory extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false,
      registerName: "",
      name: "No Datasets Selected"
    }
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  renderSelectedData(e, target) {
    this.setState({name: target})
  }
  renderDropDown() {
    const list = []
    const targets = this.props.savedDatasets
    let t = ""
    for (let i in targets) {
      t = <DropdownItem key={i} onClick={(e) => {
          this.renderSelectedData(e, targets[i])
        }}>{targets[i]}</DropdownItem>
      list.push(t)
    }
    return (<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle caret="caret" color="success">
        Saved Datasets
      </DropdownToggle>
      <DropdownMenu>
        {list}
      </DropdownMenu>
    </Dropdown>)
  }
  setDataName(e) {
    e.preventDefault()
    this.setState({registerName: e.target.value})
  }
  registerData(e) {
    e.preventDefault()
    this.props.dispatch(registerData({"registerName": this.state.registerName}))
  }
  retrieveData(e) {
    e.preventDefault()
    this.props.dispatch(retrieveRequest({"retrieveName": this.state.name}))
  }
  render() {
    return (<div className="section">
      <Row>
        <Col xs="12">
          {this.renderDropDown()}
        </Col>
      </Row>
      <p>{this.state.name}</p>
      <Button color="info" onClick={(e) => {
          this.retrieveData(e)
        }}>Retrieve This Dataset</Button>
      {
        this.props.alldatachecked
          ? <div>
              <FormGroup>
                <Label>Dataset Name</Label>
                <Input name="dataname" id="dataname" placeholder="awesome dataset" onChange={(e) => {
                    this.setDataName(e)
                  }}/>
              </FormGroup>
              <Button color="info" onClick={(e) => {
                  this.registerData(e)
                }}>Register This Datasets</Button>
            </div>
          : null
      }
    </div>)
  }
}

function select({checker}) {
  return {checker}
}

DataHistory.PropTypes = {
  alldatachecked: PropTypes.bool,
  savedDatasets: PropTypes.array,
  checker: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(select)(DataHistory)
