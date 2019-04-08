import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-center" >GeoCacheth</NavbarBrand>
        
            <Nav navbar>
              <NavItem>
                <NavLink  href="/About us/">About us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/MattSaeeda/geoCachingDapp.git">GitHub</NavLink>
              </NavItem>
            </Nav>
          
        </Navbar>
      </div>
    );
  }
}

export default NavBar;