import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../actions/userActions';
import {  Modal, ModalFooter, ModalBody, ModalHeader, Button, Table } from 'reactstrap';
import Loading from './Loading';


class UserList extends Component {
  state = {
    modal: false,
    selectedUserId: '',
  }

  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.getUsers();
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  selectUser = (id) => {
    this.toggle();
    this.setState({ selectedUserId: id });
  }

  displayData = () => {
    const { user } = this.props.auth;
    const { users } = this.props;

    if (user.roles[0] === 'admin') {
      return (
        <tbody>
          {users
            .map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>
                {user.name}
                <br />
                  <small 
                    onClick={() => this.selectUser(user._id)} 
                    type="button" 
                    className="btn-link">
                    Delete
                  </small>
              </td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.address}</td>
              <td>{user.roles[0]}</td>
            </tr>
          ))}
        </tbody>
      )
    }
  }

  onDeleteClick = () => {
    this.props.deleteUser(this.state.selectedUserId);
    this.toggle();
  }

  render() {

    const { loading } = this.props;

    if (loading) return <Loading />

    return (
      <>
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Role</th>
            </tr>
          </thead>
          {this.displayData()}
        </Table>
        <Modal isOpen={this.state.modal} toggle={this.toggle} fade={false}>
          <ModalHeader toggle={this.toggle}>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure to want to delete this item?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onDeleteClick}>Yes</Button>{' '}
            <Button color="danger" onClick={this.toggle}>No</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => ({
  users: state.user.users,
  loading: state.user.loading,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getUsers, deleteUser }
)(UserList);
