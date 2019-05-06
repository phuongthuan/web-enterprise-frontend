import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import FacultyList from '../components/FacultyList';
import CreateUserForm from '../components/CreateUserForm';
import CreateFacultyForm from '../components/CreateFacultyForm';

class AdminPage extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={FacultyList} />
        <Route path="/newuser" component={CreateUserForm} />
        <Route path="/newfaculty" component={CreateFacultyForm} />
      </Switch>
    )
  }
}

export default AdminPage;
