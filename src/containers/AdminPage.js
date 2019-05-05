import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import FacultyList from '../components/FacultyList';


class AdminPage extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={FacultyList} />
        {/* <Route path="/users/:id" component={Users} /> */}
      </Switch>
    )
  }
}

export default AdminPage;
