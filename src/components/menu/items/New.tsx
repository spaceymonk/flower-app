import React from 'react';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import InitialValues from '../../../config/InitialValues';
import { useProjectHelper } from '../../../hooks/useProjectHelper';
import { useSimulationContext } from '../../../providers/SimulationProvider';
import useCanvasHelper from '../../../hooks/useCanvasHelper';

export function NewMenuItem() {
  const { isRunning } = useSimulationContext();
  const { load } = useProjectHelper();
  const { fitView } = useCanvasHelper();

  function handleClick() {
    const ans = window.confirm('All changes will be lost?');
    if (ans) {
      load(InitialValues.empty());
      fitView();
      toast.info('New project created.');
    }
  }
  return (
    <NavDropdown.Item onClick={handleClick} disabled={isRunning()}>
      <FontAwesomeIcon size="sm" className="me-2" icon={faStarOfLife} /> New
    </NavDropdown.Item>
  );
}
