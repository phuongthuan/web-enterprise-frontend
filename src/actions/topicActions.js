import axios from 'axios';
import { GET_TOPICS, ADD_TOPIC, DELETE_TOPIC, TOPICS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getTopics = () => (dispatch, getState) => {
  dispatch(setTopicsLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/topics`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_TOPICS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const createTopic = topic => (dispatch, getState) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/topics`, topic, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_TOPIC,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteTopic = id => (dispatch, getState) => {
  axios
    .delete(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/topics/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_TOPIC,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setTopicsLoading = () => {
  return {
    type: TOPICS_LOADING
  };
};