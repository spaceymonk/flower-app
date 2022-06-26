import React from 'react';
import { Form, FloatingLabel, Button, ListGroup, Tooltip, Stack, Container, Row, Col } from 'react-bootstrap';
import T from '../../../config/MessageConstants';
import { BaseModal } from './BaseModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import CustomOverlay from '../../common/CustomOverlay';
import Select from 'react-select';
import PropTypes from 'prop-types';
import BlockOption from '../BlockOption';
import Block from '../../../model/Block';
import { useServiceContext } from '../../../providers/ServiceProvider';
import { toast } from 'react-toastify';

type SelectOption = { value: string; block: Block };

export function ContainerModal({ block, onClose, show }: ContainerModalProps) {
  const { blockService, blockRepository } = useServiceContext();

  const [text, setText] = React.useState(block.text);
  const initialChildren = React.useMemo(() => blockRepository.findAllByParentNodeId(block.id), [block.id, blockRepository]);
  const [updatedChildren, setUpdatedChildren] = React.useState<Block[]>(initialChildren);
  const availableNodes = React.useMemo(
    () => blockService.getAllAvailableChildren(block.id, updatedChildren),
    [blockService, block.id, updatedChildren]
  );

  /* -------------------------------------------------------------------------- */
  /*                                Side Effects                                */
  /* -------------------------------------------------------------------------- */
  React.useEffect(() => {
    if (show) {
      setUpdatedChildren(initialChildren);
      setText(block.text);
    }
  }, [show, blockRepository, initialChildren, block.text]);

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleSave = () => {
    try {
      blockService.update(block.id, { text, children: updatedChildren });
    } catch (e: any) {
      toast.error(e.message);
    }
    onClose();
  };
  const handleRemoveChild = (block: Block) => {
    setUpdatedChildren((state) => state.filter((c) => c.id !== block.id));
  };
  const handleAddChild = ({ block }: SelectOption) => {
    setUpdatedChildren((state) => state.concat(block));
  };

  /* -------------------------------------------------------------------------- */
  /*                                 JSX return                                 */
  /* -------------------------------------------------------------------------- */
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
      <Stack gap={2} className="border border-1 pt-2 pb-1 px-1 rounded-3">
        <div className="d-flex justify-content-between bg-light mx-3">
          <Select
            className="w-100"
            // below style makes the dropdown appear as rounded-pill
            styles={{ control: (props) => ({ ...props, borderRadius: '50em' }) }}
            components={{ DropdownIndicator: null }}
            formatOptionLabel={BlockOption}
            noOptionsMessage={() => 'There are no blocks to add'}
            placeholder="Select a block"
            defaultValue={null}
            isClearable={false}
            isSearchable={true}
            onChange={(value: any) => handleAddChild(value)}
            value={null}
            options={availableNodes.map((n) => ({ value: n.id, block: n }))}
          />
        </div>
        <ListGroup>
          {updatedChildren.length === 0 && <em className="text-muted text-center mt-2">No children</em>}
          {updatedChildren.map((b) => (
            <ListGroup.Item key={b.id}>
              <Container fluid className="px-1">
                <Row>
                  <Col sm={11} className="d-flex align-items-center justify-content-center">
                    <BlockOption block={b} />
                  </Col>
                  <CustomOverlay placement="top" overlay={<Tooltip>Remove from container</Tooltip>}>
                    <Col sm={1} className="d-flex align-items-center justify-content-center">
                      <Button variant="outline-danger" size="sm" className="my-auto" onClick={() => handleRemoveChild(b)}>
                        <FontAwesomeIcon icon={faRemove} />
                      </Button>
                    </Col>
                  </CustomOverlay>
                </Row>
              </Container>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Stack>
    </BaseModal>
  );
}

ContainerModal.propTypes = {
  block: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export interface ContainerModalProps extends PropTypes.InferProps<typeof ContainerModal.propTypes> {
  block: Block;
}
