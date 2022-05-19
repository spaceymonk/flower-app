import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useServiceContext } from '../../../providers/ServiceProvider';
import { useSimulationContext } from '../../../providers/SimulationProvider';

export function SaveMenuItem() {
  const { isRunning } = useSimulationContext();
  const { projectService } = useServiceContext();

  function handleClick() {
    try {
      projectService.save(projectService.snapshot());
      toast.success('Changes saved!');
    } catch (e: any) {
      toast.error('Something went wrong! ' + e.message);
    }
  }
  return (
    <NavDropdown.Item onClick={handleClick} disabled={isRunning()}>
      <FontAwesomeIcon size="sm" className="me-2" icon={faSave} /> Save
    </NavDropdown.Item>
  );
}
