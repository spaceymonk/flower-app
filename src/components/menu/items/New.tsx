import React from 'react';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import InitialValues from '../../../config/InitialValues';
import { useSimulationContext } from '../../../providers/SimulationProvider';
import { useServiceContext } from '../../../providers/ServiceProvider';

export function NewMenuItem() {
  const { isRunning } = useSimulationContext();
  const { projectService, canvasFacade } = useServiceContext();

  function handleClick() {
    const ans = window.confirm('All changes will be lost?');
    if (ans) {
      projectService.load(InitialValues.empty());
      canvasFacade.fitView();
      toast.info('New project created.');
    }
  }
  return (
    <NavDropdown.Item onClick={handleClick} disabled={isRunning()}>
      <FontAwesomeIcon size="sm" className="me-2" icon={faStarOfLife} /> New
    </NavDropdown.Item>
  );
}
