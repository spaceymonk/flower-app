import React from 'react';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from 'react-bootstrap';
import generateProjectName from 'project-name-generator';
import { toast } from 'react-toastify';
import useLoad from '../../../hooks/project/useLoad';
import { useReactFlow } from 'react-flow-renderer';

export function NewMenuItem() {
  const load = useLoad();
  const { fitView } = useReactFlow();

  function handleClick() {
    const ans = window.confirm('All changes will be lost?');
    if (ans) {
      load([], [], generateProjectName().dashed, '');
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
