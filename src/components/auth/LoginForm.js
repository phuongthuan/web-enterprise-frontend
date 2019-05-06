import React, { Component } from 'react';
import {
  Button,
  Toast,
  ToastBody,
  Form,
  FormGroup,
  Spinner,
  Input,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    this.props.login(user);
  };

  render() {
    const { loading } = this.props;
    return (
      <div className="p-3 my-2">
        <Toast style={{ width: '400px' }}>
          <ToastBody>
              <h5 className="d-flex justify-content-center mb-3">Login</h5>
              <Form onSubmit={this.onSubmit}>
              {this.state.msg ? (
                <Alert color='danger'>{this.state.msg}</Alert>
              ) : null}
              <FormGroup>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='mb-3'
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='mb-3'
                  onChange={this.onChange}
                />
              </FormGroup>

              <Button color='dark' block>{loading
                ? <Spinner size="sm" color="secondary" /> 
                : 'Login'}</Button>

            </Form>
          </ToastBody>
        </Toast>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.isLoading,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginForm);