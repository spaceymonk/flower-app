import { OverlayTrigger } from 'react-bootstrap';

function CustomOverlay(props) {
  return (
    <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={props.overlay}>
      {props.children}
    </OverlayTrigger>
  );
}

export default CustomOverlay;
