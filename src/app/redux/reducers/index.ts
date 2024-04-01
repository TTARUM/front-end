import { combineReducers } from '@reduxjs/toolkit';
import reducer from './reducer';
import userReducer from '../slice/userSlice';

export default combineReducers({
  // (원하는 작명) : reducer.js
  test: reducer,
  user: userReducer,
});
