import { OverlayTrigger, OverlayTriggerProps } from 'react-bootstrap';

function CustomOverlay({ overlay, children }: OverlayTriggerProps) {
  return (
    <OverlayTrigger placement="bottom" delay={{ show: 0, hide: 0 }} overlay={overlay}>
      {children}
    </OverlayTrigger>
  );
}

export default CustomOverlay;
