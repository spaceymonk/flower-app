import useLoad from './useLoad';
import React from 'react';
import { ProjectData } from '../../types';
import { throwErrorIfNull } from '../../services/common';
import { ProjectDataSchema } from '../../config/ProjectDataValidation';

const useOpen = () => {
  const load = useLoad();

  const open = React.useCallback(
    (file) => {
      const fileReader = new FileReader();
      const handleFileRead = () => {
        const content: ProjectData = JSON.parse(throwErrorIfNull(fileReader.result));
        ProjectDataSchema.validate(content);
        load(content);
      };
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    },
    [load]
  );

  return open;
};

export default useOpen;
