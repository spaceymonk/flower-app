import React from 'react';
import { GlowTypes } from '../../../hooks/service/useBlockService';

export function BlockNode({ node, ...props }) {
  let glowClass = '';
  if (node.data?.glow === GlowTypes.NORMAL) glowClass = 'glow__normal';
  if (node.data?.glow === GlowTypes.ERROR) glowClass = 'glow__error';

  return <div {...props} className={`d-flex node ${glowClass} ${props.className}`} />;
}
