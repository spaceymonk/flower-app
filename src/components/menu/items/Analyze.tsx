import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, Modal, Table, Button, Spinner } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import PropTypes from 'prop-types';
import { useServiceContext } from '../../../providers/ServiceProvider';
import React from 'react';
import { AnalyzeTypes } from '../../../types';

export function AnalyzeModal({ show, onClose }: AnalyzeModalProps) {
  const { analyzeService } = useServiceContext();

  const [isLoading, setIsLoading] = React.useState<any>({
    cyclomaticComplexity: true,
  });
  const [results, setResults] = React.useState<any>({
    cyclomaticComplexity: 0,
  });

  const resolveAnalyze = (key: string, promise: Promise<any>) => {
    setIsLoading({
      [key]: true,
    });
    promise
      .then((value: any) => {
        setResults((prev: any) => ({
          ...prev,
          [key]: value,
        }));
        setIsLoading((prev: any) => ({
          ...prev,
          [key]: false,
        }));
      })
      .catch((errMsg: string) => {
        setResults((prev: any) => ({
          ...prev,
          [key]: <span className="text-danger">{errMsg}</span>,
        }));
        setIsLoading((prev: any) => ({
          ...prev,
          [key]: false,
        }));
      });
  };

  React.useEffect(() => {
    if (show) {
      resolveAnalyze(AnalyzeTypes.cyclomaticComplexity, analyzeService.getCyclomaticComplexity());
    }
  }, [analyzeService, show]);

  return (
    <Modal show={show} size="lg" centered onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faInfoCircle} /> Statistics
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-2">
        <Table>
          <tbody>
            <tr>
              <td>
                <strong>Cyclomatic Complexity</strong>
              </td>
              <td>{isLoading[AnalyzeTypes.cyclomaticComplexity] ? <Spinner animation="border" /> : results[AnalyzeTypes.cyclomaticComplexity]}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" size="sm" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AnalyzeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export const AnalyzeMenuItem = () => {
  const [show, toggleShow] = useToggle();
  return (
    <>
      <AnalyzeModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faInfoCircle} /> Statistics
      </NavDropdown.Item>
    </>
  );
};

export interface AnalyzeModalProps extends PropTypes.InferProps<typeof AnalyzeModal.propTypes> {}
