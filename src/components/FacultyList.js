import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFaculties, deleteFaculty } from '../actions/facultyActions';
import { getUsers } from '../actions/userActions';
import { Card, CardText, CardTitle, Button } from 'reactstrap';
import history from '../history';

class FacultyList extends Component {

  static propTypes = {
    getFaculties: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    faculty: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getFaculties();
    this.props.getUsers();
  }

  onDeleteClick = id => {
    this.props.deleteFaculty(id);
  };

  getManager = (id) => {
    const { users } = this.props.user;
    if (users) {
      const manager = users && users.find(user => user._id === id);
      if (manager) {
        return manager.name;
      }
    }
  }

  goToCreateUser = () => {
    history.push('/newuser');
  }

  goToCreateFaculty = () => {
    history.push('/newfaculty');
  }

  render() {
    const { faculties } = this.props.faculty;
    return (
      <>
        <Button 
          onClick={this.goToCreateUser}
          size="sm" 
          color="primary" 
          className="mb-4"
        >+ Create new user</Button>

        <Button 
          onClick={this.goToCreateFaculty}
          size="sm" 
          color="primary" 
          className="ml-3 mb-4"
        >+ Create new faculty</Button>

        {faculties && faculties.map(faculty => (
          <Card key={faculty._id} className="mb-4" body>
            <CardTitle>Faculty name: {faculty.name}</CardTitle>
            <CardText>Manager: <strong>{this.getManager(faculty._manager)}</strong></CardText>
            <CardText>Number of Contributions: {faculties.length}</CardText>
          </Card>
        ))}
      </>
    )
  }
}

const mapStateToProps = state => ({
  faculty: state.faculty,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { getFaculties, getUsers, deleteFaculty }
)(FacultyList);