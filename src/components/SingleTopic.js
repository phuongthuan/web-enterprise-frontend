import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { getPosts } from '../actions/postActions';
import Loading from './Loading';

class SingleTopic extends Component {
  static propTypes = {
    getPosts: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,    
    post: PropTypes.object.isRequired,    
  }

  componentDidMount() {
    const topicId = this.props.match.params.id;
    this.props.getPosts(topicId);
  }

  displayData = () => {
    const { user } = this.props.auth;
    const { posts } = this.props.post;

    if (user.roles[0] === 'coordinator') {
      return (
        <tbody>
          {posts
            .filter(post => post.isPublished === false)
            .map((post, index) => (
            <tr key={post._id}>
              <th scope="row">{index + 1}</th>
              <td><Link to={`/posts/${post._id}`}>{post.title}</Link></td>
              <td>{post.content}</td>
              <td>{post._user.name}</td>
              <td>{moment(post.posted_date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
              <td>{post.isPublished ? <Badge color="primary">publish</Badge> : <Badge color="secondary">private</Badge>}</td>
            </tr>
          ))}
        </tbody>
      )
    }
  }
  
  render() {
    const { loading } = this.props.post;
    
    if (loading) return <Loading />

    return (
      <>
        <Table borderless>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Content</th>
              <th>Student</th>
              <th>Date Created</th>
              <th>Status</th>
            </tr>
          </thead>
          {this.displayData()}
        </Table>
      </>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post,
  error: state.error,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getPosts }
)(SingleTopic);
