// @flow
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { object } from 'prop-types';
import { getChildrenNodes } from '~/graph';
import type { GraphNodeId, ConverseContext } from '~/types';

type ConversationProps = {
  showNextMessage: (key?: string) => void,
  startTyping: () => void,
  endTyping: () => void,
};

/**
 * withConversation higher-order component for connecting internal state
 * with chat history message component
 */
export default function withConverse<Props: {}>(
  BaseComponent: React.ComponentType<ConversationProps & Props>
): React.ComponentType<Props> {
  const displayName =
    BaseComponent.displayName || BaseComponent.name || 'Component';

  class WithConversation extends React.Component<Props> {
    static displayName = `withConversation(${displayName})`;

    static contextTypes = {
      __converse: object.isRequired,
    };

    showNextMessage = (id: ?GraphNodeId = null) => {
      const converse: ConverseContext = this.context.__converse;
      const graph = converse.getGraph();
      const path = converse.getPath();
      // Force show node if id is provided
      if (id) return converse.pushPath(id);
      // Get next node id
      const [next] = getChildrenNodes(graph, path[path.length - 1]);
      if (next) converse.pushPath(next.id);
    };

    render() {
      const originalProps = this.props;
      const converse: ConverseContext = this.context.__converse;
      const injectedProps = {
        showNextMessage: this.showNextMessage,
        startTyping: converse.startTyping,
        endTyping: converse.endTyping,
      };
      return <BaseComponent {...originalProps} {...injectedProps} />;
    }
  }

  return hoistStatics(WithConversation, BaseComponent);
}
