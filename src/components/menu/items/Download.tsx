import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import LocalStorageManager from '../../../config/LocalStorageManager';
import { useServiceContext } from '../../../providers/ServiceProvider';

export function DownloadMenuItem() {
  const { projectService } = useServiceContext();
  function handleClick() {
    projectService.download(LocalStorageManager.get());
    toast.info('The download should begin shortly...');
  }
  return (
    <NavDropdown.Item onClick={handleClick}>
      <FontAwesomeIcon size="sm" className="me-2" icon={faDownload} /> Download
    </NavDropdown.Item>
  );
}
