import React from 'react';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useReactFlow } from 'react-flow-renderer';
import InitialValues from '../../../config/InitialValues';
import { useProjectHelper } from '../../../hooks/useProjectHelper';

export function NewMenuItem() {
  const { load } = useProjectHelper();
  const { fitView } = useReactFlow();

  function handleClick() {
    const ans = window.confirm('All changes will be lost?');
    if (ans) {
      load(InitialValues.empty());
      fitView();
      toast.info('New project created.');
    }
  }
  return (
    <NavDropdown.Item onClick={handleClick}>
      <FontAwesomeIcon size="sm" className="me-2" icon={faStarOfLife} /> New
    </NavDropdown.Item>
  );
}
