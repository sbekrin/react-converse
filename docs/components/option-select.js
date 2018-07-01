/* eslint no-unused-vars: "off" */
import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { withConverse, ConverseContext } from 'react-converse';
import Row from './row';

const Option = styled.button`
  font-family: inherit;
  font-size: 1rem;
  background-color: transparent;
  margin-right: 0.5rem;
  margin-top: 1rem;
  color: blue;
  font-weight: bold;
  border: none;
  transition: color 100ms ease;
  line-height: 1;
  cursor: pointer;

  &:hover {
    color: dodgerblue;
  }
`;

/*
type Props = {
  converse: typeof ConverseContext,
  options: {},
  onSelect: (option: string) => {},
};

type State = {
  selected: boolean,
};
*/

class SelectReply extends React.Component<Props, State> {
  static propTypes = {
    options: object.isRequired,
  };

  state = {
    selected: false,
  };

  onSelect(key) {
    this.setState({ selected: true });
    // Call onSelect callback if provided, or show next selected key
    if (this.props.onSelect) {
      this.props.onSelect(key);
      this.props.converse.showNextMessage();
    } else {
      this.props.converse.showNextMessage(key);
    }
  }

  renderOption(key, label) {
    return (
      <Option key={key} onClick={() => this.onSelect(key)}>
        {label}
      </Option>
    );
  }

  render() {
    const { options, converse, ...props } = this.props;
    return this.state.selected ? null : (
      <Row>
        <div {...props}>
          {Object.keys(options).map(key =>
            this.renderOption(key, options[key])
          )}
        </div>
      </Row>
    );
  }
}

export default withConverse(SelectReply);
