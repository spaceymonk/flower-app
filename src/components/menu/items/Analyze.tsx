import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, Modal, Table, Button, Spinner } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import PropTypes from 'prop-types';
import { useServiceContext } from '../../../providers/ServiceProvider';
import React from 'react';
import { AnalyzeTypes } from '../../../types';
import { MathDisplay } from '../../common/MathDisplay';

type State = {
  [key in AnalyzeTypes]: any;
};

export function AnalyzeModal({ show, onClose }: AnalyzeModalProps) {
  const { analyzeService } = useServiceContext();

  const [isLoading, setIsLoading] = React.useState<State>({
    [AnalyzeTypes.cyclomaticComplexity]: true,
    [AnalyzeTypes.bigO]: true,
  });
  const [results, setResults] = React.useState<State>({
    [AnalyzeTypes.cyclomaticComplexity]: null,
    [AnalyzeTypes.bigO]: null,
  });

  const resolveAnalyze = (key: AnalyzeTypes, promise: Promise<any>) => {
    setIsLoading((prev) => ({
      ...prev,
      [key]: true,
    }));
    promise
      .then((value: any) => {
        setResults((prev: State) => ({
          ...prev,
          [key]: value,
        }));
        setIsLoading((prev: State) => ({
          ...prev,
          [key]: false,
        }));
      })
      .catch((errMsg: string) => {
        setResults((prev: State) => ({
          ...prev,
          [key]: <span className="text-danger">{errMsg}</span>,
        }));
        setIsLoading((prev: State) => ({
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
        <Table className="text-start">
          <tbody>
            <tr>
              <td>
                <strong>Cyclomatic Complexity</strong>
              </td>
              <td>
                {isLoading[AnalyzeTypes.cyclomaticComplexity] ? (
                  <Spinner animation="border" />
                ) : (
                  <MathDisplay text={results[AnalyzeTypes.cyclomaticComplexity]} />
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Big O Complexity</strong>
              </td>
              <td>{isLoading[AnalyzeTypes.bigO] ? <Spinner animation="border" /> : <MathDisplay text={results[AnalyzeTypes.bigO]} />}</td>
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
