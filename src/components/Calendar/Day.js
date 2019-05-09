import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import narrow from '../media';

import { activeDay } from '../../reducers/actions';

import monthColors from '../../monthColors';

var moment = require('moment');

const Container = styled.div`
  background-color: #56635f;  
  flex-grow: 3;
  flex-basis: 0;
  min-height: 100%;
  min-width: 0;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  word-wrap: break-word;

  ${({ isPast }) => isPast && `
    pointer-events: none;
    opacity: 0.5;
  `}

  ${({ isActive }) => isActive && `
    outline: 4px solid yellow;
  `}

  ${narrow`
    height: unset;
    flex-grow: unset;
    flex-basis: unset;
  `}
`;

const DayHeader = styled.div`
  padding: 5px;
  margin: 2px;
  border-radius: 3px;
  background-color: ${({ color }) => color};
  flex-grow: 0;
`;
DayHeader.defaultProps = { color: 'red' };

const DayList = styled.ul`
  min-height: 30px;
  padding: 5px;
  margin: 2px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  list-style-position: outside;
  padding-left: 25px;
  flex-grow: 1;
  word-wrap: break-word;
`;

const DayItem = styled.li`
  font-size: 14px;
  max-width: 100%;
  word-wrap: break-word;
`;

const addTrailingSpaces = num => {
  var spaces = '';
  for (var i = 0; i < num; ++i) {
    spaces += ' ';
  }
  return spaces;
}

const concatItem = item => {
  if (item && item.length > 40) {
    return `${item.substring(0, 40)}...`;
  }
  return item;
}

class Day extends Component {
  handleClick = () => {
    const { activeDay, weekIndex, dayIndex } = this.props;

    activeDay(weekIndex, dayIndex);
  }

  render() {

    const { date, items = [], dayIndex, weekIndex, isPast, active } = this.props;
    const day = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'][dayIndex];
    const isActive = weekIndex === active.weekIndex && dayIndex === active.dayIndex;
    var dateHeader = `${day} - ${moment(date).format('MMM D')}`;
    const month = moment(date).month();
    dateHeader += addTrailingSpaces(Math.max(0, 20 - date.length));

    return (
      <Container isActive={isActive} isPast={isPast} onClick={this.handleClick} >
        <DayHeader color={monthColors[month]}>{dateHeader}</DayHeader>
        <DayList>
          {items.map((item, i) => <DayItem key={i}>{concatItem(item)}</DayItem>)}
        </DayList>
      </Container>
    )
  }
};

export default connect(
  (state) => ({
    active: state.calendar.active
  }),
  { activeDay }
)(Day);