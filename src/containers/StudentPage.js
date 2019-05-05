import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';

import SingleTopic from '../components/SingleTopic';
import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';

class StudentPage extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route path="/posts/:id" component={SingleTopic} />
        <Route path="/newpost" component={CreatePostForm} />
      </Switch>
    )
  }
}

export default StudentPage;
