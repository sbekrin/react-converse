// @flow
import createContext from 'create-react-context';

function throwNoContext(...args) {
  throw new Error(
    'No `Converse` provider was not found. Make sure to wrap root of your App with it.'
  );
}

const ConverseContext = createContext({
  getGraph: throwNoContext,
  getPath: throwNoContext,
  pushPath: throwNoContext,
  popPath: throwNoContext,
  replacePath: throwNoContext,
  resetPath: throwNoContext,
  startTyping: throwNoContext,
  endTyping: throwNoContext,
  showNextMessage: throwNoContext,
});

export default ConverseContext;
