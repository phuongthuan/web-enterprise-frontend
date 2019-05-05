import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';

import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';
import SinglePost from '../components/SinglePost';

class StudentPage extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route path="/posts/:id" component={SinglePost} />
        <Route path="/newpost" component={CreatePostForm} />
      </Switch>
    )
  }
}

export default StudentPage;
