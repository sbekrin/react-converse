// @flow
/* eslint no-unused-vars: "off" */
import * as React from 'react';
import styled from 'styled-components';
import { withConverse } from 'react-converse';
import Row from './row';

const BasicMessage = styled.div`
  align-self: ${props => (props.outcoming ? 'flex-end' : 'flex-start')};
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  display: inline-flex;
  color: ${props => (props.outcoming ? 'white' : 'black')};
  background: ${props => (props.outcoming ? 'blue' : '#eee')};
  line-height: 1.25;
  margin: 0;
`;

const ActionMessage = styled.div`
  align-self: flex-end;

  button {
    transition: opacity 200ms ease;
    background: none;
    cursor: pointer;
    font: inherit;
    font-weight: bold;
    padding: 0;
    color: blue;
    border: 0;

    &:hover {
      opacity: 0.6;
    }
  }
`;

class Message extends React.Component<*> {
  static defaultProps = {
    delay: 750,
  };

  timeout = null;

  componentDidMount() {
    if (this.props.outcoming) {
      this.send();
    } else {
      this.props.converse.startTyping();
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
    this.props.converse.endTyping();
    this.props.converse.showNextMessage();
  };

  render() {
    const { action, ...rest } = this.props;
    const Component = action ? ActionMessage : BasicMessage;
    return (
      <Row>
        <Component {...rest} />
      </Row>
    );
  }
}

export default withConverse(Message);
