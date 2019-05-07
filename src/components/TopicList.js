import React, { Component } from 'react'
import { Button, Card, CardTitle, Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getTopics, deleteTopic, createTopic } from '../actions/topicActions';

class TopicList extends Component {
  state = {
    model: false,
    name: '',
    msg: null
  }

  static propTypes = {
    getTopics: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    createTopic: PropTypes.func.isRequired,
    topic: PropTypes.object.isRequired,    
  }

  componentDidMount() {
    this.props.getTopics();
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    const topic = { name };
    this.props.createTopic(topic);
    this.toggle();
  };

  render() {
    const { topics } = this.props.topic;
    const currentUser = this.props.auth.user;
    return (
      <div>
        {(currentUser.roles[0] === 'admin' || currentUser.roles[0] === 'coordinator') && (
          <Button onClick={this.toggle}>Add Topic +</Button>
        )}

        <div className="mt-4 d-flex flex-column">
          {topics && topics.map(topic => (
            <Card key={topic._id} className="mb-4" body>
              <CardTitle><strong>
              <Link to={`/topics/${topic._id}`}>{topic.name}</Link>
              </strong></CardTitle>
            </Card>
          ))}
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create new topic</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  required
                  type='name'
                  name='name'
                  id='name'
                  placeholder='Topic name'
                  className='mb-3'
                  onChange={this.onChange}
                />
                
                <Button color='dark' block>
                  Create Topic
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  topic: state.topic,
  error: state.error,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getTopics, createTopic, deleteTopic }
)(TopicList);
