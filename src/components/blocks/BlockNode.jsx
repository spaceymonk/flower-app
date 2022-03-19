import React from 'react';

export function BlockNode({ node, ...props }) {
  const style = node && node.data && node.data.glow ? { filter: 'brightness(.5)' } : {};
  return <div {...props} className={`d-flex node ${props.className}`} style={style} />;
}
