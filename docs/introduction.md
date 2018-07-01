**react-converse** _or just Converse_, is a module for creating chatbot-like
interaction based on data in graph format. It solves data and UI separation
great being small, flexible, and customizable.

If you're looking for complete solution with predefined basic components and
theming, checkout
[react-converse-essentials](https://github.com/react-converse/react-converse-essentials)
for zero-configuration solution.

```js { "props": { "style": { "height": 265 } } }
// Tell react-converse how to render your conversation
const Chat = ({ children }) => (
  <Converse graph={createFromElements(children)}>
    {(history, typing) => (
      <Container>
        {history.map(props => <Message {...props} />)}
        {typing && <Indicator />}
      </Container>
    )}
  </Converse>
);

// Add some simple action for an example
const Reply = withConverse(({ converse, ...rest }) => (
  <button {...rest} onClick={converse.resetPath} />
));

// Provide data to your conversation
<Chat>
  <Step mark="start">omg hi</Step>
  <Step>look at dis</Step>
  <Step>so declarative</Step>
  <Step>much react</Step>
  <Step outcoming>wow</Step>
  <Step outcoming action>
    <Reply>🔁Restart</Reply>
  </Step>
</Chat>;
```
