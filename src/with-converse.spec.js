import React from 'react';
import { shallow } from 'enzyme';
import { withConverse } from '~/index';
import { createGraph, createNode, createEdge } from '~/graph';

describe('withConverse', () => {
  test('should inject API props', () => {
    const ComponentMock = jest.fn().mockReturnValue(<div />);
    const TestComponent = withConverse(ComponentMock);
    const context = {
      __converse: {
        startTyping: jest.fn(),
        endTyping: jest.fn(),
      },
    };
    const wrapper = shallow(<TestComponent />, { context });
    const props = wrapper.props();
    expect(props).toEqual(
      expect.objectContaining({
        showNextMessage: expect.any(Function),
        startTyping: expect.any(Function),
        endTyping: expect.any(Function),
      })
    );
  });

  test('should show next message', () => {
    const ComponentMock = jest.fn().mockReturnValue(<div />);
    const TestComponent = withConverse(ComponentMock);
    const pushPathMock = jest.fn();
    const context = {
      __converse: {
        getGraph: jest.fn(() =>
          createGraph(
            [createNode('foo'), createNode('bar'), createNode('bar')],
            [createEdge('foo', 'bar'), createEdge('bar', 'baz')]
          )
        ),
        getPath: jest.fn().mockReturnValue(['foo']),
        pushPath: pushPathMock,
      },
    };
    const wrapper = shallow(<TestComponent />, { context });
    const showNextMessage = wrapper.prop('showNextMessage');
    showNextMessage();
    expect(pushPathMock).toHaveBeenCalledWith('bar');
    showNextMessage('baz');
    expect(pushPathMock).toHaveBeenCalledWith('baz');
  });
});
