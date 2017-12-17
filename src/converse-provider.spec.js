import React from 'react';
import { mount } from 'enzyme';
import { object } from 'prop-types';
import { ConverseProvider } from '~/index';
import { createGraph, createNode, createEdge } from '~/graph';

const createProviderMocks = graph => {
  const DummyComponentMock = jest.fn().mockReturnValue(<div />);
  DummyComponentMock.contextTypes = { __converse: object.isRequired };
  const renderPropMock = jest.fn(history => <DummyComponentMock />);
  const wrapper = mount(
    <ConverseProvider graph={graph}>{renderPropMock}</ConverseProvider>
  );
  return { DummyComponentMock, renderPropMock, wrapper };
};

describe('ConverseProvider', () => {
  test('calls render prop', () => {
    const { renderPropMock } = createProviderMocks(
      createGraph([createNode('foo')], [])
    );
    expect(renderPropMock).toHaveBeenCalledWith([{ key: 'foo$0' }], false);
  });

  test('provides a context', () => {
    const { DummyComponentMock } = createProviderMocks(
      createGraph([createNode('foo')], [])
    );
    expect(DummyComponentMock).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        __converse: {
          getGraph: expect.any(Function),
          getPath: expect.any(Function),
          pushPath: expect.any(Function),
          popPath: expect.any(Function),
          replacePath: expect.any(Function),
          startTyping: expect.any(Function),
          endTyping: expect.any(Function),
        },
      })
    );
  });

  test('reflects api calls in state', () => {
    const { wrapper } = createProviderMocks(
      createGraph(
        [createNode('foo'), createNode('bar'), createNode('baz')],
        [createEdge('foo', 'bar'), createEdge('foo', 'baz')]
      )
    );
    const instance = wrapper.instance();
    instance.push('bar');
    expect(wrapper.state().path).toEqual(['foo', 'bar']);
    instance.pop();
    expect(wrapper.state().path).toEqual(['foo']);
    instance.push('bar');
    instance.replace('baz');
    expect(wrapper.state().path).toEqual(['foo', 'baz']);
    instance.startTyping();
    expect(wrapper.state().typing).toEqual(true);
    instance.endTyping();
    expect(wrapper.state().typing).toEqual(false);
  });
});
