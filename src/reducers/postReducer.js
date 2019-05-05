import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  GET_POST,
  GET_MY_POSTS,
  GET_ALL_POSTS,
} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MY_POSTS:
    case GET_POSTS:
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}