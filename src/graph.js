// @flow
import * as React from 'react';
import invariant from 'invariant';
import type { Graph, GraphNodeId, GraphNode, GraphEdge } from '~/types';

/**
 * Creates new graph from array of react elements
 */
export function createFromElements(
  elements: Array<React.Element<typeof Step | *>>
): Graph {
  const indexBasedId = {
    index: 0,
    next() {
      return `step${++this.index}`;
    },
  };
  return (
    elements
      // Extract element's props
      .map(({ props }) => props)
      // Assign unique mark id if not set
      .map(({ mark = indexBasedId.next(), ...props }) => ({ ...props, mark }))
      // Auto set next node reference
      .map((props, index, values) => {
        const hasNextNode = index + 1 in values;
        const { next = hasNextNode ? values[index + 1].mark : null } = props;
        return { ...props, next };
      })
      // Reduce nodes to graph with nodes and edges
      .reduce(({ nodes, links }, element, index): Graph => {
        // $FlowFixMe: flow doesn't recognize these for some reason
        const { mark, next, ...props } = element;
        // Validate head node
        if (index === 0) {
          invariant(mark, 'Expected first step to have unique mark prop');
        }
        // Create new graph based on prev one
        const nextArray = Array.isArray(next) ? next : [next];
        return createGraph(
          [...nodes, createNode(mark, props)],
          nextArray
            .filter(Boolean)
            .reduce((acc, link) => [...acc, createEdge(mark, link)], links)
        );
      }, createGraph())
  );
}

/**
 * Creates new graph with predefined nodes and edges
 */
export function createGraph(
  nodes: GraphNode[] = [],
  links: GraphEdge[] = []
): Graph {
  return { nodes, links };
}

/** Creats new graph node */
export function createNode(id: GraphNodeId, value: {} = {}): GraphNode {
  return { id, value };
}

/** Creates new edge between nodes */
export function createEdge(source: GraphNodeId, target: GraphNodeId) {
  return { source, target };
}

/** Returns root node from graph */
export function getRootNodeId(graph: Graph): ?GraphNodeId {
  if (graph.nodes.length) {
    const [root] = graph.nodes;
    return root.id;
  }
  return null;
}

/** Returns node from graph by id */
export function getNode(graph: Graph, id: GraphNodeId) {
  const node = graph.nodes.find(node => node.id === id);
  invariant(node, `Node with id ${id} does't exist in graph`);
  return node;
}

/** Checks if parent have provided child by their ids */
export function hasChild(
  graph: Graph,
  parentId: GraphNodeId,
  childId: GraphNodeId
) {
  return Boolean(
    graph.links.find(
      edge => edge.source === parentId && edge.target === childId
    )
  );
}

/** Returns list of children ids for provided parent id */
export function getChildrenNodes(graph: Graph, parentId: GraphNodeId) {
  const childrenIds = graph.links
    .filter(edge => edge.source === parentId)
    .map(edge => edge.target);

  return graph.nodes.filter(node => childrenIds.includes(node.id));
}

/** Returns array of nodes by path */
export function getNodesFromPath(graph: Graph, path: GraphNodeId[]) {
  return path.reduce((result, id): GraphNode[] => {
    const child = getNode(graph, id);
    const hasParent = result.length > 0;
    const parent = hasParent && result[result.length - 1];

    // Check if requested path exist in graph
    if (parent && child) {
      invariant(
        hasChild(graph, parent.id, child.id),
        `Could not apply path to graph: node ${
          parent.id
        } does not have edge with node ${child.id}`
      );
    }

    return [...result, child];
  }, []);
}

/** Step component for declarative graph creation */
const Step = ({
  children,
}: {
  mark?: string,
  component?: React.ComponentType<*>,
  children?: any,
  next?: string,
}) => children;

export default Step;
export { Step };
