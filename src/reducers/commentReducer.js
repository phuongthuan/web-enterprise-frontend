import {
  GET_COMMENTS,
  ADD_COMMENT,
  COMMENTS_LOADING,
  CLEAR_COMMENTS
} from '../actions/types';

const initialState = {
  comments: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    case COMMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_COMMENTS:
      return {
        comments: [],
        loading: false,
      }
    default:
      return state;
  }
}