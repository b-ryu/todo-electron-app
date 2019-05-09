import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Title from '../General/Title';
import Week from './Week';
import WeekToolbar from './WeekToolbar';

import { deleteWeek } from '../../reducers/actions';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

class Calendar extends Component {
  render() {

    const { calendar = [], deleteWeek } = this.props;
    const lastDate = calendar.length ? calendar[calendar.length - 1].days[6].date : undefined;

    return (
      <Container>
        <Title>weekly schedule</Title>
        {calendar.map((week, i) => {
            const { weekID: id, days } = week;
            return ( 
              <Week 
                key={id}
                days={days}
                index={i}
                deleteWeek={deleteWeek}
              /> 
            );
          })
        }
        <WeekToolbar lastDate={lastDate} />
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    calendar: state.calendar.weeks
  }),
  { deleteWeek }
)(Calendar);