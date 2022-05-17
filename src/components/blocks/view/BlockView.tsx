import { GlowTypes } from '../../../types';
import PropTypes from 'prop-types';

export function BlockView({ block, className, ...props }: BlockNodeProps) {
  let glowClass = '';
  if (block.data?.glow === GlowTypes.NORMAL) glowClass = 'glow__normal';
  if (block.data?.glow === GlowTypes.ERROR) glowClass = 'glow__error';

  return <div {...props} className={`d-flex node ${glowClass} ${className || ''}`} />;
}

BlockView.propTypes = {
  block: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export interface BlockNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  block: Block;
}
