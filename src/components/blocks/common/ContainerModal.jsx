import React from 'react';
import { Form, FloatingLabel, Button, ListGroup, Tooltip, Badge, Stack } from 'react-bootstrap';
import T from '../../../services/MessageConstants';
import useBlockService from '../../../hooks/service/useBlockService';
import { BaseModal } from './BaseModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
import CustomOverlay from '../../common/CustomOverlay';
import { AppContext } from '../../../providers/AppProvider';
import Select from 'react-select';
import { BlockTypes } from '../../../services/createNode';

export function ContainerModal({ node, onClose, show }) {
  const { updateNode, getChildNodes, updateParentNode } = useBlockService();
  const { getNodes } = React.useContext(AppContext);

  const textAreaRef = React.useRef(null);
  const [selectedChild, setSelectedChild] = React.useState(null);
  const [childNodes, setChildNodes] = React.useState(getChildNodes(node.id));

  const nodes = React.useMemo(getNodes, [getNodes]);
  const availableNodes = React.useMemo(() => {
    let avail = [];
    for (const n of nodes) {
      if (
        !(
          n.id === node.id ||
          n.type === BlockTypes.START_BLOCK ||
          n.type === BlockTypes.STOP_BLOCK ||
          childNodes.includes(n)
        )
      ) {
        avail.push(n);
      }
    }
    return avail;
  }, [childNodes, node.id, nodes]);

  const handleSave = () => {
    updateNode(node.id, { text: textAreaRef.current.value });
    updateParentNode(node, childNodes);
    onClose();
  };
  const removeChild = (child) => {
    setChildNodes(childNodes.filter((n) => n.id !== child.id));
  };
  const addChild = () => {
    const child = nodes.find((n) => n.id === selectedChild.value);
    setChildNodes([...childNodes, nodes.find((n) => n.id === child.id)]);
    setSelectedChild(null);
  };

  return (
    <BaseModal show={show} onSave={handleSave} onClose={onClose} node={node}>
      <Form.Group className="mb-3">
        <FloatingLabel label={T.blocks.label}>
          <Form.Control
            placeholder={T.blocks.label}
            as="textarea"
            ref={textAreaRef}
            defaultValue={node?.data?.text}
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
              onClick={addChild}
            >
              <FontAwesomeIcon icon={faAdd} />
            </Button>
          </CustomOverlay>
          <Select
            className="w-100"
            // below style makes the dropdown appear as rounded-pill
            styles={{ control: (props, state) => ({ ...props, borderRadius: '50em' }) }}
            components={{ DropdownIndicator: null }}
            noOptionsMessage={() => 'There are no blocks to add'}
            placeholder="Select a block"
            defaultValue={null}
            isClearable={true}
            isSearchable={true}
            onChange={setSelectedChild}
            value={selectedChild}
            options={availableNodes.map((n) => ({ value: n.id, label: `${n.type} - ${n.id}` }))}
          />
        </div>
        <ListGroup>
          {childNodes.length === 0 && <em className="text-muted text-center mt-2">No children</em>}
          {childNodes.map((n) => (
            <ListGroup.Item key={n.id} className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Badge className="me-2 flex-1" bg="info">
                  {n.type}
                </Badge>
                <small className="text-truncate">{n.id}</small>
              </div>
              <CustomOverlay placement="top" overlay={<Tooltip>Remove from container</Tooltip>}>
                <Button variant="outline-danger" size="sm" className="my-auto" onClick={() => removeChild(n)}>
                  <FontAwesomeIcon icon={faRemove} />
                </Button>
              </CustomOverlay>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Stack>
    </BaseModal>
  );
}
