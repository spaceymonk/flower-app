import React from 'react';

const usePaneLockToggle = () => {
  const [nodesDraggable, setNodesDraggable] = React.useState(true);
  const [nodesConnectable, setNodesConnectable] = React.useState(true);
  const [elementsSelectable, setElementsSelectable] = React.useState(true);

  const [paneLocked, setPaneLocked] = React.useState(false);

  const togglePaneLock = () => {
    const lock = (b: boolean) => {
      setNodesDraggable(!b);
      setNodesConnectable(!b);
      setElementsSelectable(!b);
      setPaneLocked(b);
    };

    lock(!paneLocked);
  };

  return {
    paneLocked,
    togglePaneLock,
    paneLockProps: { nodesDraggable, nodesConnectable, elementsSelectable },
  };
};

export default usePaneLockToggle;
