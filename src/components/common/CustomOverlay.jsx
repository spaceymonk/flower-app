import { OverlayTrigger } from 'react-bootstrap';

function CustomOverlay({overlay, children}) {
  return (
    <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={overlay}>
      {children}
    </OverlayTrigger>
  );
}

export default CustomOverlay;
