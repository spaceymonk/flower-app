import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { AppContext } from '../../../pages/App';
import { ProjectService } from '../../../services/ProjectService';
import { toast } from 'react-toastify';

export function DownloadMenuItem() {
  const { getTitle, getInputParams } = React.useContext(AppContext);

  function handleClick() {
    ProjectService.download({
      title: getTitle(),
      inputParams: getInputParams(),
    });
    toast.info('The download should begin shortly...');
  }
  return (
    <NavDropdown.Item onClick={handleClick}>
      <FontAwesomeIcon size="sm" className="me-2" icon={faDownload} /> Download
    </NavDropdown.Item>
  );
}
