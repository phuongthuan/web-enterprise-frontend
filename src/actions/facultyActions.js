import axios from 'axios';
import { GET_FACULTIES, ADD_FACULTY, DELETE_FACULTY, FACULTIES_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getFaculties = () => (dispatch, getState) => {
  dispatch(setFacultiesLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/faculties`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_FACULTIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addFaculty = faculty => (dispatch, getState) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/faculties`, faculty, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_FACULTY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteFaculty = id => (dispatch, getState) => {
  axios
    .delete(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/faculties/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_FACULTY,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setFacultiesLoading = () => {
  return {
    type: FACULTIES_LOADING
  };
};