import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Badge } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { getMyPosts, deletePost } from '../actions/postActions';
import Loading from './Loading';

class PostList extends Component {

  static propTypes = {
    getMyPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // const topicId = this.props.match.params.id;
    this.props.getMyPosts();
  }

  goToContribute = () => {
    this.props.history.push('/newpost');
  }

  displayData = () => {
    const { user } = this.props.auth;
    const { posts } = this.props.post;

    if (user.roles[0] === 'manager' || user.roles[0] === 'guest') {
      return (
        <tbody>
          {posts && posts.docs && posts.docs
            .filter(post => post.isPublished === true)
            .map((post, index) => (
            <tr key={post._id}>
              <th scope="row">{index + 1}</th>
              <td><Link to={`/posts/${post._id}`}>{post.title}</Link></td>
              <td>{post.content}</td>
              <td>{moment(post.posted_date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
              <td>{post.isPublished ? <Badge color="primary">publish</Badge> : <Badge color="secondary">private</Badge>}</td>
            </tr>
          ))}
        </tbody>
      )
    } else if (user.roles[0] === 'student' || user.roles[0] === 'coordinator') {
      return (
        <tbody>
          {posts && posts.docs && posts.docs
            .filter(post => post.isPublished === false)
            .map((post, index) => (
            <tr key={post._id}>
              <th scope="row">{index + 1}</th>
              <td><Link to={`/posts/${post._id}`}>{post.title}</Link></td>
              <td>{post.content}</td>
              <td>{moment(post.posted_date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
              <td>{post.isPublished ? <Badge color="primary">publish</Badge> : <Badge color="secondary">private</Badge>}</td>
            </tr>
          ))}
        </tbody>
      )
    }
  }

  onDeleteClick = id => {
    this.props.deletePost(id);
  };

  render() {
    const { loading } = this.props.post;
    const { user } = this.props.auth;

    if (loading) return <Loading />

    return (
      <>
        <Table borderless>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Content</th>
              <th>Date Created</th>
              <th>Status</th>
            </tr>
          </thead>
          {this.displayData()}
        </Table>
        {user.roles[0] === 'student' && (
          <Button onClick={this.goToContribute}>Contribute +</Button>
        )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getMyPosts, deletePost }
)(PostList);