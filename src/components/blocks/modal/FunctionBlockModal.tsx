import React from 'react';
import { Form, FloatingLabel, InputGroup } from 'react-bootstrap';
import { BaseModal } from './BaseModal';
import PropTypes from 'prop-types';
import { useServiceContext } from '../../../providers/ServiceProvider';
import { toast } from 'react-toastify';
import FunctionBlock from '../../../model/block/FunctionBlock';
import { throwErrorIfNull } from '../../../util/common';
import { ProjectData } from '../../../types';
import { open } from '../../../services/helpers/ProjectHelper';

export function FunctionBlockModal({ block, onClose, show }: FunctionBlockModalProps) {
  const { blockService } = useServiceContext();

  const [text, setText] = React.useState(block.text);
  const [subroutine, setSubroutine] = React.useState<ProjectData | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelection = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.item(0);
    if (file) {
      open(file, (project) => {
        setSubroutine(project);
      });
    } else {
      toast.warn('No file selected.');
    }
  };
  function handleSave() {
    blockService.update(block.id, { text, subroutine: subroutine || undefined });
    onClose();
  }

  React.useEffect(() => {
    if (show) {
      setText(block.text);
      setSubroutine(block.subroutine);
    }
  }, [block, show]);

  return (
    <BaseModal show={show} onSave={handleSave} onClose={onClose} block={block}>
      <Form.Group className="mb-3">
        <InputGroup className="d-flex align-items-stretch clickable mb-2 flex-nowrap" onClick={() => throwErrorIfNull(inputRef.current).click()}>
          <InputGroup.Text>Subroutine:</InputGroup.Text>
          <span className="flex-grow-1 px-2 border border-1 rounded-1 align-items-center d-inline-flex text-truncate">
            {subroutine?.title || 'Please select a file...'}
          </span>
          <input type="file" accept=".json" ref={inputRef} onChange={handleFileSelection} style={{ display: 'none' }} />
        </InputGroup>
        <FloatingLabel label="Signature">
          <Form.Control
            placeholder="Signature"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.ctrlKey && event.key === 'Enter') handleSave();
            }}
          />
        </FloatingLabel>
      </Form.Group>
    </BaseModal>
  );
}

FunctionBlockModal.propTypes = {
  block: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

interface FunctionBlockModalProps extends PropTypes.InferProps<typeof FunctionBlockModal.propTypes> {
  block: FunctionBlock;
}
