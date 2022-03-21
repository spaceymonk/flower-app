import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useSave from '../../../hooks/project/useSave';

export function SaveMenuItem() {
  const save = useSave();

  function handleClick() {
    try {
      save();
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
