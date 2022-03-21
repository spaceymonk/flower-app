import React from 'react';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from 'react-bootstrap';
import { BlockService } from '../../../services/BlockService';
import generateProjectName from 'project-name-generator';
import { toast } from 'react-toastify';
import useLoad from '../../../hooks/project/useLoad';

export function NewMenuItem() {
  const load = useLoad();

  function handleClick() {
    const ans = window.confirm('All changes will be lost?');
    if (ans) {
      load([], [], generateProjectName().dashed, '');
      BlockService.instance().fitView();
      toast.info('New project created.');
    }
  }
  return (
    <NavDropdown.Item onClick={handleClick}>
      <FontAwesomeIcon size="sm" className="me-2" icon={faStarOfLife} /> New
    </NavDropdown.Item>
  );
}
