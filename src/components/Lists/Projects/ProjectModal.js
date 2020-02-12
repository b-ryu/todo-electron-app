import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editProject, createProject } from '../../../reducers/actions';
import { 
  ModalContainer, 
  ModalTitle, 
  ModalField, 
  ModalLabel, 
  ModalButtons, 
  ModalButton
} from '../../Modals/ModalComponents'
import BulletList from '../../General/BulletList';
import makeID from '../../../id';


class ProjectModal extends Component {
  constructor(props) {
    super(props);

    const { initialValues: { projectID = makeID(), projectName = '', projectDesc = [] } = {} } = props;
    this.state = { projectID, projectName, projectDesc };
  }

  handleSave = () => {
    const { initialValues, createProject, editProject, onCancel } = this.props;
    const { projectID, projectName, projectDesc } = this.state;
    if (initialValues) {
      editProject(projectID, projectName, projectDesc);
    } else {
      createProject(projectID, projectName, projectDesc);
    }
    onCancel();
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  }

  handleChange = field => e => {
    const { value } = e.target;
    this.setState({ [field]: value });
  }

  render() {
    const { initialValues, viewOnly, onClick } = this.props;
    const { projectName, projectDesc } = this.state;

    return (
      <ModalContainer onClick={onClick}>
        <ModalTitle>{viewOnly ? projectName : initialValues ? 'edit project' : 'create new project'}</ModalTitle>
        {!viewOnly &&
          <ModalLabel>
            project name:
            <ModalField value={projectName} onChange={this.handleChange('projectName')} />
          </ModalLabel>
        }
        <ModalLabel>
          subtasks:
          <BulletList
            items={projectDesc}
            handleChange={this.handleChange('projectDesc')} 
            viewOnly={viewOnly} 
            style={{ 
              border: viewOnly ? 'none' : '1px solid black', 
              borderRadius: '3px',
              padding: '5px',
              marginTop: '10px'
            }}
            textStyle={{ color: 'black' }}
          />
        </ModalLabel>
        {!viewOnly &&
          <ModalButtons>
            <ModalButton disabled={!projectName} onClick={this.handleSave}>save</ModalButton>
            <ModalButton onClick={this.handleCancel} color="black">cancel</ModalButton>
          </ModalButtons> 
        }
      </ModalContainer>
    );
  }
}


export default connect(
  null,
  { createProject, editProject }
)(ProjectModal);
