import FileService from '../FileService';
import update from 'immutability-helper';

import { CalendarActions } from './actions';

var moment = require('moment');

const CalendarFile = new FileService({
  fileName: 'calendar',
  defaults: { state: { weeks: [] } }
});

const getInitialCalendarState = () => {
  var result = CalendarFile.get('state');
  
  const today = moment();
  var weekIndex, dayIndex;
  weekIndex = result.weeks.findIndex(week => {
    dayIndex = week.days.findIndex(day => !moment(today).diff(day.date, 'days'));
    return dayIndex !== -1;
  });

  return update(result, { active: { $set: { weekIndex, dayIndex } } });
}

const saveCalendarState = state => {
  CalendarFile.set('state', { weeks: state.weeks });
}

const CalendarReducer = (state = getInitialCalendarState(), action) => {
  switch(action.type) {
    case(CalendarActions.EDIT): {
      const weekIndex = state.weeks.findIndex(week => week.weekID === action.weekID);
      if (weekIndex !== -1) {
        const newState = update(state, { weeks: { [weekIndex]: { days: { [action.dayIndex]: { items: { $set: action.items } } } } } });
        saveCalendarState(newState);
        return newState;
      } else {
        return state;
      }
    }
    case(CalendarActions.DELETE): {
      var updateActive = { $merge: {} };
      if (state.weeks.length === 1) {
        updateActive = { $merge: { weekIndex: -1, dayIndex: -1 } };
      } else if (action.isLast) {
        if (state.active.weekIndex === state.weeks.length - 1) {
          updateActive = { $merge: { weekIndex: state.active.weekIndex - 1 } };
        }
      } else {
        if (state.active.weekIndex) {
          updateActive = { $merge: { weekIndex: state.active.weekIndex - 1 } };
        }
      }
      const newState = update(state, { 
        weeks: { $splice: [(action.isLast ? [-1, 1] : [0, 1])] }, 
        active: updateActive
      });
      saveCalendarState(newState);
      return newState;
    }
    case(CalendarActions.CREATE): {
      const newState = update(state, { weeks: { $push: [{
        weekID: action.weekID,
        days: action.dates.map(date => ({ date, items: [] }))
      }] } });
      saveCalendarState(newState);
      return newState;
    }
    case(CalendarActions.ACTIVE): {
      const { weekIndex, dayIndex } = action;
      return update(state, { active: { $set: { weekIndex, dayIndex } } });
    }
    default:
      return state;
  }
}

export default CalendarReducer;