import React from 'react';
import { Button, Tooltip } from 'react-bootstrap';
import T from '../../config/MessageConstants';
import CustomOverlay from '../common/CustomOverlay';
import useToggle from '../../hooks/useToggle';
import ProjectTitleModal from './ProjectTitleModal';
import { useAppContext } from '../../providers/AppProvider';
import PropTypes from 'prop-types';

function ProjectTitleButton({ className }: PropTypes.InferProps<typeof ProjectTitleButton.propTypes>) {
  const { getTitle } = useAppContext();
  const [showModal, toggleModal] = useToggle();

  return (
    <>
      <ProjectTitleModal show={showModal} onClose={toggleModal} />
      <CustomOverlay overlay={<Tooltip>{T.projectTitle.tooltip}</Tooltip>}>
        <Button
          variant="outline-dark"
          size="sm"
          className={'border-0 text-truncate ' + (className || '')}
          onClick={toggleModal}
          style={{ maxWidth: '80%' }}
        >
          {getTitle()}
        </Button>
      </CustomOverlay>
    </>
  );
}

ProjectTitleButton.propTypes = {
  className: PropTypes.string,
};

export default ProjectTitleButton;
