/* eslint no-unused-vars: "off" */
import * as React from 'react';
import styled from 'styled-components';
import { withConverse } from 'react-converse';
import Row from './row';

class Message extends React.Component<*> {
  static defaultProps = {
    delay: 750,
  };

  timeout = null;

  componentWillMount() {
    if (this.props.outcoming) {
      this.send();
    } else {
      this.props.startTyping();
      this.timeout = setTimeout(this.send, this.props.delay);
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  send = () => {
    this.props.endTyping();
    this.props.showNextMessage();
  };

  render() {
    const {
      showNextMessage,
      startTyping,
      endTyping,
      outcoming,
      ...props
    } = this.props;
    return (
      <Row>
        <div {...props} />
      </Row>
    );
  }
}

const StyledMessage = styled(withConverse(Message))`
  align-self: ${props => (props.outcoming ? 'flex-end' : 'flex-start')};
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  display: inline-flex;
  color: ${props => (props.outcoming ? 'white' : 'black')};
  background: ${props => (props.outcoming ? 'blue' : '#eee')};
  line-height: 1.25;
  margin: 0;
`;

export default StyledMessage;
