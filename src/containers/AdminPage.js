import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import FacultyList from '../components/FacultyList';
import CreateUserForm from '../components/CreateUserForm';
import CreateFacultyForm from '../components/CreateFacultyForm';
import AppNavbar from '../components/AppNavbar';
import FlashMessagesList from '../components/FlashMessagesList';
import UserList from '../components/UserList';

class AdminPage extends Component {
  render() {
    return (
      <>
        <AppNavbar />
        <div className="container">
          <FlashMessagesList />
          <Switch>
            <Route exact path="/" component={FacultyList} />
            <Route path="/users" component={UserList} />
            <Route path="/newuser" component={CreateUserForm} />
            <Route path="/newfaculty" component={CreateFacultyForm} />
          </Switch>
        </div>
      </>
    )
  }
}

export default AdminPage;
