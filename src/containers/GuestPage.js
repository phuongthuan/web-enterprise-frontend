import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import PostList from '../components/PostList';
import SinglePost from '../components/SinglePost';
import AppNavbar from '../components/AppNavbar';
import FlashMessagesList from '../components/FlashMessagesList';

class GuestPage extends Component {
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

export default GuestPage;
