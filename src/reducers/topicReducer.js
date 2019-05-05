import {
  GET_TOPICS,
  ADD_TOPIC,
  DELETE_TOPIC,
  TOPICS_LOADING
} from '../actions/types';

const initialState = {
  topics: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOPICS:
      return {
        ...state,
        topics: action.payload,
        loading: false
      };
    case DELETE_TOPIC:
      return {
        ...state,
        topics: state.topics.filter(topic => topic._id !== action.payload)
      };
    case ADD_TOPIC:
      return {
        ...state,
        topics: [action.payload, ...state.topics]
      };
    case TOPICS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}