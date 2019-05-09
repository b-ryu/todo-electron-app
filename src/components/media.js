import { css } from 'styled-components';

const narrow = (...args) => (
  css`
    @media (max-width: 900px) {
      ${css(...args)}
    }
  `
);

export default narrow;