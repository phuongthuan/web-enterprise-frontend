import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CardImg, CardBody, CardTitle, CardText, Card, Button, ToastBody, Form, FormGroup, Label, Input, Toast, ToastHeader } from 'reactstrap'
import axios from 'axios';

import { getPost, publishPost } from '../actions/postActions';
import { getComments, addComment, clearCommentList } from '../actions/commentActions';
import Loading from './Loading';

class SinglePost extends Component {

  state = {
    content: '',
  }

  static propTypes = {
    getPost: PropTypes.func.isRequired,
    publishPost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.getPost(postId);
    this.props.getComments(postId);
  }

  componentWillUnmount() {
    console.log('leave')
    this.props.clearCommentList();
  }
  

  onSubmit = e => {
    e.preventDefault();
    const postId = this.props.match.params.id;
    this.props.addComment(postId, this.state);
    this.setState({ content: '' });
  }

  downloadFile = () => {
    const { post } = this.props.post;

    axios({
      url: post.fileUrl, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'file.zip'); //or any other extension
       document.body.appendChild(link);
       link.click();
       link.remove();
    });

  }

  publishPost = () => {
    const postId = this.props.match.params.id;
    this.props.publishPost(postId);
  }
  
  render() {
    const { post } = this.props.post;
    const { comments } = this.props.comment;
    const { user } = this.props.auth;

    const commentLoading = this.props.comment.loading;
    const postLoading = this.props.post.loading;

    if (postLoading && commentLoading) return <Loading />

    return (
      <Card className="mb-5">
        <CardImg src={post.fileUrl} style={{ width: '60%', margin: '0 auto', paddingTop: '15px', }} />
        <CardBody>
          <CardTitle>{post.title}</CardTitle>
          <CardText>{post.content}</CardText>
          <hr />

          {user.roles[0] === 'manager' && (<Button size="sm" onClick={this.downloadFile}>Download</Button>)}
          
          {user.roles[0] === 'coordinator' && (<Button color="info" size="sm" onClick={this.publishPost}>Approve</Button>)}

          {comments && comments.map(comment => (
            <div key={comment._id}>
              <Toast style={{ maxWidth: '100%', marginBottom: '20px' }}>
                <ToastHeader>
                  <span>{comment._user.email} ({comment._user.roles[0]})</span>
                </ToastHeader>
                <ToastBody>
                  {comment.content}
                  <small className="d-block">{moment(comment.posted_date).fromNow()}</small>
                </ToastBody>
              </Toast>
            </div>
          ))}

          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label>Comment</Label>
              <Input 
                onChange={e => this.setState({ content: e.target.value })} 
                value={this.state.content} 
                rows="6" 
                type="textarea" 
                name="content" />
            </FormGroup>
            <Button disabled={this.state.content === ''} size="sm" color="primary">Leave comment</Button>
          </Form>

        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post,
  comment: state.comment,
  error: state.error,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getPost, getComments, publishPost, addComment, clearCommentList }
)(SinglePost);
