import { Handle, NodeProps, Position } from 'react-flow-renderer';
import FunctionBlock from '../../../model/block/FunctionBlock';
import { NodeData } from '../../../types';
import { BlockView } from './BlockView';

export function FunctionBlockView(node: NodeProps<NodeData>) {
  const block = node.data.block as FunctionBlock;

  const processed = block.text; //todo: handle special keywords by bolding them etc.
  const subroutineTitle = block.subroutine?.title;

  return (
    <BlockView className='node-function' block={block}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="field">
        <div>
          <div className="p-2 text-center border-bottom">{subroutineTitle ? subroutineTitle : <em className="text-muted">{'<subroutine>'}</em>}</div>
          <div className="p-2 text-center">{processed ? processed : <em className="text-muted">{'<signature>'}</em>}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BlockView>
  );
}
