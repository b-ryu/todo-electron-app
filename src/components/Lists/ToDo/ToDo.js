import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ListContainer from '../ListContainer';
import Title from '../../General/Title';
import BulletList from '../../General/BulletList';
import Message from '../../General/Message';
import IconButton from '../../General/IconButton';
import { activeDay, editWeek } from '../../../reducers/actions';


var moment = require('moment');


const NextButtonWidth = 50;
const NextButton = styled.div`
  position: absolute;
  ${({ side }) => side}: 0;
  top: 0;
  bottom: 0;
  width: ${NextButtonWidth}px;
  background-color: #888888;
  opacity: 0.1;
  z-index: 10;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;

  :hover {
    opacity: 0.5;
  }

  ${({ disabled }) => disabled && `
    pointer-events: none;
    opacity: 0;
    cursor: initial;
  `}
`;
NextButton.defaultProps = { side: 'left' };


const DailyItems = styled.div`
  position: relative;
  padding: 10px ${NextButtonWidth + 10}px;
`;


class ToDo extends Component {
  constructor(props) {
    super(props);

    const { active: { weekIndex, dayIndex }, calendar } = props;
    this.state = {
      changedSomething: false,
      items: (weekIndex !== -1 && dayIndex !== -1) ? calendar[weekIndex].days[dayIndex].items : []
    };
  }

  componentDidUpdate(prevProps) {
    const { weekIndex: pwi, dayIndex: pdi } = prevProps.active;
    const { active: { weekIndex: wi, dayIndex: di }, calendar, editWeek } = this.props;
    const { items, changedSomething } = this.state;

    if (pwi !== wi || pdi !== di) {
      if (calendar[pwi] && changedSomething) {
        editWeek(calendar[pwi].weekID, pdi, items);
      }
      if (wi !== -1 && di !== -1) {
        this.setState({ changedSomething: false, items: calendar[wi].days[di].items })
      }
    }
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({ items: value, changedSomething: true });
  }

  goBack = () => {
    const { active: { weekIndex, dayIndex }, activeDay } = this.props;
    if (dayIndex === 0) {
      activeDay(weekIndex - 1, 6);

    } else {
      activeDay(weekIndex, dayIndex - 1);
    }
  }

  goForward = () => {
    const { active: { weekIndex, dayIndex }, activeDay } = this.props;
    if (dayIndex === 6) {
      activeDay(weekIndex + 1, 0);
    } else {
      activeDay(weekIndex, dayIndex + 1);
    }
  }

  handleSave = () => {
    const { active: { weekIndex, dayIndex }, editWeek, calendar } = this.props;
    const { items } = this.state;
    editWeek(calendar[weekIndex].weekID, dayIndex, items);
  }
 
  render() {
    const { items } = this.state;
    const { active: { weekIndex, dayIndex }, calendar } = this.props;
    const currentlyActive = weekIndex !== -1 && dayIndex !== -1;
    var date, isFirstDay, isLastDay, id;

    if (currentlyActive) {
      date = calendar[weekIndex].days[dayIndex].date;
      const formattedDate = moment(date).format('MMMM Do');
      date = moment().format('MMM D') !== moment(date).format('MMM D') ? formattedDate : `${formattedDate} (today)`
      isFirstDay = !weekIndex && !dayIndex;
      isLastDay = weekIndex === calendar.length - 1 && dayIndex === 6;
      id = `${calendar[weekIndex].weekID}${dayIndex}`;
    } else {
      date = `${moment().format('MMMM Do')} (today)`;
      isFirstDay = true;
      isLastDay = true;
      id = undefined;
    }

    return (
      <ListContainer>
        <Title>
          {date}
          <IconButton 
            className="fas fa-save" 
            onClick={this.handleSave} 
            disabled={!currentlyActive}
            style={{ 
              backgroundColor: 'blue', 
              position: 'absolute',
              right: '10px'
            }}
          />
        </Title>
        {currentlyActive ? 
          <DailyItems>
            <BulletList 
              id={id} 
              items={items} 
              handleChange={this.handleChange}
              textStyle={{ fontSize: 20 }}
            />
            <NextButton 
              className="fas fa-arrow-left"
              onClick={this.goBack} 
              side="left" 
              disabled={isFirstDay} 
            />
            <NextButton 
              className="fas fa-arrow-right"
              onClick={this.goForward} 
              side="right" 
              disabled={isLastDay} 
            />
          </DailyItems> : 
          <Message>Nothing planned for today</Message>
        }
      </ListContainer>
    );
  }
}


export default connect(
  (state) => ({
    active: state.calendar.active,
    calendar: state.calendar.weeks
  }),
  { activeDay, editWeek }
)(ToDo);
