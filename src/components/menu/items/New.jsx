import React from 'react';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from 'react-bootstrap';
import { BlockService } from '../../../services/BlockService';
import { AppContext } from '../../../pages/App';
import generateProjectName from 'project-name-generator';

export function NewMenuItem() {
  const { setTitle, setInputParams } = React.useContext(AppContext);

  function handleClick() {
    setTitle(generateProjectName().dashed);
    BlockService.instance().setNodes([]);
    BlockService.instance().setEdges([]);
    setInputParams('');
    BlockService.instance().fitView();
  }
  return (
    <NavDropdown.Item onClick={handleClick}>
      <FontAwesomeIcon size="sm" className="me-2" icon={faStarOfLife} /> New
    </NavDropdown.Item>
  );
}
