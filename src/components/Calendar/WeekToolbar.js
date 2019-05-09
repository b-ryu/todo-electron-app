import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import makeID from '../../id';

import { createWeek, deleteWeek, activeDay } from '../../reducers/actions';

var moment = require('moment');

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 30px 0;
`;


const Button = styled.div`
  width: 45%;
  padding: 10px;
  min-height: 40px;
  line-height: 40px;
  border-radius: 5px;
  background-color: ${({ red }) => red ? 'red' : 'blue'};
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  box-sizing: border-box;

  &:hover {
    opacity: 0.8;
    border: 2px solid white;
  }
  &:active {
    opacity: 0.7;
  }

  ${({ disabled }) => disabled && `
    pointer-events: none;
    opacity: 0.5;
  `}
`;

class WeekToolbar extends Component {
  
  handleCreate = () => {
    const { createWeek, lastDate, numOfWeeks, activeDay } = this.props;
    const startOfWeek = lastDate ? moment(lastDate).clone().add(1, 'd') : moment().startOf('isoWeek');
    var dates = [];
    for (var i = 0; i < 7; ++i) {
      dates.push(startOfWeek.clone().add(i, 'd'));
    }
    createWeek(makeID(), dates);
    if (!numOfWeeks) {
      activeDay(0, moment().isoWeekday() - 1)
    }
  }

  handleDelete = () => {
    const { deleteWeek } = this.props;
    deleteWeek(true);
  }
  
  render() {

    const { lastDate } = this.props;

    return (
      <Container>
        <Button  onClick={this.handleCreate}>
          add week
        </Button>
        <Button red onClick={this.handleDelete} disabled={!lastDate}>
          remove week
        </Button>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    numOfWeeks: state.calendar.weeks.length,
    active: state.calendar.active
  }),
  { createWeek, deleteWeek, activeDay }
)(WeekToolbar);