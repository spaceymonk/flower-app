import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { AppContext } from '../../../pages/App';
import { ProjectService } from '../../../services/ProjectService';

export function SaveMenuItem() {
  const {showToast} = React.useContext(AppContext);
  function handleClick() {
    ProjectService.save(()=>showToast({title:'Changes Saved!'}));
  }
  return (
    <NavDropdown.Item onClick={handleClick}>
      <FontAwesomeIcon size="sm" className="me-2" icon={faSave} /> Save
    </NavDropdown.Item>
  );
}
