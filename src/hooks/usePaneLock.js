import React from 'react';
import { SimulationContext } from '../providers/SimulationProvider';
import useBlockService from './service/useBlockService';

const usePaneLock = () => {
  const { isRunning } = React.useContext(SimulationContext);
  const { highlightNode } = useBlockService();

  const [nodesDraggable, setNodesDraggable] = React.useState(true);
  const [nodesConnectable, setNodesConnectable] = React.useState(true);
  const [elementsSelectable, setElementsSelectable] = React.useState(true);

  const onPaneClick = React.useCallback(() => {
    if (!isRunning()) {
      highlightNode(); // clear highlighs
    }
  }, [highlightNode, isRunning]);

  React.useEffect(() => {
    if (isRunning()) {
      setNodesDraggable(false);
      setNodesConnectable(false);
      setElementsSelectable(false);
    } else {
      setNodesDraggable(true);
      setNodesConnectable(true);
      setElementsSelectable(true);
    }
  }, [isRunning]);

  return { nodesConnectable, nodesDraggable, elementsSelectable, onPaneClick };
};

export default usePaneLock;
