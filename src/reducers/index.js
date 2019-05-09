import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import calendarReducer from './calendarReducer';

export default combineReducers({
  projects: projectReducer,
  calendar: calendarReducer
})