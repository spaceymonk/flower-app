import React from 'react';
import ReactFlow, { Connection, Edge, Node } from 'react-flow-renderer';
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

function Board({ height }: PropTypes.InferProps<typeof Board.propTypes>) {
  const paneLockConfigs = usePaneLock();
  const { minimapToggled, minimapIcon, handleMinimapVisibility } = useMinimapToggle();
  const { nodesState, edgesState } = useAppContext();
  const { connectionService, blockRepository } = useServiceContext();

  const [dblClkNode, setDblClkNode] = React.useState<Block | null>(null);

  const [nodes, , onNodesChange] = nodesState;
  const [edges, , onEdgesChange] = edgesState;

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
  const handleNodeDoubleClick = (event: any, node: Node<BlockData>) => {
    const block = blockRepository.findById(node.id).orElse(null);
    setDblClkNode(block);
  };

  return (
    <>
      <div id="board" style={{ height: height + 'px', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
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
      <BlockModalContainer block={dblClkNode} />
    </>
  );
}

Board.propTypes = {
  height: PropTypes.number.isRequired,
};

export default Board;
