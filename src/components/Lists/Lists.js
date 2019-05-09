import React, { Component } from 'react';
import styled from 'styled-components';
import narrow from '../media';

import ToDo from './ToDo';
import Projects from './Projects';

const Container = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: row;
  max-height: 900px;
  overflow-x: hidden;
  overflow-y: auto;

  ${narrow`
    flex-direction: column;
    min-height: 300px;
  `}
`;

export default class Lists extends Component {
  render() {
    return (
      <Container>
        <ToDo />
        <Projects />
      </Container>
    )
  }
}