import styled from 'styled-components';


export default styled.i`
  display: inline-block;
  background-color: #990a0a
  width: 24px;
  height: 24px;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  padding: 2px;
  margin: 2px;
  cursor: pointer;
    
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }

  ${({ disabled }) => disabled && `
    cursor: initial;
    pointer-events: none;
    opacity: 0.5;
  `}
`;
