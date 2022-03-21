import useLoad from './useLoad';
import React from 'react';

const useOpen = () => {
  const load = useLoad();

  const open = React.useCallback(
    (file) => {
      const fileReader = new FileReader();
      const handleFileRead = (e) => {
        const content = JSON.parse(fileReader.result);
        load(content.edges, content.nodes, content.title, content.inputParams);
      };
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    },
    [load]
  );

  return open;
};

export default useOpen;
