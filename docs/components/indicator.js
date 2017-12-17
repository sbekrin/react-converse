import React from 'react';
import styled, { keyframes } from 'styled-components';
import Row from './row';

const floatingAnimation = keyframes`
  from { transform: translate3d(0, 50%, 0); }
  to { transform: translate3d(0, -50%, 0); }
`;

const Dot = styled(({ offset, ...props }) => <div {...props} />)`
  animation-name: ${floatingAnimation};
  animation-duration: 500ms;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-delay: ${props => props.offset}ms;
  background-color: #666;
  border-radius: 50%;
  height: 6px;
  width: 6px;
`;

const Indicator = styled(props => (
  <Row>
    <div {...props}>
      <Dot offset={0} />
      <Dot offset={100} />
      <Dot offset={200} />
    </div>
  </Row>
))`
  justify-content: space-around;
  opacity: 0.8;
  border-radius: 1rem;
  background: #eee;
  padding: 0.5rem;
  display: flex;
  width: 2rem;
`;

export default Indicator;
