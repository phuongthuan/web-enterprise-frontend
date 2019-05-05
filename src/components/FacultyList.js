import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFaculties, deleteFaculty } from '../actions/facultyActions';
import { getUsers } from '../actions/userActions';
import { Card, CardText, CardTitle } from 'reactstrap';

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

  render() {
    const { faculties } = this.props.faculty;
    return (
      <>
        {faculties && faculties.map(faculty => (
          <Card key={faculty._id} className="mb-4" body>
            <CardTitle>Faculty: {faculty.name}</CardTitle>
            <CardText>Manager: {this.getManager(faculty._manager)}</CardText>
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