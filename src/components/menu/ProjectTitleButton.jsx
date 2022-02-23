import React from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { ProjectService } from '../../services/ProjectService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import T from '../../services/MessageConstants';

function ProjectTitleModal({ show, onSave, onClose, titleRef }) {
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
            placeholder={T.projectTitle.inputTxt}
            aria-label={T.projectTitle.inputTxt}
            aria-describedby="filename-input"
            onKeyDown={(event) => {
              if (event.key === 'Enter') onSave();
            }}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" size="sm" onClick={onSave}>
          Save
        </Button>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ProjectTitleButton({ className }) {
  const titleRef = React.useRef(null);
  const [modalActive, setModalActive] = React.useState(false);

  const handleModalClose = () => {
    setModalActive(false);
  };
  const handleModalOpen = () => {
    setModalActive(true);
  };
  const handleSave = () => {
    if (ProjectService.validateTitle(titleRef.current.value)) {
      ProjectService.data.title = titleRef.current.value;
      handleModalClose();
    } else alert(T.projectTitle.error.notValid);
  };

  return (
    <>
      <ProjectTitleModal show={modalActive} titleRef={titleRef} onSave={handleSave} onClose={handleModalClose} />
      <Button variant="outline-dark" size="sm" className={`border-0 ${className}`} onClick={handleModalOpen}>
        {ProjectService.data.title}
      </Button>
    </>
  );
}

export default ProjectTitleButton;
