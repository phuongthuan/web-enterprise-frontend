import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import TopicList from '../components/TopicList';
import SingleTopic from '../components/SingleTopic';
import SinglePost from '../components/SinglePost';

class CoordinatorPage extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={TopicList} />
        <Route path="/topics/:id" component={SingleTopic} />
        <Route path="/posts/:id" component={SinglePost} />
      </Switch>
    )
  }
}

export default CoordinatorPage;
