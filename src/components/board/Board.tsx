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
import { NodeData } from '../../types';
import { CreateConnectionDto } from '../../dto/CreateConnectionDto';
import { throwErrorIfNull } from '../../util/common';
import { UpdateConnectionDto } from '../../dto/UpdateConnectionDto';
import { UpdateBlockDto } from '../../dto/UpdateBlockDto';
import { InputModal } from './InputModal';
import { useSimulationContext } from '../../providers/SimulationProvider';
import { useDeferredPromise } from '../../hooks/useDefferedPromise';

function Board({ height }: PropTypes.InferProps<typeof Board.propTypes>) {
  const paneLockConfigs = usePaneLock();
  const { minimapToggled, minimapIcon, handleMinimapVisibility } = useMinimapToggle();
  const { connectionService, blockRepository, blockService } = useServiceContext();
  const { inputHandler } = useSimulationContext();
  const { nodesState, edgesState } = useAppContext();
  const [nodes, , onNodesChange] = nodesState;
  const [edges, , onEdgesChange] = edgesState;

  const [edgeToRemove, setEdgeToRemove] = React.useState<{ id: string | null; dragging: boolean }>({ id: null, dragging: false });

  const [dblClkNode, setDblClkNode] = React.useState<Block | null>(null);
  const [showModal, setShowModal] = React.useState({ block: false, input: false });
  const [inputForVariable, setInputForVariable] = React.useState<string>('');
  const { defer, deferRef } = useDeferredPromise<string | null>();

  /* -------------------------------------------------------------------------- */
  /*                              Adapter Functions                             */
  /* -------------------------------------------------------------------------- */
  const handleNodeChange = (nodeChanges: NodeChange[]) => {
    const changes: NodeChange[] = [];
    for (const nc of nodeChanges) {
      if (nc.type === 'position') {
        const dto: UpdateBlockDto = { position: nc.position };
        blockService.update(nc.id, dto);
      } else if (nc.type === 'remove') {
        blockService.delete(nc.id);
      } else {
        changes.push(nc);
      }
    }
    onNodesChange(changes);
  };
  const handleEdgeChange = (edgeChanges: EdgeChange[]) => {
    const changes: EdgeChange[] = [];
    for (const ec of edgeChanges) {
      if (ec.type === 'remove') {
        connectionService.delete(ec.id);
      } else {
        changes.push(ec);
      }
    }
    onEdgesChange(changes);
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
    setEdgeToRemove((prev) => ({ ...prev, id: null }));
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
  const handleNodeDoubleClick = (event: any, node: Node<NodeData>) => {
    const block = blockRepository.findById(node.id).orElse(null);
    setDblClkNode(block);
    setShowModal((prev) => ({ ...prev, block: true }));
  };
  const handleInputSubmit = (input: string | null) => {
    throwErrorIfNull(deferRef.current, 'deferRef.current is null').resolve(input);
  };
  const handleBlockModalClose = () => {
    setShowModal((prev) => ({ ...prev, block: false }));
  };
  const handleInputModalClose = () => {
    setShowModal((prev) => ({ ...prev, input: false }));
  };
  const handleEdgeUpdateStart = (e: React.MouseEvent, edge: Edge) => {
    setEdgeToRemove((prev) => ({ ...prev, id: edge.id, dragging: true }));
  };
  const handleEdgeUpdateEnd = (e: MouseEvent, edge: Edge) => {
    setEdgeToRemove((prev) => ({ ...prev, dragging: false }));
  };

  /* -------------------------------------------------------------------------- */
  /*                                Side Effects                                */
  /* -------------------------------------------------------------------------- */

  React.useEffect(() => {
    if (!edgeToRemove.dragging && edgeToRemove.id) {
      connectionService.delete(edgeToRemove.id);
      setEdgeToRemove((prev) => ({ ...prev, id: null }));
    }
  }, [connectionService, edgeToRemove.dragging, edgeToRemove.id]);

  React.useEffect(() => {
    inputHandler.current.fetcher = async (name: string) => {
      setInputForVariable(name);
      setShowModal((prev) => ({ ...prev, input: true }));
      return defer().promise;
    };
  }, [defer, inputHandler]);

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
          onEdgeUpdateStart={handleEdgeUpdateStart}
          onEdgeUpdateEnd={handleEdgeUpdateEnd}
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
      <BlockModalContainer block={dblClkNode} show={showModal.block} onClose={handleBlockModalClose} />
      <InputModal variableName={inputForVariable} onSubmit={handleInputSubmit} show={showModal.input} onClose={handleInputModalClose} />
    </>
  );
}

Board.propTypes = {
  height: PropTypes.number.isRequired,
};

export default Board;
