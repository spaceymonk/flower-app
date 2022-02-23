import React from 'react';
import { Offcanvas } from 'react-bootstrap';

function Sidebar({show, onClose}) {
  return (
    <Offcanvas show={show} onHide={onClose} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists,
        etc.
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;
