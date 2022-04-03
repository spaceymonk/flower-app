import React from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import T from '../../services/MessageConstants';
import PropTypes from 'prop-types';
import { useAppContext } from '../../providers/AppProvider';
import { validateTitle } from './ProjectTitle.service';
import { toast } from 'react-toastify';

function ProjectTitleModal({ show, onClose }: PropTypes.InferProps<typeof ProjectTitleModal.propTypes>) {
  const { setTitle, getTitle } = useAppContext();
  const [newTitle, setNewTitle] = React.useState(getTitle());

  const handleSave = () => {
    if (validateTitle(newTitle)) {
      setTitle(newTitle);
      onClose();
    } else {
      toast.error(T.projectTitle.error.notValid);
    }
  };

  return (
    <Modal show={show} centered>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Text id="filename-input">
            <FontAwesomeIcon icon={faEdit} />
          </InputGroup.Text>
          <FormControl
            size="sm"
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder={T.projectTitle.inputTxt}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSave();
            }}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" size="sm" onClick={handleSave}>
          {T.app.saveTxt}
        </Button>
        <Button variant="secondary" size="sm" onClick={onClose}>
          {T.app.cancelTxt}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ProjectTitleModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProjectTitleModal;
