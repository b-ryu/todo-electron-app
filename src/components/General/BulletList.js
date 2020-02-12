import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import update from 'immutability-helper';
import TextareaAutosize from 'react-autosize-textarea';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 150px;

  ${({ viewOnly }) => viewOnly && `
    pointer-events: none;
    user-select: auto;
  `}
`;


const BulletPoint = styled.div`
  margin-left: 10px;
  padding-left: 10px;
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: -5px;
  }
`;


const Item = styled(TextareaAutosize)`
  background-color: transparent;
  resize: none;
  outline: none;
  border: none;
  font-family: sans-serif;
  color: white;
  font-size: 16px;
  width: 100%;
`;


export default class BulletList extends Component {
  constructor() {
    super();

    this.state = { focused: -1 };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ focused: -1 });
      this.props.items.forEach((item, i) => {
        this.focusOrBlurElement(i, 'blur');
      })
    }
  }

  handleChange = i => e => {
    const value = e.target.value;
    const { items, handleChange } = this.props;
    handleChange({ target: { value: update(items, { [i]: { $set: value || '' } }) } });
  }

  removeBullet = i => {
    const { items, handleChange } = this.props;
    handleChange({ target: { value: update(items, { $splice: [[i, 1]] }) } });
  }

  addBullet = (i, val) => {
    const { items, handleChange } = this.props;
    handleChange({ target: { value: update(items, { $splice: [[i + 1, 0, val || '']] }) } });
  }

  focusOrBlurElement = (ref, action) => {
    const element = ReactDOM.findDOMNode(this[ref]);
    if (element) {
      if (action === 'focus') {
        element.focus();
      } else {
        element.blur();
      }
    }
  }

  handleKey = i => async e => {
    const { items } = this.props;
    const key = e.keyCode;
    switch(key) {
      case(8): // backspace
        if (!items[i]) {
          e.preventDefault();
          this.removeBullet(i);
          if (i) {
            this.focusOrBlurElement(i - 1, 'focus');
            this.setState({ focused: i - 1 });
          }
        }
        break;
      case(13): // enter
        e.preventDefault();
        this.addBullet(i);
        this.focusOrBlurElement(i + 1, 'focus');
        this.setState({ focused: i + 1 });
        break;
      default:
        break;
      case(38): // up
        e.preventDefault();
        if (i) {
          this.focusOrBlurElement(i - 1, 'focus');
          this.setState({ focused: i - 1 });
        }
        break;
      case(40): // down
        e.preventDefault();
        if (i !== items.length - 1) {
          this.focusOrBlurElement(i + 1, 'focus');
          this.setState({ focused: i + 1 });
        }
        break;
    }
  }

  handleListClick = () => {
    const { items, handleChange, viewOnly } = this.props; 
    if (!viewOnly) {
      if (items && !items.length) {
        handleChange({ target: { value: [''] } });
        this.setState({ focused: 0 });
      }
    }
  }

  handleListBlur = () => {
    const { items, handleChange } = this.props;
    if (items.length === 1 && !items[0]) {
      handleChange({ target: { value: [] } });
    }
  }

  render() {
    const { items = [], id = '', style, textStyle, viewOnly } = this.props;
    const { focused } = this.state;

    return (
      <Container 
        key={id}
        style={style}
        innerRef={e => this.container = e} 
        onClick={this.handleListClick}
        onBlur={this.handleListBlur}
      >
        {items.map((item, i) => 
          <BulletPoint key={`${id}${i}`}>
            <Item 
              autoFocus={focused === i}
              innerRef={e => this[i] = e} 
              value={item}
              onChange={this.handleChange(i)} 
              onKeyDown={this.handleKey(i)}
              style={textStyle}
              readOnly={viewOnly}
            />
          </BulletPoint>
        )}
      </Container>
    );
  }
}
