import React from 'react';
import { Form, FloatingLabel, Button, ListGroup, Tooltip, Badge, Stack, Container, Row, Col } from 'react-bootstrap';
import T from '../../../services/MessageConstants';
import useBlockService from '../../../hooks/service/useBlockService';
import { BaseModal } from './BaseModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
import CustomOverlay from '../../common/CustomOverlay';
import { AppContext } from '../../../providers/AppProvider';
import Select from 'react-select';
import { BlockTypes } from '../../../services/createNode';
import { includesNode } from '../../../services/BlockHelper';

const CustomOption = ({ node }) => {
  return (
    <Container fluid className='px-0'>
      <Row>
        <Col sm={3} className="d-flex justify-content-center align-items-center">
          <Badge className="rounded-pill" bg="info">
            {node.type}
          </Badge>
        </Col>
        {node.data.name ? (
          <>
            <CustomOverlay overlay={<Tooltip>{node.data.name}</Tooltip>}>
              <Col sm={6} className="text-truncate fw-bold small text-center">
                <span>{node.data.name}</span>
              </Col>
            </CustomOverlay>
            <CustomOverlay overlay={<Tooltip>{node.id}</Tooltip>}>
              <Col sm={3} className="text-truncate small text-muted fst-italic text-end">
                <span>{node.id}</span>
              </Col>
            </CustomOverlay>
          </>
        ) : (
          <CustomOverlay overlay={<Tooltip>{node.id}</Tooltip>}>
            <Col sm={9} className="small text-truncate">
              <span>{node.id}</span>
            </Col>
          </CustomOverlay>
        )}
      </Row>
    </Container>
  );
};

export function ContainerModal({ node, onClose, show }) {
  const { updateNode, getChildNodes, updateParentNode, removeChildNodes } = useBlockService();
  const { getNodes } = React.useContext(AppContext);

  const textAreaRef = React.useRef(null);
  const [selectedChild, setSelectedChild] = React.useState(null);
  const [childNodes, setChildNodes] = React.useState([]);
  const [removedChildren, setRemovedChildren] = React.useState([]);

  const availableNodes = React.useMemo(() => {
    const nodes = getNodes();
    let avail = [];
    for (const n of nodes) {
      if (
        !(
          n.id === node.id ||
          n.type === BlockTypes.START_BLOCK ||
          n.type === BlockTypes.STOP_BLOCK ||
          includesNode(childNodes, n)
        )
      ) {
        avail.push(n);
      }
    }
    return avail;
  }, [childNodes, getNodes, node.id]);

  React.useEffect(() => {
    const nds = getChildNodes(node);
    setChildNodes(nds);
  }, [getChildNodes, node]);

  const handleSave = () => {
    updateNode(node.id, { text: textAreaRef.current.value });
    updateParentNode(node, childNodes);
    removeChildNodes(node, removedChildren);
    setRemovedChildren([]);
    onClose();
  };
  const removeChild = (child) => {
    setRemovedChildren((children) => children.concat(child));
    setChildNodes(childNodes.filter((n) => n.id !== child.id));
  };
  const addChild = () => {
    const nodes = getNodes();
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
            defaultValue={node.data?.text}
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
            formatOptionLabel={CustomOption}
            noOptionsMessage={() => 'There are no blocks to add'}
            placeholder="Select a block"
            defaultValue={null}
            isClearable={true}
            isSearchable={true}
            onChange={setSelectedChild}
            value={selectedChild}
            options={availableNodes.map((n) => ({ value: n.id, node: n }))}
          />
        </div>
        <ListGroup>
          {childNodes.length === 0 && <em className="text-muted text-center mt-2">No children</em>}
          {childNodes.map((n) => (
            <ListGroup.Item key={n.id}>
              <Container fluid className="px-1" >
                <Row>
                  <Col sm={11} className="d-flex align-items-center justify-content-center">
                    <CustomOption node={n} />
                  </Col>
                  <CustomOverlay placement="top" overlay={<Tooltip>Remove from container</Tooltip>}>
                    <Col sm={1}  className="d-flex align-items-center justify-content-center">
                      <Button variant="outline-danger" size="sm" className="my-auto" onClick={() => removeChild(n)}>
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
