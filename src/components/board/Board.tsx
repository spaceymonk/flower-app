import React from 'react';
import ReactFlow, { Connection, Edge, EdgeChange, Node, NodeChange } from 'react-flow-renderer';
import { Background, MiniMap, Controls, ControlButton } from 'react-flow-renderer';
import { nodeTypes, BlockModalContainer } from '../blocks';
import useMinimapToggle from '../../hooks/useMinimapToggle';
import { CustomConnectionLine, edgeTypes } from '../edges';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useAppContext } from '../../providers/AppProvider';
import Block from '../../model/Block';
import { useServiceContext } from '../../providers/ServiceProvider';
import { GlowTypes, NodeData } from '../../types';
import { CreateConnectionDto } from '../../dto/CreateConnectionDto';
import { throwErrorIfNull } from '../../util/common';
import { UpdateConnectionDto } from '../../dto/UpdateConnectionDto';
import { InputModal } from './InputModal';
import { useSimulationContext } from '../../providers/SimulationProvider';
import { useDeferredPromise } from '../../hooks/useDefferedPromise';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { faMap as filledMap } from '@fortawesome/free-solid-svg-icons';
import { faMap as emptyMap } from '@fortawesome/free-regular-svg-icons';
import usePaneLockToggle from '../../hooks/usePaneLockToggle';

function Board({ height }: PropTypes.InferProps<typeof Board.propTypes>) {
  const { paneLocked, togglePaneLock, paneLockProps } = usePaneLockToggle();
  const { minimapToggled, handleMinimapVisibility } = useMinimapToggle();
  const { connectionService, blockRepository, blockService } = useServiceContext();
  const { inputHandler, isRunning } = useSimulationContext();
  const { nodesState, edgesState } = useAppContext();
  const [nodes, , onNodesChange] = nodesState;
  const [edges, , onEdgesChange] = edgesState;

  const updatingEdge = React.useRef<string>('');
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
      if (nc.type === 'position' && nc.position) {
        blockRepository.updatePosition(nc.id, nc.position);
        changes.push(nc);
      } else if (nc.type === 'remove') {
        if (!showModal.block) blockService.delete(nc.id);
      } else if (nc.type === 'dimensions') {
        blockRepository.updateDimensions(nc.id, nc.dimensions);
        changes.push(nc);
      } else if (nc.type === 'select') {
        if (nc.selected) {
          connectionService.highlightByBlockId(nc.id, GlowTypes.NORMAL);
        }
        changes.push(nc);
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
        if (!showModal.block) connectionService.delete(ec.id);
      } else {
        changes.push(ec);
      }
    }
    onEdgesChange(changes);
  };
  const handleConnectionCreate = (connection: Connection) => {
    if (!paneLocked) {
      const dto: CreateConnectionDto = {
        sourceId: throwErrorIfNull(connection.source),
        targetId: throwErrorIfNull(connection.target),
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
      };
      connectionService.create(dto);
    }
  };
  const handleConnectionUpdate = (oldEdge: Edge<any>, newConnection: Connection) => {
    if (!paneLocked) {
      updatingEdge.current = '';
      const dto: UpdateConnectionDto = {
        sourceId: throwErrorIfNull(newConnection.source),
        targetId: throwErrorIfNull(newConnection.target),
        sourceHandle: newConnection.sourceHandle,
        targetHandle: newConnection.targetHandle,
      };
      connectionService.update(oldEdge.id, dto);
    }
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
    updatingEdge.current = edge.id;
  };
  const handleEdgeUpdateEnd = (e: MouseEvent, edge: Edge) => {
    if (!paneLocked && updatingEdge.current === edge.id) {
      connectionService.delete(updatingEdge.current);
    }
  };
  const handlePaneClick = React.useCallback(() => {
    if (!isRunning()) {
      blockService.highlight(null, GlowTypes.NONE); // clear highlighs
      connectionService.highlightByBlockId(null, GlowTypes.NONE);
    }
  }, [blockService, connectionService, isRunning]);

  /* -------------------------------------------------------------------------- */
  /*                                Side Effects                                */
  /* -------------------------------------------------------------------------- */

  React.useEffect(() => {
    inputHandler.fetcher = async (name: string) => {
      setInputForVariable(name);
      setShowModal((prev) => ({ ...prev, input: true }));
      return defer().promise;
    };
  }, [defer, inputHandler]);

  React.useEffect(() => {
    if (isRunning() && !paneLocked) {
      togglePaneLock();
    }
  }, [isRunning, paneLocked, togglePaneLock]);

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
          onNodeDoubleClick={handleNodeDoubleClick}
          onEdgeUpdateStart={handleEdgeUpdateStart}
          onEdgeUpdateEnd={handleEdgeUpdateEnd}
          onPaneClick={handlePaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          connectionLineComponent={CustomConnectionLine}
          snapGrid={[10, 10]}
          multiSelectionKeyCode="Control"
          deleteKeyCode="Delete"
          fitView
          snapToGrid
          onlyRenderVisibleElements
          {...paneLockProps}
        >
          <Background />
          {minimapToggled && <MiniMap />}
          <Controls showInteractive={false}>
            <ControlButton onClick={handleMinimapVisibility} title="toggle minimap" aria-label="toggle minimap">
              <FontAwesomeIcon icon={minimapToggled ? filledMap : emptyMap}></FontAwesomeIcon>
            </ControlButton>
            <ControlButton onClick={togglePaneLock} disabled={isRunning()} title="lock pane" aria-label="lock pane">
              <FontAwesomeIcon icon={paneLocked ? faLock : faLockOpen}></FontAwesomeIcon>
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
