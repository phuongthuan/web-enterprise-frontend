import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import TopicList from '../components/TopicList';
import SingleTopic from '../components/SingleTopic';

class CoordinatorPage extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={TopicList} />
        <Route path="/topics/:id" component={SingleTopic} />
      </Switch>
    )
  }
}

export default CoordinatorPage;
