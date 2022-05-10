import React from 'react';
import { useReactFlow } from 'react-flow-renderer';
import CanvasHelperAdapter from '../adapters/CanvasHelperAdapter';
import { ICanvas } from '../types/ICanvas';

const useCanvasHelper = (): ICanvas => {
  const reactFlowInstance = useReactFlow();
  const canvasHelper: ICanvas = React.useMemo(() => new CanvasHelperAdapter(reactFlowInstance), [reactFlowInstance]);
  return canvasHelper;
};

export default useCanvasHelper;
