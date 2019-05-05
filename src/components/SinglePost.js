import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CardImg, CardBody, CardTitle, CardText, Card, Button, ToastBody, Form, FormGroup, Label, Input, Toast, ToastHeader } from 'reactstrap'

import { getPost } from '../actions/postActions';
import { getComments, addComment } from '../actions/commentActions';
import Loading from './Loading';

class SinglePost extends Component {

  state = {
    content: '',
  }

  static propTypes = {
    getPost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.getPost(postId);
    this.props.getComments(postId);
  }

  onSubmit = e => {
    e.preventDefault();
    const postId = this.props.match.params.id;
    this.props.addComment(postId, this.state);
  }
  
  render() {
    const { post } = this.props.post;
    const { comments } = this.props.comment;

    const commentLoading = this.props.comment.loading;
    const postLoading = this.props.post.loading;

    if (postLoading && commentLoading) return <Loading />

    return (
      <Card className="mb-5">
        <CardImg top src={post.fileUrl} style={{ width: '60%'}} />
        <CardBody>
          <CardTitle>{post.title}</CardTitle>
          <CardText>{post.content}</CardText>
          <Button size="sm">Download</Button>

          <hr />

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

          <hr />

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
            <Button size="sm" color="primary">Leave comment</Button>
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
});

export default connect(
  mapStateToProps,
  { getPost, getComments, addComment }
)(SinglePost);
