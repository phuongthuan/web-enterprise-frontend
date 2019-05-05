import {
  GET_FACULTIES,
  ADD_FACULTY,
  DELETE_FACULTY,
  FACULTIES_LOADING
} from '../actions/types';

const initialState = {
  faculties: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FACULTIES:
      return {
        ...state,
        faculties: action.payload,
        loading: false
      };
    case DELETE_FACULTY:
      return {
        ...state,
        faculties: state.faculties.filter(f => f._id !== action.payload)
      };
    case ADD_FACULTY:
      return {
        ...state,
        faculties: [action.payload, ...state.faculties]
      };
    case FACULTIES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}