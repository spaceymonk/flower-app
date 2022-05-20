import React from 'react';
import ReactFlow, { Connection, Edge, EdgeChange, Node, NodeChange } from 'react-flow-renderer';
import { Background, MiniMap, Controls, ControlButton } from 'react-flow-renderer';
import { nodeTypes, BlockModalContainer } from '../blocks';
import useMinimapToggle from '../../hooks/useMinimapToggle';
import usePaneLock from '../../hooks/usePaneLock';
import { CustomConnectionLine, edgeTypes } from '../edges';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useAppContext } from '../../providers/AppProvider';
import Block from '../../model/Block';
import { useServiceContext } from '../../providers/ServiceProvider';
import { BlockData } from '../../types';
import { CreateConnectionDto } from '../../dto/CreateConnectionDto';
import { throwErrorIfNull } from '../../util';
import { UpdateConnectionDto } from '../../dto/UpdateConnectionDto';
import { UpdateBlockDto } from '../../dto/UpdateBlockDto';

function Board({ height }: PropTypes.InferProps<typeof Board.propTypes>) {
  const paneLockConfigs = usePaneLock();
  const { minimapToggled, minimapIcon, handleMinimapVisibility } = useMinimapToggle();
  const { nodesState, edgesState } = useAppContext();
  const { connectionService, blockRepository, blockService } = useServiceContext();

  const [dblClkNode, setDblClkNode] = React.useState<Block | null>(null);
  const [showModal, setShowModal] = React.useState(false);

  const [nodes, , onNodesChange] = nodesState;
  const [edges, , onEdgesChange] = edgesState;

  /* -------------------------------------------------------------------------- */
  /*                              Adapter Functions                             */
  /* -------------------------------------------------------------------------- */
  const handleNodeChange = (nodeChanges: NodeChange[]) => {
    nodeChanges.forEach((nc) => {
      if (nc.type === 'position') {
        const dto: UpdateBlockDto = { position: nc.position };
        blockService.update(nc.id, dto);
      } else if (nc.type === 'remove') {
        blockService.delete(nc.id);
      }
    });
    onNodesChange(nodeChanges);
  };
  const handleEdgeChange = (edgeChanges: EdgeChange[]) => {
    edgeChanges.forEach((ec) => {
      if (ec.type === 'remove') {
        connectionService.delete(ec.id);
      }
    });
    onEdgesChange(edgeChanges);
  };
  const handleConnectionCreate = (connection: Connection) => {
    const dto: CreateConnectionDto = {
      sourceId: throwErrorIfNull(connection.source),
      targetId: throwErrorIfNull(connection.target),
      sourceHandle: connection.sourceHandle,
      targetHandle: connection.targetHandle,
    };
    connectionService.create(dto);
  };
  const handleConnectionUpdate = (oldEdge: Edge<any>, newConnection: Connection) => {
    const dto: UpdateConnectionDto = {
      sourceId: throwErrorIfNull(newConnection.source),
      targetId: throwErrorIfNull(newConnection.target),
      sourceHandle: newConnection.sourceHandle,
      targetHandle: newConnection.targetHandle,
    };
    connectionService.update(oldEdge.id, dto);
  };

  /* -------------------------------------------------------------------------- */
  /*                            Behavioural Functions                           */
  /* -------------------------------------------------------------------------- */
  const handleNodeDoubleClick = (event: any, node: Node<BlockData>) => {
    const block = blockRepository.findById(node.id).orElse(null);
    setDblClkNode(block);
    setShowModal(true);
  };

  /* -------------------------------------------------------------------------- */
  /*                                 JSX Return                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <div id="board" style={{ height: height + 'px', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodeChange}
          onEdgesChange={handleEdgeChange}
          onConnect={handleConnectionCreate}
          onEdgeUpdate={handleConnectionUpdate}
          fitView={true}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeDoubleClick={handleNodeDoubleClick}
          connectionLineComponent={CustomConnectionLine}
          deleteKeyCode="Delete"
          multiSelectionKeyCode="Control"
          {...paneLockConfigs}
        >
          <Background />
          {minimapToggled && <MiniMap />}
          <Controls showInteractive={false} showZoom={false}>
            <ControlButton onClick={handleMinimapVisibility}>
              <FontAwesomeIcon icon={minimapIcon}></FontAwesomeIcon>
            </ControlButton>
          </Controls>
        </ReactFlow>
      </div>
      <BlockModalContainer block={dblClkNode} show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

Board.propTypes = {
  height: PropTypes.number.isRequired,
};

export default Board;
