import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, Modal, Table, Button, Spinner } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import PropTypes from 'prop-types';
import { useServiceContext } from '../../../providers/ServiceProvider';
import React from 'react';
import { AnalyzeTypes } from '../../../types';

type State = {
  [key in AnalyzeTypes]: any;
};

export function AnalyzeModal({ show, onClose }: AnalyzeModalProps) {
  const { analyzeService } = useServiceContext();

  const [isLoading, setIsLoading] = React.useState<State>({
    [AnalyzeTypes.cyclomaticComplexity]: true,
    [AnalyzeTypes.blockCountByTypes]: true,
  });
  const [results, setResults] = React.useState<State>({
    [AnalyzeTypes.cyclomaticComplexity]: null,
    [AnalyzeTypes.blockCountByTypes]: null,
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
      resolveAnalyze(AnalyzeTypes.blockCountByTypes, analyzeService.getBlockCountByTypes());
    }
  }, [analyzeService, show]);

  return (
    <Modal show={show} size="lg" centered onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faInfoCircle} /> Analyze
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-2">
        <Table className="text-start">
          <tbody>
            <tr>
              <td>
                <strong>Cyclomatic Complexity</strong>
              </td>
              <td>{isLoading[AnalyzeTypes.cyclomaticComplexity] ? <Spinner animation="border" /> : CyclomaticComplexityDisplay(results)}</td>
            </tr>
            <tr>
              <td>
                <strong>Block Counts</strong>
              </td>
              <td>{isLoading[AnalyzeTypes.blockCountByTypes] ? <Spinner animation="border" /> : BlockCountTable(results)}</td>
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
        <FontAwesomeIcon size="sm" className="me-2" icon={faInfoCircle} /> Analyze
      </NavDropdown.Item>
    </>
  );
};

export interface AnalyzeModalProps extends PropTypes.InferProps<typeof AnalyzeModal.propTypes> {}

function CyclomaticComplexityDisplay(results: State): React.ReactNode {
  const complexity = results[AnalyzeTypes.cyclomaticComplexity];
  if (complexity < 5) {
    return <span className="text-success">{complexity}</span>;
  } else if (complexity < 8) {
    return <span className="text-warning">{complexity}</span>;
  } else {
    return <span className="text-danger">{complexity}</span>;
  }
}

function BlockCountTable(results: State): React.ReactNode {
  if (Object.keys(results[AnalyzeTypes.blockCountByTypes]).length === 0) {
    return <span className="text-danger">No blocks found</span>;
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>Block Type</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(results[AnalyzeTypes.blockCountByTypes]).map((key: string) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{results[AnalyzeTypes.blockCountByTypes][key]}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>{Object.values<number>(results[AnalyzeTypes.blockCountByTypes]).reduce((a, b) => a + b, 0)}</td>
        </tr>
      </tfoot>
    </Table>
  );
}
