// @flow
import * as React from 'react';
import { object } from 'prop-types';
import { getRootNodeId, getNodesFromPath, getChildrenNodes } from '~/graph';
import type { Graph, GraphNodeId } from '~/types';
import ConverseContext from './context';

const noop = () => {};

type Props = {
  children: (history: object[], typing: boolean) => React.Element<any>,
  onChange: (path: string[]) => void,
  graph: Graph,
  // see https://github.com/babel/babel-eslint/issues/280
  // eslint-disable-next-line
  compose: <T>(message: T) => T,
  typing: boolean,
};

type State = {
  path: GraphNodeId[],
  typing: boolean,
  prefix: number,
};

class Converse extends React.PureComponent<Props, State> {
  static defaultProps = {
    onChange: noop,
    compose: (item: {}) => item,
    typing: false,
  };

  state = {
    path: [],
    typing: false,
    prefix: Date.now(),
  };

  componentWillMount() {
    if (this.state.path.length) {
      return;
    }
    // Start conversation with root node
    const rootNode = getRootNodeId(this.props.graph);
    if (rootNode) {
      this.pushPath(rootNode);
    }
  }

  notifyOnUpdate = () => this.props.onChange(this.state.path);

  getGraph = () => this.props.graph;

  getPath = () => this.state.path;

  // Add item to path
  pushPath = (item: GraphNodeId) => {
    this.setState(
      ({ path }) => ({ path: [...path, item] }),
      this.notifyOnUpdate
    );
  };

  // Pop last path item
  popPath = () => {
    this.setState(
      ({ path }) => ({ path: path.slice(0, -1) }),
      this.notifyOnUpdate
    );
  };

  // Replace last item in path
  replacePath = (item: GraphNodeId) => {
    this.setState(
      ({ path }) => ({ path: [...path.slice(0, -1), item] }),
      this.notifyOnUpdate
    );
  };

  // Reset path to initial state
  resetPath = () => {
    const rootNodeId = getRootNodeId(this.props.graph);
    this.setState(() => ({
      prefix: Date.now(),
      path: rootNodeId ? [rootNodeId] : [],
    }));
  };

  startTyping = () => {
    this.setState(() => ({ typing: true }));
  };

  endTyping = () => {
    this.setState(() => ({ typing: false }));
  };

  getTyping() {
    return this.props.typing || this.state.typing;
  }

  getHistory(): Array<{ key: React.Key }> {
    const { graph, compose } = this.props;
    const { path, prefix } = this.state;
    return getNodesFromPath(graph, path)
      .map(({ id, value }, index) => ({
        ...value,
        key: `${prefix}$${id}$${index}`,
      }))
      .map(node => compose(node));
  }

  showNextMessage = (id: ?GraphNodeId = null) => {
    const graph = this.getGraph();
    const path = this.getPath();
    // Force show node if id is provided
    if (id) {
      return this.pushPath(id);
    }
    // Get next node id
    const [next] = getChildrenNodes(graph, path[path.length - 1]);
    if (next) {
      this.pushPath(next.id);
    }
  };

  render() {
    return (
      <ConverseContext.Provider
        value={{
          getGraph: this.getGraph,
          getPath: this.getPath,
          pushPath: this.pushPath,
          popPath: this.popPath,
          replacePath: this.replacePath,
          resetPath: this.resetPath,
          startTyping: this.startTyping,
          endTyping: this.endTyping,
          showNextMessage: this.showNextMessage,
        }}
      >
        {this.props.children(this.getHistory(), this.getTyping())}
      </ConverseContext.Provider>
    );
  }
}

export default Converse;
