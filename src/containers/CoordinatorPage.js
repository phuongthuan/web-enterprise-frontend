import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import TopicList from '../components/TopicList';
import SingleTopic from '../components/SingleTopic';
import SinglePost from '../components/SinglePost';
import AppNavbar from '../components/AppNavbar';
import FlashMessagesList from '../components/FlashMessagesList';

class CoordinatorPage extends Component {
  render() {
    return (
      <>
        <AppNavbar />
        <div className="container">
          <FlashMessagesList />
          <Switch>
            <Route exact path="/" component={TopicList} />
            <Route path="/topics/:id" component={SingleTopic} />
            <Route path="/posts/:id" component={SinglePost} />
          </Switch>
        </div>
      </>
    )
  }
}

export default CoordinatorPage;
