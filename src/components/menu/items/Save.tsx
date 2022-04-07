import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useProjectHelper } from '../../../hooks/useProjectHelper';

export function SaveMenuItem() {
  const { save } = useProjectHelper();

  function handleClick() {
    try {
      save();
      toast.success('Changes saved!');
    } catch (e: any) {
      toast.error('Something went wrong! ' + e.message);
    }
  }
  return (
    <NavDropdown.Item onClick={handleClick}>
      <FontAwesomeIcon size="sm" className="me-2" icon={faSave} /> Save
    </NavDropdown.Item>
  );
}