import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { createUser } from '../actions/userActions';

class CreateUserForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
    roles: '',
    msg: null,
  }

  static propTypes = {
    error: PropTypes.object.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'ADD_USER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      ...this.state,
      roles: [this.state.roles]
    };

    delete newUser.msg;

    this.props.createUser(newUser);
  }

  render() {
    return (
      <div>
        <Form className="mb-4" onSubmit={this.onSubmit}>

            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}

          <FormGroup>
            <Label>Name</Label>
            <Input onChange={this.onChange} name="name" required />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input onChange={this.onChange} type="email" name="email" required />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input onChange={this.onChange} type="password" name="password" required/>
          </FormGroup>

          <FormGroup>
            <Label>Address</Label>
            <Input onChange={this.onChange} type="text" name="address" />
          </FormGroup>

          <FormGroup>
            <Label>Phone Number</Label>
            <Input onChange={this.onChange} type="number" name="phone_number" required />
          </FormGroup>

          <FormGroup>
            <Label for="roleSelect">Role</Label>
            <Input onChange={this.onChange} type="select" name="roles" value={this.state.roles}>
              <option>Select Role...</option>
              <option value="student">Student</option>
              <option value="manager">Marketing Manager</option>
              <option value="guest">Guest</option>
              <option value="coordinator">Marketing Coordinator</option>
              <option value="admin">Administrator</option>
            </Input>
          </FormGroup>

          <Button size="sm" className="mt-3">Create User</Button>

        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(
  mapStateToProps,
  { createUser }
)(CreateUserForm);