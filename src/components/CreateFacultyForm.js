import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { getUsers } from '../actions/userActions';
import { createFaculty } from '../actions/facultyActions';
import Loading from './Loading';

class CreateFacultyForm extends Component {
  state = {
    name: '',
    managerId: '',
    msg: null,
  }

  static propTypes = {
    error: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.getUsers();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const newFac = {
      name: this.state.name,
      managerId: this.state.managerId
    };

    this.props.createFaculty(newFac);
  }

  render() {
    const { users, loading } = this.props.user;

    if (loading) return <Loading />

    const coordinators = users && users.filter(user => user.roles[0] === 'coordinator');

    return (
      <div>
        <Form className="mb-4" onSubmit={this.onSubmit}>

            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}

          <FormGroup>
            <Label>Faculty Name</Label>
            <Input onChange={this.onChange} name="name" required />
          </FormGroup>

          <FormGroup>
            <Label for="userSelect">Manager</Label>
            <Input onChange={this.onChange} type="select" name="managerId" value={this.state.managerId}>
              <option>Select Manager...</option>
              {coordinators.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
            </Input>
          </FormGroup>

          <Button size="sm" className="mt-3">Create Faculty</Button>

        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.error,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { createFaculty, getUsers }
)(CreateFacultyForm);