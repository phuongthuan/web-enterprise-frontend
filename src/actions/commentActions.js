import axios from 'axios';
import { GET_COMMENTS, ADD_COMMENT, COMMENTS_LOADING, CLEAR_COMMENTS } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getComments = postId => (dispatch, getState) => {
  dispatch(setCommentsLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/posts/${postId}/comments`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_COMMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addComment = (postId, comment) => (dispatch, getState) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/posts/${postId}/comments`, comment, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const clearCommentList = () => {
  return {
    type: CLEAR_COMMENTS
  }
}

export const setCommentsLoading = () => {
  return {
    type: COMMENTS_LOADING
  };
};