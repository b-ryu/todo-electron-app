import styled from 'styled-components';


export const ProjectContainer = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #1857bc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${({ disabled }) => !disabled && `
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 0.8;
    }
  `}
`;


export const ProjectTitle = styled.div`
  word-wrap: break-word;
  width: calc(100% - 75px);
  min-width: 0;
  font-size: 18px;
`;


export const ProjectButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70px;
`;
