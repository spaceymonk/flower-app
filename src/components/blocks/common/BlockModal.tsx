import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import T from '../../../services/MessageConstants';
import useBlockHelper from '../../../hooks/useBlockHelper';
import { BaseModal } from './BaseModal';
import { Block } from '../../../types';
import PropTypes from 'prop-types';

export function BlockModal({ block, onClose, show }: BlockModalProps) {
  const { updateBlockData } = useBlockHelper();
  const [text, setText] = React.useState(block.data.text || '');

  function handleSave() {
    updateBlockData(block.id, { text });
    onClose();
  }

  React.useEffect(() => {
    setText(block.data.text || '');
  }, [block]);

  return (
    <BaseModal show={show} onSave={handleSave} onClose={onClose} block={block}>
      <Form.Group className="mb-3">
        <FloatingLabel label={T.blocks.label}>
          <Form.Control
            placeholder={T.blocks.label}
            as="textarea"
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

BlockModal.propTypes = {
  block: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

interface BlockModalProps extends PropTypes.InferProps<typeof BlockModal.propTypes> {
  block: Block;
}
