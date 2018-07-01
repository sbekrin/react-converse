### `<Converse />`

```js static
import { Converse } from 'react-converse';
```

Component for orchestration internal state and keeping data separate from
representation.

**Props:**

| Prop     | Type                                                         | Description                                                                                                                                                                                               |
| -------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children | `(history: object[], typing: boolean) => React.Element<any>` | Render prop for rendering conversation history. Provided function would be called with first argument of array of objects containing step data, second argument is a flag for displaing typing indicator. |
| graph    | `Graph`                                                      | Data graph which conversation is based on. You can re-create that graph (e.g. to update user-provided data), just don't forget to keep unique ids assigned for each node.                                 |
| onChange | <code>(path:&nbsp;string[])&nbsp;=>&nbsp;void</code>         | _(Optional)_ Callback for path changes within the data graph. You can use it to remember current state and restore conversation later or save it somewhere.                                               |
| compose  | <code><T>(item:&nbsp;T)&nbsp;=>&nbsp;T</code>                | _(Optional)_ Function to map each graph node object. You can use it to deserialize data from backend or assign default props. By default each node passed as-is.                                          |
| typing   | `boolean`                                                    | _(Optional)_ Flag to force display typing indicator. You can use it to display typing while loading data or processing something. Note that falsy values would be overwritten by internal state.          |

**Example:**

```js static
import { Converse } from 'react-converse';

const Chat = data => (
  <Converse graph={data}>
    {history => (
      <ul className="chat">
        {history.map(item => (
          <li className="message" key={item.key}>
            {item.message}
          </li>
        ))}
      </ul>
    )}
  </Converse>
);
```

<br />
<br />
<br />

### `withConverse(BaseComponent)`

```js static
import { withConverse } from 'react-converse';
```

Higher-order component to access Converse API.

**Arguments:**

| Name          | Type                   | Description                |
| ------------- | ---------------------- | -------------------------- |
| BaseComponent | `React.Component<any>` | React component to extends |

**Injected Props:**

| Name     | Type                                  | Description      |
| -------- | ------------------------------------- | ---------------- |
| converse | [`ConverseContext`](#conversecontext) | Converse context |

**Returns:**

```js static
React.ComponentClass<any>
```

<br />
<br />
<br />

<a name="create-graph"></a>

### `createGraph(nodes, edges)`

```js static
import { createGraph } from 'react-converse/graph';
```

Creates new graph with prodived arrays of nodes and edges.

**Arguments:**

| Name  | Type                                          | Description                                                                                      |
| ----- | --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| nodes | <code>Array<[GraphNode](#create-node)></code> | Array of nodes. Each node **should** contain unique `id` prop. `value` prop should be an object. |
| links | <code>Array<[GraphEdge](#create-edge)></code> | Array of links. `source` and `target` props represents `id`s of target node.                     |

**Returns:**

```js static
{
  nodes: [],
  edges: [],
}
```

<br />
<br />
<br />

<a name="create-node"></a>

### `createNode(id, value)`

```js static
import { createNode } from 'react-converse/graph';
```

Creates new node with uniqe id and value.

**Arguments:**

| Name  | Type     | Description                                                           |
| ----- | -------- | --------------------------------------------------------------------- |
| id    | `string` | Unqiue node id. It will be used when changing conversation state.     |
| value | `object` | Node value. It can have any structure which suits your case the best. |

**Returns:**

```js static
{
  id: string,
  value: object,
}
```

<br />
<br />
<br />

<a name="create-edge"></a>

### `createEdge(source, target)`

```js static
import { createEdge } from 'react-converse/graph';
```

Creats new edge between two nodes.

**Arguments:**

| Name   | Type     | Description     |
| ------ | -------- | --------------- |
| source | `string` | Source node id. |
| target | `string` | Target node id. |

**Returns:**

```js static
{
  source: string,
  target: string,
}
```

<br />
<br />
<br />

<a name="graph-step"></a>

### `<Step />`

```js static
import { Step } from 'react-converse/graph';
```

Component for declarative graph data definition. First node **should** have an
unique id set.

**Props:**

| Name  | Type     | Description                                                                            |
| ----- | -------- | -------------------------------------------------------------------------------------- |
| mark  | `string` | Unqiue node id. It will be transformed to id and used for internal state manipulation. |
| value | `object` | Node value. It can have any structure which suits your case the best.                  |

**Example:**

```js static
const graph = createFromElements([
  <Step mark="start">hello</Step>,
  <Step>there</Step>,
]);
```

<br />
<br />
<br />

<a name="create-from-elements"></a>

### `createFromElements(elements)`

```js static
import { createFromElements } from 'react-converse/graph';
```

Creats new Graph based on array of React Elements.

**Arguments:**

| Name     | Type                                                   | Description               |
| -------- | ------------------------------------------------------ | ------------------------- |
| elements | <code>Array<React.Element<[Step](#graph-step)>></code> | Array of Step components. |

**Returns:**

<code>[Graph](#create-graph)</code>

## Types

### `ConverseContext`

| Name            | Type                    | Description                                |
| --------------- | ----------------------- | ------------------------------------------ |
| getGraph        | `() => void`            | Returns current graph data                 |
| getPath         | `() => void`            | Returns current path in graph              |
| pushPath        | `(node: Node) => void`  | Adds new node to path                      |
| popPath         | `() => void`            | Removes last item from path                |
| replacePath     | `(id: string) => void`  | Replaces current message with new one      |
| resetPath       | `() => void`            | Resets whole conversation to the beginning |
| startTyping     | `() => void`            | Enables typing indicator                   |
| endTyping       | `() => void`            | Disables typing indicator                  |
| showNextMessage | `(id: ?string) => void` | Shows next or desired message by id        |
