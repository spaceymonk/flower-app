import { Handle, Node, Position } from 'react-flow-renderer';
import FunctionBlock from '../../../model/block/FunctionBlock';
import { NodeData } from '../../../types';
import { BlockView } from './BlockView';

export function FunctionBlockView(node: Node<NodeData>) {
  const block = node.data.block as FunctionBlock;

  const processed = block.text; //todo: handle special keywords by bolding them etc.
  const subroutineTitle = block.subroutine?.title;

  return (
    <BlockView block={block}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="w-100">
        <div className="header">SUBROUTINE</div>
        <div className="p-2 text-center">{subroutineTitle ? subroutineTitle : <em className="text-muted">{'<function>'}</em>}</div>
        <div className="header fst-italic">ARGS</div>
        <div className="p-2 text-center">{processed ? processed : <em className="text-muted">{'<args>'}</em>}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BlockView>
  );
}
