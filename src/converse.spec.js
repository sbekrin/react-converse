import React from 'react';
import { mount } from 'enzyme';
import { Converse, ConverseContext } from '~/index';
import { createGraph, createNode, createEdge } from '~/graph';

// https://github.com/airbnb/enzyme/issues/1509#issuecomment-401207909
jest.mock('react', () => {
  const originalReact = require.requireActual('react');
  return {
    ...originalReact,
    createContext: require.requireActual('create-react-context').default,
  };
});

const createProviderMocks = (
  graph,
  child = jest.fn().mockReturnValue(<div />)
) => {
  const DummyComponentMock = child;
  const renderPropMock = jest.fn(history => <DummyComponentMock />);
  const wrapper = mount(<Converse graph={graph}>{renderPropMock}</Converse>);
  return { DummyComponentMock, renderPropMock, wrapper };
};

describe('<Converse />', () => {
  afterAll(() => {
    jest.unmock('react');
  });

  it('calls render prop', () => {
    const { renderPropMock } = createProviderMocks(
      createGraph([createNode('foo')], [])
    );
    expect(renderPropMock).toHaveBeenCalledWith(
      [{ key: expect.any(String) }],
      false
    );
  });

  it('provides a context', () => {
    const mockedChild = jest.fn().mockReturnValue(<div />);
    createProviderMocks(createGraph([createNode('foo')], []), () => (
      <ConverseContext.Consumer>{mockedChild}</ConverseContext.Consumer>
    ));
    expect(mockedChild).toHaveBeenCalledWith(
      expect.objectContaining({
        getGraph: expect.any(Function),
        getPath: expect.any(Function),
        pushPath: expect.any(Function),
        popPath: expect.any(Function),
        replacePath: expect.any(Function),
        startTyping: expect.any(Function),
        endTyping: expect.any(Function),
      })
    );
  });

  it('reflects api calls in state', () => {
    const { wrapper } = createProviderMocks(
      createGraph(
        [createNode('foo'), createNode('bar'), createNode('baz')],
        [createEdge('foo', 'bar'), createEdge('foo', 'baz')]
      )
    );
    const instance = wrapper.instance();
    instance.pushPath('bar');
    expect(wrapper.state().path).toEqual(['foo', 'bar']);
    instance.popPath();
    expect(wrapper.state().path).toEqual(['foo']);
    instance.pushPath('bar');
    instance.replacePath('baz');
    expect(wrapper.state().path).toEqual(['foo', 'baz']);
    instance.startTyping();
    expect(wrapper.state().typing).toEqual(true);
    instance.endTyping();
    expect(wrapper.state().typing).toEqual(false);
    instance.resetPath();
    expect(wrapper.state().path).toEqual(['foo']);
    instance.showNextMessage();
    expect(wrapper.state().path).toEqual(['foo', 'bar']);
    instance.popPath();
    instance.showNextMessage('baz');
    expect(wrapper.state().path).toEqual(['foo', 'baz']);
  });
});
