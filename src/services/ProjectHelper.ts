import { ProjectData } from '../types';
import { throwErrorIfNull } from '../util';
import { ProjectDataSchema } from '../config/ProjectDataValidation';
import { toast } from 'react-toastify';

/* -------------------------------------------------------------------------- */
/*                                    open                                    */
/* -------------------------------------------------------------------------- */
export const open = (file: Blob, onOpen?: (content: ProjectData) => void) => {
  const fileReader = new FileReader();
  const handleFileRead = () => {
    try {
      const content: ProjectData = JSON.parse(throwErrorIfNull(fileReader.result));
      const result = ProjectDataSchema.validate(content);
      if (result.error) {
        throw new Error(result.error.message);
      }
      if (onOpen) onOpen(content);
    } catch (e: any) {
      toast.error('Invalid project file: ' + e.message);
    }
  };
  fileReader.onloadend = handleFileRead;
  fileReader.readAsText(file);
};
