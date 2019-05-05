import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

import { createPost } from '../actions/postActions';
import { getTopics } from '../actions/topicActions';
import Loading from './Loading';

class CreatePostForm extends Component {
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
  }

  componentDidMount() {
    this.props.getTopics();
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

    const newPost = {
      topicId, 
      title, 
      content, 
      fileUrl: fileUrl || null
    };

    this.props.createPost(newPost);
    this.props.history.push('/');
  }
  
  render() {
    const { topicId } = this.state;
    const { topics } = this.props.topic;

    return (
      <div>
        <Form className="mb-4" onSubmit={this.onSubmit}>

          <FormGroup>
            <Label>Title</Label>
            <Input onChange={this.onChange} name="title" required />
          </FormGroup>

          <FormGroup>
            <Label>Image</Label>
            <Input onChange={this.uploadFile} type="file" name="fileUrl" />
          </FormGroup>

          {this.showImage()}

          <FormGroup>
            <Label>Content</Label>
            <Input onChange={this.onChange} rows="4" type="textarea" name="content" required />
          </FormGroup>

          <FormGroup>
            <Label for="topicSelect">Select</Label>
            <Input onChange={this.onChange} type="select" name="topicId" value={topicId}>
              <option>Select Topic...</option>
              {topics.map(topic => <option value={topic._id} key={topic._id}>{topic.name}</option>)}
            </Input>
          </FormGroup>

          <Button className="mt-3">Create</Button>

        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  topic: state.topic,
});

export default connect(
  mapStateToProps,
  { getTopics, createPost }
)(CreatePostForm);