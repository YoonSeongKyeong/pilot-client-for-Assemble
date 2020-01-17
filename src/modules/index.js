import { combineReducers } from 'redux';
// import list from './list';
// import shorten from './shorten';
import login from './login';
import signup from './signup';

export default combineReducers({
  login,
  signup

});