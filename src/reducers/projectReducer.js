import update from 'immutability-helper';

import FileService from '../FileService';
import { ProjectActions } from './actions';


const ProjectFile = new FileService({
  fileName: 'projects',
  defaults: { state: [] }
});


const getInitialProjectState = () => {
  const result = ProjectFile.get('state');
  return result;
}


const saveProjectState = state => {
  ProjectFile.set('state', state);
}


const projectReducer = (state = getInitialProjectState(), action) => {
  const index = state.findIndex(project => project.projectID === action.projectID);
  switch(action.type) {
    case(ProjectActions.EDIT): {
      const newState = update(state, { [index]: { $merge: { projectName: action.projectName, projectDesc: action.projectDesc } } })
      saveProjectState(newState);
      return newState;
    }
    case(ProjectActions.DELETE): {
      const newState = update(state, { $splice: [[index, 1]] });
      saveProjectState(newState);
      return newState;
    }
    case(ProjectActions.CREATE): {
      const newState = update(state, { $push: [{
        projectID: action.projectID,
        projectName: action.projectName,
        projectDesc: action.projectDesc
      }] });
      saveProjectState(newState);
      return newState;
    }
    case(ProjectActions.REARRANGE): {
      const { destIndex, sourceIndex } = action;
      const newState = update(state, { $splice: 
        [[sourceIndex, 1], 
        [destIndex, 0, update(state, { $apply: state => state[sourceIndex] })]] 
      });
      saveProjectState(newState);
      return newState;
    }
    default:
      return state;
  }
}


export default projectReducer;
