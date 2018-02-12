import * as React from 'react';
import { Graph, GraphNode, HistoryItem } from './graph';

// Prop types
export interface ConverseProps<T> {
  graph: Graph;
  children: (
    history: Array<HistoryItem>,
    typing: boolean
  ) => React.ReactElement<any>;
  compose?: (message: object) => object;
  onChange?: (path: Array<string>) => void;
  typing?: boolean;
}
export interface StepComponentProps<T> {
  mark?: string;
  [key: string]: any;
}

// Component types
export type ConverseComponent<T> = React.ComponentClass<
  ConverseProps<T>
>;
export type StepComponent<T> = React.ComponentType<StepComponentProps<T>>;

// Components
export const Converse: ConverseComponent<object>;
export const Step: StepComponent<object>;
