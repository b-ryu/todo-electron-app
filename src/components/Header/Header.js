import React, { Component } from 'react';
import styled from 'styled-components';

import monthColors from '../../monthColors';


var moment = require('moment');


const Container = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 3px solid white;
`;


const Time = styled.div`
  font-size: 40px;
`;


export default class Header extends Component {
  constructor() {
    super();

    this.state = { date: this.getCurrentTime() };
    this.clock = setInterval(() => this.setState({ date: this.getCurrentTime() }));
  }
  
  getCurrentTime() {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
  }

  render() {
    const { date = '' } = this.state;
    const headerColor = monthColors[moment().month()];

    return (
      <Container style={{ backgroundColor: headerColor }}>
        <Time>{date}</Time>
      </Container>
    );
  }
}