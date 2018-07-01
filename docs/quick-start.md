Install react-converse:

```sh
yarn add react-converse
```

Define _Message_, _Container_, and _Indiciator_ components and provide some
data:

```js static
import { Converse, withConverse } from 'react-converse';
import { createGraph, createNode, createEdge } from 'react-converse/graph';

// Primary message component
const Message = withConverse(
  class extends React.Component {
    componentWillMount() {
      const send = () => {
        this.props.converse.endTyping();
        this.props.converse.showNextMessage();
      };
      // Display outcoming message immediately
      if (this.props.outcoming) {
        send();
        return;
      }
      // Delay sending message by 750ms
      this.props.converse.startTyping();
      this.timeout = setTimeout(send, 750);
    }

    componentWillUnmount() {
      // Cleanup delay timeout
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    }

    render() {
      return (
        <div style={{ textAlign: this.props.outcoming ? 'right' : 'left' }}>
          {this.props.children}
        </div>
      );
    }
  }
);

// Container for history
const Container = ({ children }) => (
  <div
    style={{
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '10px',
      padding: '15px',
      border: '1px solid #ddd',
      maxWidth: '200px',
    }}
  >
    {children}
  </div>
);

// Typing indicator
const Indicator = () => <div>&hellip;</div>;

// This is low-level api which you can use to convert data from any format
const data = createGraph(
  [
    createNode('first-message', { children: 'oh hi!' }),
    createNode('second-message', { children: 'whatsup', outcoming: true }),
    createNode('third-message', { children: 'whatcha doin?' }),
  ],
  [
    createEdge('first-message', 'second-message'),
    createEdge('second-message', 'third-message'),
  ]
);

// Put everything together!
<Converse graph={data}>
  {(history, typing) => (
    <Container>
      {history.map(props => <Message {...props} />)}
      {typing && <Indicator />}
    </Container>
  )}
</Converse>;
```
