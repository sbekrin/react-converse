import styled, { keyframes } from 'styled-components';

const slideUpAnimation = keyframes`
  from {
    transform: translate3d(0, 50%, 0);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

const Row = styled.div`
  animation-name: ${slideUpAnimation};
  animation-duration: 200ms;
  margin-bottom: 0.25rem;
  flex-direction: column;
  display: flex;
`;

export default Row;
