import React from 'react';
import styled from 'styled-components';
import { withConverse } from 'react-converse';
import Row from './row';

const Label = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  display: block;
  color: #666;
`;

const Input = styled.input`
  box-sizing: border-box;
  font-family: inherit;
  border: 1px solid #dedede;
  border-radius: 1rem;
  font-size: inherit;
  padding: 0.5rem 0.75rem;
  outline: none;
  width: 100%;

  &:focus {
    border-color: blue;
  }
`;

class TextReplyContainer extends React.Component<
  {
    onInput: (value: string) => void,
    validate: (value: string) => boolean,
    showNextMessage: () => void,
    label: string,
    type: string,
    value: string,
  },
  {
    sent: boolean,
  }
> {
  static defaultProps = {
    type: 'text',
    value: '',
    validate: value => typeof value === 'string' && value.trim().length > 2,
  };

  inputRef = null;
  state = {
    sent: false,
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.props.validate(this.props.value)) {
      this.setState({ sent: true });
      this.props.showNextMessage();
    }
  };

  onChange = event => {
    this.props.onInput(event.target.value);
  };

  componentDidMount() {
    if (this.inputRef) this.inputRef.focus();
  }

  render() {
    const { type, value, label } = this.props;
    return this.state.sent ? null : (
      <Row>
        <form onSubmit={this.onSubmit}>
          <label>
            <Label>{label}</Label>
            <Input
              innerRef={node => (this.inputRef = node)}
              type={type}
              value={value}
              onChange={this.onChange}
            />
          </label>
        </form>
      </Row>
    );
  }
}

export default withConverse(TextReplyContainer);
