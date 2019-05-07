import axios from 'axios';
import { UPDATE_POST, PUBLISH_POST, GET_POSTS, GET_POST, ADD_POST, DELETE_POST, POSTS_LOADING, GET_MY_POSTS, GET_ALL_POSTS } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { addFlashMessage } from './flashMessageActions';
import history from '../history';


export const getPosts = (topicId) => (dispatch, getState) => {
  dispatch(setPostsLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/posts?topicId=${topicId}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getAllPosts = () => (dispatch, getState) => {
  dispatch(setPostsLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/posts`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_ALL_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getMyPosts = () => (dispatch, getState) => {
  dispatch(setPostsLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/posts`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_MY_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getPost = postId => (dispatch, getState) => {
  dispatch(setPostsLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/posts/${postId}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const publishPost = postId => (dispatch, getState) => {
  dispatch(setPostsLoading());
  axios
    .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/posts/publish/${postId}`, tokenConfig(getState))
    .then(res => {

      dispatch({
        type: PUBLISH_POST,
        payload: res.data
      });

      dispatch(
        addFlashMessage({
          type: 'success',
          text: 'A post has been published!'
        })
      );

      history.push('/');
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const createPost = post => (dispatch, getState) => {
  dispatch({ type: POSTS_LOADING });
  axios
    .post(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/posts`, post, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      })

      dispatch(
        addFlashMessage({
          type: 'success',
          text: 'Create Post Successfully!'
        })
      );

      history.push('/');

    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updatePost = (postId, post) => (dispatch, getState) => {
  dispatch({ type: POSTS_LOADING });
  axios
    .put(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/posts/${postId}`, post, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_POST,
        payload: res.data
      })

      dispatch(
        addFlashMessage({
          type: 'success',
          text: 'Update post successfully!'
        })
      );

      history.push('/');
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deletePost = id => (dispatch, getState) => {
  axios
    .delete(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/posts/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: id
      });

      dispatch(
        addFlashMessage({
          type: 'success',
          text: 'Delete post successfully!'
        })
      );

    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};