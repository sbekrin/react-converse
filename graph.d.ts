// Basic types
export type GraphNodeId = string;

export type HistoryItem = {
  key: string;
  [key: string]: any;
};

export interface Graph {
  nodes: Array<GraphNode>;
  edges: Array<GraphEdge>;
}

export interface GraphNode {
  id: GraphNodeId;
  value: HistoryItem;
}

export interface GraphEdge {
  source: GraphNodeId;
  target: GraphNodeId;
}

// Low-level functions
export function createGraph(
  nodes: Array<GraphNode>,
  edges: Array<GraphEdge>
): Graph;
