import useLoad from './useLoad';
import React from 'react';
import { ProjectData } from '../../types';
import { throwErrorIfNull } from '../../services/common';
import { ProjectDataSchema } from '../../config/ProjectDataValidation';
import { toast } from 'react-toastify';

const useOpen = () => {
  const load = useLoad();

  const open = React.useCallback(
    (file) => {
      const fileReader = new FileReader();
      const handleFileRead = () => {
        try {
          const content: ProjectData = JSON.parse(throwErrorIfNull(fileReader.result));
          const result = ProjectDataSchema.validate(content);
          if (result.error) {
            throw new Error(result.error.message);
          }
          load(content);
        } catch (e: any) {
          toast.error('Invalid project file: ' + e.message);
        }
      };
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    },
    [load]
  );

  return open;
};

export default useOpen;
