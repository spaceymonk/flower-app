import React from 'react';
import { Button, Modal, InputGroup, FormControl, Tooltip } from 'react-bootstrap';
import { ProjectService } from '../../services/ProjectService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import T from '../../services/MessageConstants';
import CustomOverlay from '../common/CustomOverlay';
import { AppContext } from '../../pages/App';
import { toast } from 'react-toastify';

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
              if (event.key === 'Enter') onSave();
            }}
          />
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

function ProjectTitleButton({ className }) {
  const { getTitle, setTitle } = React.useContext(AppContext);
  const titleRef = React.useRef(null);
  const [modalActive, setModalActive] = React.useState(false);

  const handleModalClose = () => setModalActive(false);
  const handleModalOpen = () => setModalActive(true);
  const handleSave = () => {
    if (ProjectService.validateTitle(titleRef.current.value)) {
      setTitle(titleRef.current.value);
      handleModalClose();
    } else {
      toast.error(T.projectTitle.error.notValid);
    }
  };

  return (
    <>
      <ProjectTitleModal
        show={modalActive}
        titleRef={titleRef}
        onSave={handleSave}
        onClose={handleModalClose}
        value={getTitle()}
      />
      <CustomOverlay overlay={<Tooltip>{T.projectTitle.tooltip}</Tooltip>}>
        <Button
          variant="outline-dark"
          size="sm"
          className={`border-0 text-truncate ${className}`}
          onClick={handleModalOpen}
          style={{ maxWidth: '80%' }}
        >
          {getTitle()}
        </Button>
      </CustomOverlay>
    </>
  );
}

export default ProjectTitleButton;
