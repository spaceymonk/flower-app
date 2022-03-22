import React from 'react';
import { AppContext } from '../../providers/AppProvider';

const useLoad = () => {
  const { setTitle, setInputParams,setEdges, setNodes } = React.useContext(AppContext);

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
