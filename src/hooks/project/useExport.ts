import FileSaver from 'file-saver';
import React from 'react';
import { useAppContext } from '../../providers/AppProvider';
import { throwErrorIfNull } from '../../services/common';
import domtoimage from 'dom-to-image';

const useExport = () => {
  const { getTitle } = useAppContext();

  const toPNG = React.useCallback(async () => {
    const blob = await domtoimage.toBlob(throwErrorIfNull(document.getElementById('board')), { bgcolor: '#fff' });
    FileSaver.saveAs(blob, getTitle() + '.png');
  }, [getTitle]);

  return {
    toPNG,
  };
};

export default useExport;
