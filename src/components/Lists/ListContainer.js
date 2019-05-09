import styled from 'styled-components';
import narrow from '../media';

const ListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  min-height: 150px;
  ${narrow`
    width: 100%;
  `}
`;

export default ListContainer;