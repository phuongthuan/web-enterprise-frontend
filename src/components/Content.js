import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import FacultyList from './FacultyList';
import CoordinatorPage from '../containers/CoordinatorPage';
import StudentPage from '../containers/StudentPage';
import ManagerPage from '../containers/ManagerPage';
import GuestPage from '../containers/GuestPage';

class Content extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    if (isAuthenticated && user && user.roles[0] === 'admin') {
      return <FacultyList />
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
