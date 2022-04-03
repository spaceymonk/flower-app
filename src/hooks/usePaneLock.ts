import React from 'react';
import { useSimulationContext } from '../providers/SimulationProvider';
import useBlockService from './service/useBlockService';

const usePaneLock = () => {
  const { isRunning } = useSimulationContext();
  const { highlightBlocks } = useBlockService();

  const [nodesDraggable, setNodesDraggable] = React.useState(true);
  const [nodesConnectable, setNodesConnectable] = React.useState(true);
  const [elementsSelectable, setElementsSelectable] = React.useState(true);

  const onPaneClick = React.useCallback(() => {
    if (!isRunning()) {
      highlightBlocks(null); // clear highlighs
    }
  }, [highlightBlocks, isRunning]);

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
