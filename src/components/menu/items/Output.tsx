import { faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, Table, Tooltip } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import PropTypes from 'prop-types';
import { useSimulationContext } from '../../../providers/SimulationProvider';
import CustomOverlay from '../../common/CustomOverlay';
import React from 'react';

export function OutputModal({ show, onClose }: OutputModalProps) {
  const { outputHandler } = useSimulationContext();
  const [outputs, setOutputs] = React.useState(outputHandler.current.outputs);

  React.useEffect(() => {
    setOutputs(outputHandler.current.outputs);
  }, [outputHandler]);

  const handleClear = () => {
    outputHandler.current.clear();
    setOutputs(outputHandler.current.outputs);
  };

  return (
    <Modal show={show} size="lg" centered onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faClock} /> Output History
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-2">
        <Table className="output-history" size='sm'>
          <tbody>
            {outputs.length !== 0 ? (
              outputs.map((output) => (
                <tr key={output.timestamp.toString()}>
                  <td className='text-start'>{output.data}</td>
                  <td className='text-end text-muted text-nowrap'>{output.timestamp.toLocaleTimeString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center">
                  <span className="text-muted">No output history</span>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <CustomOverlay overlay={<Tooltip>Clear history</Tooltip>}>
          <Button variant="danger" size="sm" className="me-auto" disabled={outputHandler.current.isEmpty()} onClick={handleClear}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </CustomOverlay>
        <Button variant="primary" size="sm" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

OutputModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export interface OutputModalProps extends PropTypes.InferProps<typeof OutputModal.propTypes> {}

export function OutputMenuItem() {
  const [show, toggleShow] = useToggle();
  return (
    <>
      <OutputModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faClock} /> Output History
      </NavDropdown.Item>
    </>
  );
}
