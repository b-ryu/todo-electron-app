import React, { Component } from 'react';
import styled from 'styled-components';
import narrow from '../media';

import Day from './Day';

var moment = require('moment');

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 20px;
  position: relative;

  ${narrow`
    flex-direction: column;
    margin-bottom: 50px;

    &:after {
      content: " ";
      position: absolute;
      height: 30px;
      bottom: -40px;
      width: 100%;
      background-color: purple;
    }
  `}
`;

const DeleteButton = styled.div`
  margin: 5px;
  flex-grow: 1;
  flex-basis: 0;
  border-radius: 5px;
  background-color: red;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${narrow`
    height: 50px;
    flex-grow: unset;
    flex-basis: unset;
  `}

  :hover {
    opacity: 0.9;
  }
  :active {
    opacity: 0.8;
  }
`;

export default class Week extends Component {
  constructor(props) {
    super(props);

    this.state = { daysPast: this.getDaysPast() };
    setInterval(this.updateDaysPast, 300000);
  }

  getDaysPast = () => {
    const { days } = this.props;
    const currentDate = moment();
    var daysPast = 0;
    days.forEach(day => {
      if (moment(day.date).isBefore(currentDate, 'day')) ++daysPast;
    })
    return daysPast;
  }

  updateDaysPast = () => {
    this.setState({ daysPast: this.getDaysPast() });
  }

  handleDelete = () => {
    const { deleteWeek } = this.props;
    deleteWeek(false);
  }

  render() {

    const { days, index } = this.props;
    const { daysPast } = this.state;
    const canDelete = !index && daysPast === 7;

    return (
      <Container>
        {days.map((day, i) => (
          <Day 
            key={i} 
            date={day.date} 
            items={day.items} 
            dayIndex={i}
            weekIndex={index}
            isPast={i < daysPast}
          />
        ))}
        {canDelete && <DeleteButton className="fas fa-trash-alt" onClick={this.handleDelete} />}
      </Container>
    );
  }
}