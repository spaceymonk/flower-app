import React from 'react';
import { Edge, Node, OnEdgesChange, OnNodesChange } from 'react-flow-renderer';
import Block from '../model/Block';
import Connection from '../model/Connection';
import { NodeData } from './NodeData';

export type AppContextType = {
  getTitle: () => string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  getInputParams: () => string;
  setInputParams: React.Dispatch<React.SetStateAction<string>>;
  getBlocks: () => Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  getConnections: () => Connection[];
  setConnections: React.Dispatch<React.SetStateAction<Connection[]>>;
  nodesState: [Node<NodeData>[], React.Dispatch<React.SetStateAction<Node<NodeData>[]>>, OnNodesChange];
  edgesState: [Edge<any>[], React.Dispatch<React.SetStateAction<Edge<any>[]>>, OnEdgesChange];
};
