import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { AppContext } from '../../../pages/App';
import { ProjectService } from '../../../services/ProjectService';
import { toast } from 'react-toastify';

export function SaveMenuItem() {
  const { getTitle, getInputParams } = React.useContext(AppContext);
  function handleClick() {
    try {
      ProjectService.save({
        title: getTitle(),
        inputParams: getInputParams(),
      });
    toast.success('Changes saved!');
  } catch (e) {
      toast.error('Something went wrong! ' + e.message);
    }
  }
  return (
    <NavDropdown.Item onClick={handleClick}>
      <FontAwesomeIcon size="sm" className="me-2" icon={faSave} /> Save
    </NavDropdown.Item>
  );
}
