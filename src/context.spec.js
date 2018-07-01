import React from 'react';
import { mount } from 'enzyme';
import { ConverseContext } from '~/index';

// https://github.com/airbnb/enzyme/issues/1509#issuecomment-401207909
jest.mock('react', () => {
  const originalReact = require.requireActual('react');
  return {
    ...originalReact,
    createContext: require.requireActual('create-react-context').default,
  };
});

describe('ConverseContext', () => {
  it('throws without provider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      mount(
        <ConverseContext.Consumer>
          {converse => converse.startTyping() && <div />}
        </ConverseContext.Consumer>
      )
    ).toThrowErrorMatchingSnapshot();
    console.error.mockReset();
  });
});
