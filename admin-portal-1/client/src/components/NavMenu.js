import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
      var usertf = false;


      var log = (<NavItem>
          <NavLink tag={Link} className="text-dark" to="/login" >Login</NavLink>
      </NavItem>);


      var examiners = (<NavItem>
          <NavLink tag={Link} className="text-dark" to="/examiners">Examiners</NavLink>
      </NavItem>
          );

      var teams = (<NavItem>
          <NavLink tag={Link} className="text-dark" to="/project-teams">Project Teams</NavLink>
      </NavItem>);

      var profile = (<NavItem>
          <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
      </NavItem>);

      if (this.props.user !== null) {
          usertf = true;
          log = (<NavItem>
              <NavLink tag={Link} className="text-dark" to="/login" onClick={() => this.props.setUser(null)}>Logout</NavLink>
          </NavItem>);
      }
    
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Admin Portal</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                { usertf === false ? true : profile }          
                { usertf === false ? true : examiners }
                { usertf === false ? true : teams }
                { log }
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
