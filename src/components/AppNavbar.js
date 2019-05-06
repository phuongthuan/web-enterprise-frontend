import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Badge
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from './auth/LoginForm';
import Logout from './auth/Logout';
import history from '../history';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  goHome = () => {
    history.push('/');
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `${user.email}` : ''}</strong>
          </span>
          {user && <Badge color="secondary">{user.roles[0]}</Badge>}
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <>
        <NavItem>
          <LoginForm />
        </NavItem>
      </>
    );

    return (
      <Navbar color='dark' dark expand='sm' className='mb-5'>
        <Container>
          <NavbarBrand onClick={this.goHome} style={{ color: '#ddd', cursor: 'pointer' }}>GREENWICH PORTAL</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
            
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);