import * as React from 'react';
import { Graph, GraphNode, HistoryItem } from './graph';

// Prop types
export interface ConverseProviderProps<T> {
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
export type ConverseProviderComponent<T> = React.ComponentClass<
  ConverseProviderProps<T>
>;
export type StepComponent<T> = React.ComponentType<StepComponentProps<T>>;

// Components
export const ConverseProvider: ConverseProviderComponent<object>;
export const Step: StepComponent<object>;
