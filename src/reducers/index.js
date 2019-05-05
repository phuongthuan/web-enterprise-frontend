import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import facultyReducer from './facultyReducer';
import postReducer from './postReducer';
import topicReducer from './topicReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  faculty: facultyReducer,
  post: postReducer,
  topic: topicReducer,
  user: userReducer,
  comment: commentReducer,
});