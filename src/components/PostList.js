import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Badge } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { getAllPosts, getMyPosts, deletePost } from '../actions/postActions';
import Loading from './Loading';

class PostList extends Component {

  static propTypes = {
    getMyPosts: PropTypes.func.isRequired,
    getAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { user } = this.props.auth;

    if (user.roles[0] === 'guest' || user.roles[0] === 'manager') {
      this.props.getAllPosts();
    } else if (user.roles[0] === 'student') {
      this.props.getMyPosts();
    }

  }

  goToContribute = () => {
    this.props.history.push('/newpost');
  }

  displayPostContent = (text) => {
    if (text.length > 30) {
      return text.substring(0,30) + '...';
    } else {
      return text;
    }
  }

  displayData = () => {
    const { user } = this.props.auth;
    const { posts } = this.props.post;

    if (user.roles[0] === 'manager' || user.roles[0] === 'guest') {
      return (
        <tbody>
          {posts && posts
            .filter(post => post.isPublished === true)
            .map((post, index) => (
            <tr key={post._id}>
              <th scope="row">{index + 1}</th>
              <td><Link to={`/posts/${post._id}`}>{post.title}</Link></td>
              <td>{this.displayPostContent(post.content)}</td>
              <td>{post._topic && post._topic.topicName && post._topic.topicName.name}</td>
              <td>{post._user.name}</td>
              <td>{moment(post.posted_date).format("dddd, MMMM Do YYYY")}</td>
            </tr>
          ))}
        </tbody>
      )
    } else if (user.roles[0] === 'coordinator') {
      return (
        <tbody>
          {posts && posts
            .filter(post => post.isPublished === false)
            .map((post, index) => (
            <tr key={post._id}>
              <th scope="row">{index + 1}</th>
              <td><Link to={`/posts/${post._id}`}>{post.title}</Link></td>
              <td>{this.displayPostContent(post.content)}</td>
              <td>{moment(post.posted_date).format("dddd, MMMM Do YYYY")}</td>
              <td>{post.isPublished ? <Badge color="primary">publish</Badge> : <Badge color="secondary">private</Badge>}</td>
            </tr>
          ))}
        </tbody>
      )
    } else if (user.roles[0] === 'student') {
      return (
        <tbody>
          {posts && posts
            .filter(post => post.isPublished === false)
            .map((post, index) => (
            <tr key={post._id}>
              <th scope="row">{index + 1}</th>
              <td>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
                <br />
                <Link to={`/posts/edit/${post._id}`}><small>Edit</small></Link>
              </td>
              <td>{this.displayPostContent(post.content)}</td>
              <td>{post._topic.name}</td>
              <td>{moment(post.posted_date).format("dddd, MMMM Do YYYY")}</td>
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
              {(user.roles[0] === 'student' || user.roles[0] === 'manager' || user.roles[0] === 'guest') && (
                <th>Topic</th>
              )}
              {(user.roles[0] === 'manager' || user.roles[0] === 'guest' || user.roles[0] === 'coordinator') && (
                <th>Student</th>
              )}
              <th>Date Created</th>
              {(user.roles[0] === 'coordinator') && (
                <th>Status</th>
              )}
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
  { getAllPosts, getMyPosts, deletePost }
)(PostList);