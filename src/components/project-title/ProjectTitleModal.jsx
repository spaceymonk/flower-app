import React from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import T from '../../services/MessageConstants';

function ProjectTitleModal({ show, onSave, onClose, titleRef, value }) {
  return (
    <Modal show={show} size="md" centered>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Text id="filename-input">
            <FontAwesomeIcon icon={faEdit} />
          </InputGroup.Text>
          <FormControl
            size="sm"
            ref={titleRef}
            autoFocus
            defaultValue={value}
            placeholder={T.projectTitle.inputTxt}
            aria-label={T.projectTitle.inputTxt}
            aria-describedby="filename-input"
            onKeyDown={(event) => {
              if (event.key === 'Enter')
                onSave();
            }} />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" size="sm" onClick={onSave}>
          {T.app.saveTxt}
        </Button>
        <Button variant="secondary" size="sm" onClick={onClose}>
          {T.app.cancelTxt}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProjectTitleModal;