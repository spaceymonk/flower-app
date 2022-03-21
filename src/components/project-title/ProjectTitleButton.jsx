import React from 'react';
import { Button, Tooltip } from 'react-bootstrap';
import T from '../../services/MessageConstants';
import CustomOverlay from '../common/CustomOverlay';
import { AppContext } from '../../providers/AppProvider';
import { toast } from 'react-toastify';
import useToggle from '../../hooks/useToggle';
import ProjectTitleModal from './ProjectTitleModal';
import { validateTitle } from './ProjectTitle.service';

function ProjectTitleButton({ className }) {
  const { getTitle, setTitle } = React.useContext(AppContext);
  const titleRef = React.useRef(null);
  const [showModal, toggleModal] = useToggle();
  const handleSave = () => {
    if (validateTitle(titleRef.current.value)) {
      setTitle(titleRef.current.value);
      toggleModal();
    } else {
      toast.error(T.projectTitle.error.notValid);
    }
  };

  return (
    <>
      <ProjectTitleModal
        show={showModal}
        titleRef={titleRef}
        onSave={handleSave}
        onClose={toggleModal}
        value={getTitle()}
      />
      <CustomOverlay overlay={<Tooltip>{T.projectTitle.tooltip}</Tooltip>}>
        <Button
          variant="outline-dark"
          size="sm"
          className={`border-0 text-truncate ${className}`}
          onClick={toggleModal}
          style={{ maxWidth: '80%' }}
        >
          {getTitle()}
        </Button>
      </CustomOverlay>
    </>
  );
}

export default ProjectTitleButton;
