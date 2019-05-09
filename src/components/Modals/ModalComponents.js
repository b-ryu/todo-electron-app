import styled from 'styled-components';

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 30px;
  color: black;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 100;
`;

export const ModalTitle = styled.div`
  font-size: ${({ small }) => small ? 24 : 30}px;
  margin: 20px 0;
`;
ModalTitle.defaultProps = { small: false };

export const ModalField = styled.input`
  font-size: 20px;
  padding: 2px;
  margin: 30px 10px;
  border: 1px solid black;
  border-radius: 3px;
`;

export const ModalLabel = styled.label`
  font-size: 16px;
`;

export const ModalButtons = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const ModalButton = styled.div`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${({ color }) => color}
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }

  ${({ disabled }) => disabled && `
    pointer-events: none;
    opacity: 0.8;
  `}
`;
ModalButton.defaultProps = { color: '#1b4891', disabled: false };