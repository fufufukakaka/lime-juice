import React from 'react'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap'
import classnames from 'classnames'
import DataInput from "../component/datainput"
import CheckResult from "../component/checkresult"
import Datatable from "../component/datatable"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {makeData} from "../modules/utils"

class TabContainer extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      activeTab: '1'
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab})
    }
  }
  renderTable(juicemixer) {
    return (
      juicemixer.isComplete
      ? <Datatable data={juicemixer.tableData} featureNames={juicemixer.featureNames} accessor={juicemixer.accessor}/>
      : <p>Please input your data</p>)
  }
  render() {
    console.log(makeData())
    const juicemixer = this.props.juicemixer
    return (<div>
      <Nav tabs="tabs">
        <NavItem>
          <NavLink className={classnames({
              active: this.state.activeTab === '1'
            })} onClick={() => {
              this.toggle('1');
            }}>
            DataInput&Check
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={classnames({
              active: this.state.activeTab === '2'
            })} onClick={() => {
              this.toggle('2');
            }}>
            Explanation&DataTable
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
          <Row className="section">
            <Col xs="6">
              <h3>
                Input Data
              </h3>
              <DataInput/>
            </Col>
            <Col xs="6">
              <h3>
                Data Check Result
              </h3>
              <CheckResult/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row className="section">
            <Col>
              <h3>
                Explanation
              </h3>
            </Col>
          </Row>
          <Row className="section">
            <Col>
              <h3>
                Data Table
              </h3>
              {this.renderTable(juicemixer)}
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>)
  }
}

function select({juicemixer}) {
  return {juicemixer}
}

DataInput.PropTypes = {
  juicemixer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(select)(TabContainer)
