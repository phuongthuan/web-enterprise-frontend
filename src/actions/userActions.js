import axios from 'axios';
import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING, ADD_USER_FAIL } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { addFlashMessage } from './flashMessageActions';
import history from '../history';

export const getUsers = () => (dispatch, getState) => {
  dispatch(setUsersLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/users`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const createUser = user => (dispatch, getState) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/users`, user, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_USER,
        payload: res.data
      });

      dispatch(
        addFlashMessage({
          type: 'success',
          text: 'Create User Successfully!'
        })
      );
      
      history.push('/');
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ADD_USER_FAIL')
      );
      dispatch({
        type: ADD_USER_FAIL
      });
    });
};

export const deleteUser = id => (dispatch, getState) => {
  axios
    .delete(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/users/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_USER,
        payload: id
      });

      dispatch(
        addFlashMessage({
          type: 'success',
          text: 'Delete user successfully!'
        })
      );

    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};