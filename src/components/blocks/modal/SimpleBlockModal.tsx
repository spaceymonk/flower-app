import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import T from '../../../config/MessageConstants';
import { BaseModal } from './BaseModal';
import PropTypes from 'prop-types';
import Block from '../../../model/Block';
import { useServiceContext } from '../../../providers/ServiceProvider';

export function BlockModal({ block, onClose, show }: BlockModalProps) {
  const { blockService } = useServiceContext();

  const [text, setText] = React.useState(block.text);

  function handleSave() {
    blockService.update(block.id, { text });
    onClose();
  }

  React.useEffect(() => {
    setText(block.text);
  }, [block]);

  return (
    <BaseModal show={show} onSave={handleSave} onClose={onClose} block={block}>
      <Form.Group className="mb-3">
        <FloatingLabel label={T.blocks.label}>
          <Form.Control
            placeholder={T.blocks.label}
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

BlockModal.propTypes = {
  block: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

interface BlockModalProps extends PropTypes.InferProps<typeof BlockModal.propTypes> {
  block: Block;
}
