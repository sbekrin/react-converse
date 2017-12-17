/* eslint react/jsx-key: "off" */
import React from 'react';
import {
  createGraph,
  createNode,
  createEdge,
  getRootNodeId,
  getNode,
  hasChild,
  getChildrenNodes,
  getNodesFromPath,
  Step,
  createFromElements,
} from '~/graph';

describe('Graph', () => {
  test('createGraph', () => {
    expect(createGraph()).toEqual({
      nodes: [],
      links: [],
    });
  });

  test('createNode', () => {
    expect(createNode('foo', { bar: 42 })).toEqual({
      id: 'foo',
      value: {
        bar: 42,
      },
    });
  });

  test('createEdge', () => {
    expect(createEdge('foo', 'bar')).toEqual({
      source: 'foo',
      target: 'bar',
    });
  });

  test('getRootNodeId', () => {
    const graph = createGraph([createNode('foo', {})], []);
    expect(getRootNodeId(graph)).toEqual('foo');
  });

  test('getNode', () => {
    const graph = createGraph([createNode('foo', {})], []);
    expect(getNode(graph, 'foo')).toEqual({
      id: 'foo',
      value: {},
    });
  });

  test('hasChild', () => {
    const graph = createGraph(
      [createNode('foo', {}), createNode('bar', {})],
      [createEdge('foo', 'bar')]
    );
    expect(hasChild(graph, 'foo', 'bar')).toEqual(true);
  });

  test('getChildrenNodes', () => {
    const graph = createGraph(
      [createNode('foo', {}), createNode('bar', {}), createNode('baz', {})],
      [createEdge('foo', 'bar'), createEdge('foo', 'baz')]
    );
    expect(getChildrenNodes(graph, 'foo')).toEqual([
      { id: 'bar', value: {} },
      { id: 'baz', value: {} },
    ]);
  });

  test('getNodesFromPath', () => {
    const graph = createGraph(
      [createNode('foo', {}), createNode('bar', {}), createNode('baz', {})],
      [createEdge('foo', 'bar'), createEdge('bar', 'baz')]
    );
    expect(getNodesFromPath(graph, ['foo', 'bar', 'baz'])).toEqual([
      { id: 'foo', value: {} },
      { id: 'bar', value: {} },
      { id: 'baz', value: {} },
    ]);
  });

  test('createFromElements', () => {
    const graph = createFromElements([
      <Step mark="root">Hi</Step>,
      <Step>Ho</Step>,
      <Step>Ha</Step>,
    ]);
    expect(graph).toMatchObject(
      createGraph(
        [
          createNode('root', { children: 'Hi' }),
          createNode(expect.any(String), { children: 'Ho' }),
          createNode(expect.any(String), { children: 'Ha' }),
        ],
        [
          createEdge('root', expect.any(String)),
          createEdge(expect.any(String), expect.any(String)),
        ]
      )
    );
  });
});
