import React from 'react';
import { mount } from 'enzyme';
import { withConverse } from '~/index';

// https://github.com/airbnb/enzyme/issues/1509#issuecomment-401207909
jest.mock('react', () => {
  const originalReact = require.requireActual('react');
  return {
    ...originalReact,
    createContext: require.requireActual('create-react-context').default,
  };
});

describe('withConverse', () => {
  it('injects API props', () => {
    const ComponentMock = jest.fn().mockReturnValue(<div />);
    const TestComponent = withConverse(ComponentMock);
    mount(<TestComponent />);
    expect(ComponentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        converse: expect.any(Object),
      }),
      expect.any(Object)
    );
  });

  it('wraps `displayName`', () => {
    const ComponentMock = () => <div />;
    ComponentMock.displayName = 'Mock';
    const TestComponent = withConverse(ComponentMock);
    expect(TestComponent.displayName).toMatchSnapshot();
  });
});
