// @flow
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import ConverseContext from './context';

export default function withConverse<Props: {}>(
  BaseComponent: React.ComponentType<typeof ConverseContext & Props>
): React.ComponentType<Props> {
  const displayName =
    BaseComponent.displayName || BaseComponent.name || 'Component';

  const WithConverse = props => (
    <ConverseContext.Consumer>
      {converse => <BaseComponent {...props} converse={converse} />}
    </ConverseContext.Consumer>
  );

  WithConverse.displayName = `withConverse(${displayName})`;

  return hoistStatics(WithConverse, BaseComponent);
}
