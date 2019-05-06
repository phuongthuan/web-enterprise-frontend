import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import CoordinatorPage from '../containers/CoordinatorPage';
import StudentPage from '../containers/StudentPage';
import ManagerPage from '../containers/ManagerPage';
import GuestPage from '../containers/GuestPage';
import AdminPage from '../containers/AdminPage';
import LoginPage from '../containers/LoginPage';

class Content extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    if (!isAuthenticated) return <LoginPage />

    if (isAuthenticated && user && user.roles[0] === 'admin') {
      return <AdminPage />
    }

    if (isAuthenticated && user && user.roles[0] === 'coordinator') {
      return <CoordinatorPage />
    }

    if (isAuthenticated && user && user.roles[0] === 'student') {
      return <StudentPage />
    }

    if (isAuthenticated && user && user.roles[0] === 'manager') {
      return <ManagerPage />
    }

    if (isAuthenticated && user && user.roles[0] === 'guest') {
      return <GuestPage />
    }

    return <div />
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Content);
