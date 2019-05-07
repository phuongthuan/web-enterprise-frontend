import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import { Spinner, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

import { updatePost, getPost } from '../actions/postActions';
import { getTopics } from '../actions/topicActions';
import Loading from './Loading';

class UpdatePostForm extends Component {
  state = {
    title: '',
    content: '',
    fileUrl: '',
    topicId: '',
    msg: null,
    isLoadingImage: false,
  }
  static propTypes = {
    topic: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    updatePost: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const { post } = this.props;
    if(!_isEmpty(nextProps.post)) {
      this.setState({
        title: post.title || '',
        content: post.content || '',
        fileUrl: post.fileUrl || '',
        topicId: post._topic || '',
      })
    }
  }
  
  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.getTopics();
    this.props.getPost(postId);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  uploadFile = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    
    this.setState({ isLoadingImage: true })
    
    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BACKEND_DOMAIN}/api/upload-file`,
        data
      })
      .then(res => {
          //handle success
          this.setState({ fileUrl: res.data.fileUrl, isLoadingImage: false })
      })
      .catch(err => {
          //handle error
          console.log(err);
      });
    
  };

  showImage = () => {
    const { fileUrl, isLoadingImage } = this.state;
    if (isLoadingImage) {
      return <Loading />;
    }

    if (fileUrl) {
      return (
        <div>
          <img width="45%" src={fileUrl} alt="contribution" />
        </div>
      );
    }
    return null;
  };


  onSubmit = e => {
    e.preventDefault();

    const { topicId, title, content, fileUrl } = this.state;
    const postId = this.props.match.params.id;

    const newPostUpdate = {
      topicId, 
      title, 
      content, 
      fileUrl: fileUrl || null
    };

    this.props.updatePost(postId, newPostUpdate);
  }
  
  render() {
    const { topicId, content, title } = this.state;
    const { topics } = this.props.topic;
    const { loading } = this.props;

    return (
      <div>
        <Form className="mb-4" onSubmit={this.onSubmit}>

          <FormGroup>
            <Label>Title</Label>
            <Input value={title} onChange={this.onChange} type="text" name="title" required />
          </FormGroup>

          <FormGroup>
            <Input onChange={this.uploadFile} type="file" name="fileUrl" />
          </FormGroup>

          {this.showImage()}

          <FormGroup>
            <Label>Content</Label>
            <Input value={content} onChange={this.onChange} rows="4" type="textarea" name="content" required />
          </FormGroup>

          <FormGroup>
            <Label for="topicSelect">Select</Label>
            <Input onChange={this.onChange} type="select" name="topicId" value={topicId}>
              <option>Select Topic...</option>
              {topics.map(topic => <option value={topic._id} key={topic._id}>{topic.name}</option>)}
            </Input>
          </FormGroup>

          <Button 
            disabled={loading} 
            color='dark'>
          {loading && (<Spinner size="sm" color="secondary" />)}{' '}Update post</Button>

        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  topic: state.topic,
  post: state.post.post,
  loading: state.post.loading,
});

export default connect(
  mapStateToProps,
  { getTopics, updatePost, getPost }
)(UpdatePostForm);