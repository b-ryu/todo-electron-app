import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Droppable } from 'react-beautiful-dnd';

import ModalConsumer from '../../Modals/ModalConsumer';
import ListContainer from '../ListContainer';
import Title from '../../General/Title';
import Message from '../../General/Message';
import IconButton from '../../General/IconButton';
import Project from './Project';
import ProjectModal from './ProjectModal';


const ProjectList = styled.div`
  max-height: 300px;
  overflow-x: hidden;
  overfloy-y: auto;
`;


class Projects extends Component {
  handleNewProject = () => {
    const { openModal, closeModal } = this.props;

    openModal(ProjectModal, {
      onCancel: closeModal
    });
  }

  render() {
    const { projects = [], openModal, closeModal } = this.props;

    return (
      <ListContainer>
        <Title>
          projects
          <IconButton 
            className="fas fa-plus-circle" 
            style={{ 
              backgroundColor: 'green', 
              position: 'absolute',
              right: '10px'
            }}
            onClick={this.handleNewProject} 
          />
        </Title>
        {projects && projects.length ?  
          <Droppable droppableId="PROJECT_LIST" type="PROJECT">
            {(provided, snapshot) => (
              <ProjectList innerRef={provided.innerRef} {...provided.droppableProps}>
                {projects.map((project, i) => (
                  <Project 
                    key={project.projectID}
                    index={i}
                    value={project} 
                    openModal={openModal} 
                    closeModal={closeModal} 
                  />
                ))}
                {provided.placeholder}
              </ProjectList>
            )}
          </Droppable> :
          <Message>No projects planned</Message>
        }
      </ListContainer>
    );
  }
}


export default connect(
  (state) => ({ projects: state.projects })
)(compose(
  ModalConsumer
)(Projects));
