import React, { Component } from 'react';
import styled from 'styled-components';

const { Provider, Consumer } = React.createContext({});
export { Consumer };

const Window = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  

  overflow-x: hidden;
  overflow-y: auto;

  transition: all 0.2s linear;
`;

const Shadow = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.25);
  opacity: 0;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  pointer-events: none;

  ${({ active }) => active && `
    opacity: 1;
  `}
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-transparent;
  overflow-y: auto;
  pointer-events: initial;
  z-index: 100;
`;

export default class ModalProvider extends Component {
  constructor() {
    super();
    
    this.state = { active: false }
  }

  openModal = (Component, modalProps) => {
    this.setState({ 
      active: true,
      Component,
      modalProps
    });
  }

  closeModal = () => {
    this.setState({ active: false, Component: undefined, modalProps: undefined });
  }

  handleOverlayClick = e => {
    if (this.state.active) {
      this.closeModal();
    }
  }

  diffuseClick = e => {
    e.stopPropagation();
  }

  render() {

    const { active, Component, modalProps } = this.state;
    const modalFunctions = {
      openModal: this.openModal,
      closeModal: this.closeModal
    }

    return (
      <Window>
        <Contents active={active}>
          <Provider value={modalFunctions}>
            {this.props.children}
          </Provider>
        </Contents>
        <Shadow active={active}>
          {Component && 
            <Overlay onClick={this.handleOverlayClick}>
              <Component {...modalProps} onClick={this.diffuseClick} />
            </Overlay>
          }
        </Shadow>
      </Window>
    );
  }
}