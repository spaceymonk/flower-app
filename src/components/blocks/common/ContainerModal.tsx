import React from 'react';
import { Form, FloatingLabel, Button, ListGroup, Tooltip, Stack, Container, Row, Col } from 'react-bootstrap';
import T from '../../../services/MessageConstants';
import useBlockHelper from '../../../hooks/useBlockHelper';
import { BaseModal } from './BaseModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
import CustomOverlay from '../../common/CustomOverlay';
import Select from 'react-select';
import { Block } from '../../../types';
import PropTypes from 'prop-types';
import BlockOption from './BlockOption';

export function ContainerModal({ block, onClose, show }: ContainerModalProps) {
  const { updateBlockData, findDirectChildBlocks, updateBlockParent, removeBlockParent, findAllAvailableChildren } = useBlockHelper();

  const [text, setText] = React.useState(block.data.text || '');
  const [selectedChild, setSelectedChild] = React.useState<{ value: string; block: Block } | null>(null);
  const [childNodes, setChildNodes] = React.useState<Block[]>([]);
  const [removedChildren, setRemovedChildren] = React.useState<Block[]>([]);
  const availableNodes = React.useMemo(() => findAllAvailableChildren(block, childNodes), [childNodes, findAllAvailableChildren, block]);

  React.useEffect(() => {
    setChildNodes(findDirectChildBlocks(block.id));
    setText(block.data.text || '');
  }, [findDirectChildBlocks, block]);

  const handleSave = () => {
    updateBlockData(block.id, { text });
    updateBlockParent(block, childNodes);
    removeBlockParent(block, removedChildren);
    setRemovedChildren([]);
    onClose();
  };
  const handleRemoveChild = (child: Block) => {
    setRemovedChildren((children) => children.concat(child));
    setChildNodes(childNodes.filter((n) => n.id !== child.id));
  };
  const handleAddChild = React.useCallback(() => {
    if (selectedChild === null) return;
    setChildNodes((children) => children.concat(selectedChild.block));
    setSelectedChild(null);
  }, [selectedChild]);

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
      <Stack gap={2} className="border border-1 pt-2 pb-1 px-1 rounded-3">
        <div className="d-flex justify-content-between bg-light mx-3">
          <CustomOverlay overlay={<Tooltip>Add to container</Tooltip>}>
            <Button
              variant="outline-success"
              size="sm"
              className="my-auto me-2 rounded-circle"
              disabled={selectedChild === null}
              onClick={handleAddChild}
            >
              <FontAwesomeIcon icon={faAdd} />
            </Button>
          </CustomOverlay>
          <Select
            className="w-100"
            // below style makes the dropdown appear as rounded-pill
            styles={{ control: (props, state) => ({ ...props, borderRadius: '50em' }) }}
            components={{ DropdownIndicator: null }}
            formatOptionLabel={BlockOption}
            noOptionsMessage={() => 'There are no blocks to add'}
            placeholder="Select a block"
            defaultValue={null}
            isClearable={true}
            isSearchable={true}
            onChange={setSelectedChild}
            value={selectedChild}
            options={availableNodes.map((n) => ({ value: n.id, block: n }))}
          />
        </div>
        <ListGroup>
          {childNodes.length === 0 && <em className="text-muted text-center mt-2">No children</em>}
          {childNodes.map((n) => (
            <ListGroup.Item key={n.id}>
              <Container fluid className="px-1">
                <Row>
                  <Col sm={11} className="d-flex align-items-center justify-content-center">
                    <BlockOption block={n} />
                  </Col>
                  <CustomOverlay placement="top" overlay={<Tooltip>Remove from container</Tooltip>}>
                    <Col sm={1} className="d-flex align-items-center justify-content-center">
                      <Button variant="outline-danger" size="sm" className="my-auto" onClick={() => handleRemoveChild(n)}>
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
