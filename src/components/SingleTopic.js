import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts } from '../actions/postActions';

class SingleTopic extends Component {
  static propTypes = {
    getPosts: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,    
  }

  componentDidMount() {
    const topicId = this.props.match.params.id;
    this.props.getPosts(topicId);
  }
  
  render() {
    return (
      <div>
        Single Topic
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post,
  error: state.error,
});

export default connect(
  mapStateToProps,
  { getPosts }
)(SingleTopic);
