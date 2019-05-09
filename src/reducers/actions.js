export const ProjectActions = {
  CREATE: 'CREATE_PROJECT',
  DELETE: 'DELETE_PROJECT',
  EDIT: 'EDIT_PROJECT',
  REARRANGE: 'REARRANGE_PROJECTS'
};

export const createProject = (projectID, projectName, projectDesc) => ({
  type: ProjectActions.CREATE,
  projectID,
  projectName,
  projectDesc
});

export const deleteProject = projectID => ({
  type: ProjectActions.DELETE,
  projectID
});

export const editProject = (projectID, projectName, projectDesc) => ({
  type: ProjectActions.EDIT,
  projectID,
  projectName,
  projectDesc
});

export const rearrangeProjects = (destIndex, sourceIndex) => ({
  type: ProjectActions.REARRANGE,
  destIndex,
  sourceIndex
})

export const CalendarActions = {
  CREATE: 'CREATE_WEEK',
  DELETE: 'DELETE_WEEK',
  EDIT: 'EDIT_WEEK',
  ACTIVE: 'ACTIVE_DAY'
}

export const createWeek = (weekID, dates) => ({
  type: CalendarActions.CREATE,
  weekID,
  dates
})

export const deleteWeek = isLast => ({
  type: CalendarActions.DELETE,
  isLast
})

export const editWeek = (weekID, dayIndex, items) => ({
  type: CalendarActions.EDIT,
  weekID,
  dayIndex,
  items
})

export const activeDay = (weekIndex, dayIndex) => ({
  type: CalendarActions.ACTIVE,
  weekIndex,
  dayIndex
})