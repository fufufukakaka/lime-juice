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
  render() {
    return (<div>
      <Nav tabs="tabs">
        <NavItem>
          <NavLink className={classnames({
              active: this.state.activeTab === '1'
            })} onClick={() => {
              this.toggle('1');
            }}>
            DataInput
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={classnames({
              active: this.state.activeTab === '2'
            })} onClick={() => {
              this.toggle('2');
            }}>
            Explanation
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
          <Row className="section">
            <Col>
              <h3>
                Input Data
              </h3>
              <DataInput/>
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
        </TabPane>
      </TabContent>
    </div>)
  }
}

export default TabContainer
