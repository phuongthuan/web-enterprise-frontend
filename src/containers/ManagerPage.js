import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import PostList from '../components/PostList';
import SinglePost from '../components/SinglePost';
import FlashMessagesList from '../components/FlashMessagesList';
import AppNavbar from '../components/AppNavbar';

class ManagerPage extends Component {
  render() {
    return (
      <>
        <AppNavbar />
        <div className="container">
          <FlashMessagesList />
          <Switch>
            <Route exact path="/" component={PostList} />
            <Route path="/posts/:id" component={SinglePost} />
          </Switch>
        </div>
      </>
    )
  }
}

export default ManagerPage;
