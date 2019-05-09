import React, { Component } from 'react';

import { connect } from 'react-redux';
import { rearrangeProjects } from './reducers/actions'

import Header from './components/Header';
import Lists from './components/Lists';
import Calendar from './components/Calendar';

import ModalProvider from './components/Modals/ModalProvider';
import { DragDropContext } from 'react-beautiful-dnd'

class App extends Component {

  handleDragEnd = result => {
    if (!result.destination) {
      return;
    }

    switch(result.destination.droppableId) {
      case('PROJECT_LIST'):
        const { destination: { index: destIndex }, source: { index: sourceIndex } } = result;
        const { rearrangeProjects } = this.props;
        rearrangeProjects(destIndex, sourceIndex);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <ModalProvider>
          <Header />
          <Lists />
          <Calendar />
        </ModalProvider>
      </DragDropContext>
    );
  }
}

export default connect(
  null,
  { rearrangeProjects }
)(App);
