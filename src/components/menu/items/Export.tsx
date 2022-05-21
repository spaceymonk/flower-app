import { faCopy, faFileExport, faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, Modal, Button, Container, Row, Col, Tooltip } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ExportType, GlowTypes } from '../../../types';
import React from 'react';
import { InvalidDecisionError, MultipleStartError, NotConnectedError } from '../../../exceptions';
import { useServiceContext } from '../../../providers/ServiceProvider';
import Editor from 'react-simple-code-editor';
import { hightlightWithLineNumbers } from '../../common/EditorHelper';
import CustomOverlay from '../../common/CustomOverlay';

export function ExportModal({ show, onClose }: ExportModalProps) {
  const { exportService, blockService } = useServiceContext();

  const [code, setCode] = React.useState('');

  async function handleExport(type: ExportType) {
    try {
      if (type === ExportType.PNG) {
        await exportService.toPNG();
      } else if (type === ExportType.CODE) {
        setCode(exportService.toCode());
      }
    } catch (e: any) {
      if (e instanceof NotConnectedError || e instanceof InvalidDecisionError) {
        blockService.highlight([e.blockId], GlowTypes.ERROR);
      } else if (e instanceof MultipleStartError || e instanceof MultipleStartError) {
        blockService.highlight(e.blockIdList, GlowTypes.ERROR);
      }
      onClose();
      toast.error('Export failed! ' + e.message);
    }
  }
  function handleClose() {
    setCode('');
    onClose();
  }
  function handleCopy() {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  }

  return (
    <Modal show={show} size="lg" centered onHide={handleClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faFileExport} /> Export Project
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-4">
        <Container>
          <Row>
            <div className="d-flex align-items-center">
              <h4 className="me-3">Pseudocode</h4>
              {code ? <></> : (
                <CustomOverlay overlay={<Tooltip>Generate</Tooltip>}>
                  <Button size="sm" onClick={() => handleExport(ExportType.CODE)} variant="info">
                    <FontAwesomeIcon icon={faGears} />
                  </Button>
                </CustomOverlay>
              )}
            </div>
          </Row>
          {code && (
            <Row>
              <div className="position-relative">
                <CustomOverlay overlay={<Tooltip>Copy to Clipboard</Tooltip>}>
                  <Button onClick={handleCopy} variant="dark" className="position-absolute top-0 end-0 mt-2 me-4" style={{ zIndex: 1 }}>
                    <FontAwesomeIcon icon={faCopy} />
                  </Button>
                </CustomOverlay>
                <Editor
                  readOnly
                  value={code}
                  onValueChange={() => {}}
                  highlight={(code) => hightlightWithLineNumbers(code)}
                  padding={10}
                  textareaId="codeArea"
                  className="editor"
                />
              </div>
            </Row>
          )}
          <Row className="mt-5">
            <Col className="">
              <Button variant='info' onClick={() => handleExport(ExportType.PNG)}>Export Current View to PNG</Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" size="sm" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ExportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export interface ExportModalProps extends PropTypes.InferProps<typeof ExportModal.propTypes> {}

export function ExportMenuItem() {
  const [show, toggleShow] = useToggle();
  return (
    <>
      <ExportModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faFileExport} /> Export
      </NavDropdown.Item>
    </>
  );
}
