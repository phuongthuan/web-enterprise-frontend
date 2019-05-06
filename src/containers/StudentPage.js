import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';

import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';
import SinglePost from '../components/SinglePost';
import AppNavbar from '../components/AppNavbar';
import FlashMessagesList from '../components/FlashMessagesList';
import UpdatePostForm from '../components/UpdatePostForm';

class StudentPage extends Component {
  render() {
    return (
      <>
        <AppNavbar />
        <div className="container">
          <FlashMessagesList />
          <Switch>
            <Route exact path="/" component={PostList} />
            <Route path="/newpost" component={CreatePostForm} />
            <Route exact path="/posts/:id" component={SinglePost} />
            <Route exact path="/posts/edit/:id" component={UpdatePostForm} />
          </Switch>
        </div>
      </>
    )
  }
}

export default StudentPage;
