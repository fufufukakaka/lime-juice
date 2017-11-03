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
      <Navbar id="header" color="faded" light="light" expand="md">
        <NavbarBrand href="#header">Lime-Juice</NavbarBrand>
        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar="navbar">
          <Nav className="ml-auto" navbar="navbar">
            <NavItem>
              <NavLink href="#input">Input</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#explanation">Explanation</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#datatable">DataTable</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>)
  }
}

export default Header
