import React from "react"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import "../styles/header.css"

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (<div>
      <Navbar id="header" color="faded" light="light" expand="md" header="header">
        <NavbarBrand href="#header">
          <i className="fa fa-fw fa-glass" aria-hidden="true"></i>
          Lime-Juice
          <i className="fa fa-fw fa-glass" aria-hidden="true"></i>
        </NavbarBrand>
      </Navbar>
    </div>)
  }
}

export default Header
