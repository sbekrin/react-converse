// @flow
export type GraphNodeId = string;

export type GraphNode = {|
  +id: GraphNodeId,
  +value: {},
|};

export type GraphEdge = {|
  +source: GraphNodeId,
  +target: GraphNodeId,
|};

export type Graph = {|
  +nodes: GraphNode[],
  +links: GraphEdge[],
|};

export type ConverseContext = {|
  getGraph: () => Graph,
  getPath: () => GraphNodeId[],
  pushPath: (id: GraphNodeId) => void,
  popPath: () => void,
  replacePath: (id: GraphNodeId) => void,
  startTyping: () => void,
  endTyping: () => void,
|};
