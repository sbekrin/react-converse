import { Converse } from 'react-converse';
import { createFromElements, Step } from 'react-converse/graph';
import Container from './components/container';
import Row from './components/row';
import Indicator from './components/indicator';
import Message from './components/message';

global.Converse = Converse;
global.createFromElements = createFromElements;
global.Step = Step;
global.Container = Container;
global.Row = Row;
global.Indicator = Indicator;
global.Message = Message;
