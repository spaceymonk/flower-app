import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useProjectHelper } from '../../../hooks/useProjectHelper';

export function DownloadMenuItem() {
  const { download } = useProjectHelper();
  function handleClick() {
    download();
    toast.info('The download should begin shortly...');
  }
  return (
    <NavDropdown.Item onClick={handleClick}>
      <FontAwesomeIcon size="sm" className="me-2" icon={faDownload} /> Download
    </NavDropdown.Item>
  );
}
