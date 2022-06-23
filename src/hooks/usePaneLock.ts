import React from 'react';
import { useServiceContext } from '../providers/ServiceProvider';
import { useSimulationContext } from '../providers/SimulationProvider';
import { GlowTypes } from '../types';

const usePaneLock = () => {
  const { isRunning } = useSimulationContext();
  const { blockService, connectionService } = useServiceContext();

  const [nodesDraggable, setNodesDraggable] = React.useState(true);
  const [nodesConnectable, setNodesConnectable] = React.useState(true);
  const [elementsSelectable, setElementsSelectable] = React.useState(true);

  const onPaneClick = React.useCallback(() => {
    if (!isRunning()) {
      blockService.highlight(null, GlowTypes.NONE); // clear highlighs
      connectionService.highlightByBlockId(null, GlowTypes.NONE);
    }
  }, [blockService, connectionService, isRunning]);

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
