import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import PostList from '../components/PostList';
import SinglePost from '../components/SinglePost';

class GuestPage extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route path="/posts/:id" component={SinglePost} />
      </Switch>
    )
  }
}

export default GuestPage;
