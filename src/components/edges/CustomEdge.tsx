import { EdgeProps, getSmoothStepPath, Node, useNodes } from 'react-flow-renderer';
import { getSmartEdge, pathfindingJumpPointNoDiagonal } from '@tisoap/react-flow-smart-edge';
import { throwErrorIfUndefined } from '../../util/common';
import { NodeData } from '../../types';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, source, target }: EdgeProps) {
  const nodes = useNodes<NodeData>();
  const targetNode = throwErrorIfUndefined(nodes.find((n) => n.id === target));
  const sourceNode = throwErrorIfUndefined(nodes.find((n) => n.id === source));
  const filter = (node: Node<NodeData>) => node.id !== sourceNode.parentNode && node.id !== targetNode.parentNode;

  const edgeResponse = getSmartEdge({
    sourcePosition,
    targetPosition,
    sourceX,
    sourceY,
    targetX,
    targetY,
    nodes: nodes.filter(filter),
    options: {
      gridRatio: 10,
      nodePadding: 20,
      generatePath: pathfindingJumpPointNoDiagonal,
    },
  });

  let edgePath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  if (edgeResponse) {
    edgePath = edgeResponse.svgPathString;
  }

  return (
    <>
      <path id={id} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} markerStart="url(" />
    </>
  );
}
