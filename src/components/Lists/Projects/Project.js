import React, { Component } from 'react';

import { connect } from 'react-redux';
import { deleteProject } from '../../../reducers/actions';

import { ProjectContainer, ProjectTitle, ProjectButtons } from './projectComponents';
import ProjectModal from './ProjectModal';
import ConfirmModal from '../../Modals/ConfirmModal';
import IconButton from '../../General/IconButton';

import { Draggable } from 'react-beautiful-dnd';

class Project extends Component {

  handleView = () => {
    const { openModal, closeModal, value: initialValues } = this.props;

    openModal(ProjectModal, {
      initialValues,
      onCancel: closeModal,
      viewOnly: true
    })
  }

  handleEdit = e => {
    e.stopPropagation();

    const { openModal, closeModal, value: initialValues } = this.props;

    openModal(ProjectModal, {
      initialValues,
      onCancel: closeModal,
    })
  }

  handleDelete = e => {
    e.stopPropagation();

    const { openModal, closeModal, deleteProject, value: { projectID } } = this.props;
    openModal(ConfirmModal, {
      message: 'Are you sure you want to delete this project?',
      onConfirm: () => deleteProject(projectID),
      onCancel: closeModal
    })
  }

  render() {

    const { value: { projectID: id, projectName: name }, index } = this.props;

    return (
      <Draggable draggableId={id} index={index} type="PROJECT">
        {(provided, snapshot) => (
          <ProjectContainer 
            innerRef={provided.innerRef} 
            {...provided.draggableProps} 
            {...provided.dragHandleProps}
            onClick={this.handleView}
          >
            <ProjectTitle>{name}</ProjectTitle>
            <ProjectButtons>
              <IconButton className="fas fa-pencil-alt" onClick={this.handleEdit} />
              <IconButton className="fas fa-trash-alt" onClick={this.handleDelete} />
            </ProjectButtons>
          </ProjectContainer>
        )}
      </Draggable>
    );
  }
}

export default connect(
  null,
  { deleteProject } 
)(Project);