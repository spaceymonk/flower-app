import React from 'react';
import { useReactFlow } from 'react-flow-renderer';
import { AppContext } from '../../pages/App';

const useLoad = () => {
  const { setTitle, setInputParams } = React.useContext(AppContext);
  const { setEdges, setNodes } = useReactFlow();

  const load = React.useCallback(
    (edges, nodes, title, inputParams) => {
      setEdges(edges);
      setNodes(nodes);
      setTitle(title);
      setInputParams(inputParams);
    },
    [setEdges, setNodes, setTitle, setInputParams]
  );

  return load;
};

export default useLoad;
