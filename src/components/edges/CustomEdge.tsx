import { EdgeProps, getSmoothStepPath, useNodes } from 'react-flow-renderer';
import { getSmartEdge, pathfindingJumpPointNoDiagonal } from '@tisoap/react-flow-smart-edge';
import { throwErrorIfUndefined } from '../../util/common';
import { NodeData } from '../../types';
import React from 'react';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, source, target }: EdgeProps) {
  const nodes = useNodes<NodeData>();
  const targetNode = throwErrorIfUndefined(nodes.find((n) => n.id === target));
  const sourceNode = throwErrorIfUndefined(nodes.find((n) => n.id === source));
  const filteredNodes = React.useMemo(
    () => nodes.filter((node) => node.id !== sourceNode.parentNode && node.id !== targetNode.parentNode),
    [nodes, sourceNode.parentNode, targetNode.parentNode]
  );

  let edgePath = React.useMemo(
    () => getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition }),
    [sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition]
  );

  const edgeResponse = React.useMemo(
    () =>
      getSmartEdge({
        sourcePosition,
        targetPosition,
        sourceX,
        sourceY,
        targetX,
        targetY,
        nodes: filteredNodes,
        options: {
          gridRatio: 5,
          nodePadding: 30,
          generatePath: pathfindingJumpPointNoDiagonal,
        },
      }),
    [filteredNodes, sourcePosition, sourceX, sourceY, targetPosition, targetX, targetY]
  );

  const distance = React.useMemo(
    () => Math.sqrt(Math.pow(sourceX - targetX, 2) + Math.pow(sourceY - targetY, 2)),
    [sourceX, sourceY, targetX, targetY]
  );

  if (distance >= 60 && edgeResponse) {
    edgePath = edgeResponse.svgPathString;
  }

  return (
    <>
      <path id={id} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} markerStart="url(" />
    </>
  );
}
