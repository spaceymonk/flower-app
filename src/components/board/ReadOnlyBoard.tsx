import React from 'react';
import ReactFlow, { Node, Edge, Background, Controls, ReactFlowProvider, ControlButton } from 'react-flow-renderer';
import BlockAdapter from '../../adapters/BlockAdapter';
import ConnectionAdapter from '../../adapters/ConnectionAdapter';
import { NodeData, ProjectData } from '../../types';
import PropTypes from 'prop-types';
import { nodeTypes } from '../blocks';
import { edgeTypes } from '../edges';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { download } from '../../services/helpers/ProjectHelper';

export function ReadOnlyBoard({ subroutine }: ReadOnlyBoardProps) {
  const display = React.useMemo(() => {
    const obj = { nodes: [], edges: [] } as { nodes: Node<NodeData>[]; edges: Edge<any>[] };
    if (subroutine) {
      obj.nodes = subroutine.blocks ? subroutine.blocks.map((b) => BlockAdapter.toNode(b)) : [];
      obj.edges = subroutine.connections ? subroutine.connections.map((c) => ConnectionAdapter.toEdge(c)) : [];
    }
    return obj;
  }, [subroutine]);

  return (
    <div className="mb-3 board" style={{ height: '40vh' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={display.nodes}
          edges={display.edges}
          fitView={true}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Background />
          <Controls showInteractive={false}>
            <ControlButton onClick={() => download(subroutine)} children={<FontAwesomeIcon icon={faFileDownload} />} />
          </Controls>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

ReadOnlyBoard.propTypes = {
  subroutine: PropTypes.object.isRequired,
};

export interface ReadOnlyBoardProps extends PropTypes.InferProps<typeof ReadOnlyBoard.propTypes> {
  subroutine: ProjectData;
}
