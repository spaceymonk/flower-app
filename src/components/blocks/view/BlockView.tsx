import { GlowTypes } from '../../../types';
import PropTypes from 'prop-types';
import Block from '../../../model/Block';

export function BlockView({ block, className, ...props }: BlockNodeProps) {
  let glowClass = '';
  if (block.glow === GlowTypes.NORMAL) glowClass = 'glow glow__normal';
  if (block.glow === GlowTypes.ERROR) glowClass = 'glow glow__error';

  return <div {...props} className={`d-flex node ${glowClass} ${className || ''}`} />;
}

BlockView.propTypes = {
  block: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export interface BlockNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  block: Block;
}
