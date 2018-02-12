// @flow
import * as React from 'react';
import { object } from 'prop-types';
import { getRootNodeId, getNodesFromPath } from '~/graph';
import type { Graph, GraphNodeId, ConverseContext } from '~/types';

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
};

/**
 * Conversation container provider
 */
class Converse extends React.PureComponent<Props, State> {
  static childContextTypes = {
    __converse: object,
  };

  static defaultProps = {
    onChange: noop,
    compose: (item: {}) => item,
    typing: false,
  };

  state = {
    path: [],
    typing: false,
  };

  getChildContext(): { __converse: ConverseContext } {
    return {
      __converse: {
        getGraph: this.getGraph,
        getPath: this.getPath,
        pushPath: this.push,
        popPath: this.pop,
        replacePath: this.replace,
        startTyping: this.startTyping,
        endTyping: this.endTyping,
      },
    };
  }

  componentWillMount() {
    if (this.state.path.length) return;
    // Start conversation with root node
    const rootNode = getRootNodeId(this.props.graph);
    if (rootNode) this.push(rootNode);
  }

  /** @private */
  notifyOnUpdate = () => this.props.onChange(this.state.path);

  /** @private */
  getGraph = () => this.props.graph;

  /** @private */
  getPath = () => this.state.path;

  // Add item to path
  push = (item: GraphNodeId) => {
    this.setState(
      ({ path }) => ({ path: [...path, item] }),
      this.notifyOnUpdate
    );
  };

  // Pop last path item
  pop = () => {
    this.setState(
      ({ path }) => ({ path: path.slice(0, -1) }),
      this.notifyOnUpdate
    );
  };

  // Replace last item in path
  replace = (item: GraphNodeId) => {
    this.setState(
      ({ path }) => ({ path: [...path.slice(0, -1), item] }),
      this.notifyOnUpdate
    );
  };

  startTyping = () => {
    this.setState(() => ({ typing: true }));
  };

  endTyping = () => {
    this.setState(() => ({ typing: false }));
  };

  getTyping = () => this.props.typing || this.state.typing;

  getHistory(): Array<{ key: React.Key }> {
    const { graph, compose } = this.props;
    const { path } = this.state;
    return getNodesFromPath(graph, path)
      .map(({ id, value }, index) => ({ ...value, key: `${id}$${index}` }))
      .map(node => compose(node));
  }

  render() {
    return React.Children.only(
      this.props.children(this.getHistory(), this.getTyping())
    );
  }
}

export default Converse;
