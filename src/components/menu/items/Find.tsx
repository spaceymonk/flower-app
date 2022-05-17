import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, Modal, Button, ListGroup } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import PropTypes from 'prop-types';
import BlockOption from '../../blocks/BlockOption';
import { useAppContext } from '../../../providers/AppProvider';
import { Block } from '../../../types';
import React from 'react';
import useBlockHelper from '../../../hooks/useBlockHelper';

export function FindModal({ show, onClose }: FindModalProps) {
  const { getBlocks } = useAppContext();
  const { focusBlock } = useBlockHelper();

  const blockList = React.useMemo(() => getBlocks(), [getBlocks]);

  function handleSelect(b: Block) {
    onClose();
    focusBlock(b);
  }

  return (
    <Modal show={show} size="lg" centered onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faSearch} /> Find
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-5">
        {blockList.length === 0 ? (
          <p className="lead text-center fst-italic text-muted mt-5">No blocks found</p>
        ) : (
          <>
            <h5>Block List</h5>
            <ListGroup variant="flush">
              {blockList.map((b) => (
                <ListGroup.Item key={b.id} action onClick={() => handleSelect(b)}>
                  <BlockOption block={b} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

FindModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export interface FindModalProps extends PropTypes.InferProps<typeof FindModal.propTypes> {}

export function FindMenuItem() {
  const [show, toggleShow] = useToggle();
  return (
    <>
      <FindModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faSearch} /> Find
      </NavDropdown.Item>
    </>
  );
}
