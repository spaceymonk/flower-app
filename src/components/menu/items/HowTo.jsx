import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Modal, Button, Container } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';

export function HowToModal({ show, onClose }) {
  return (
    <Modal show={show} size="lg" centered onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faQuestionCircle} /> How To Use
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-2">
        <Container>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis hic consequatur, delectus odio quam
            vitae dolores? Fuga, natus mollitia nulla consequatur, perspiciatis praesentium labore, iure repellat
            facilis architecto pariatur. Tempora ratione, quod doloribus rem eum obcaecati esse nesciunt itaque aperiam
            quia quam consequuntur. Exercitationem esse natus minima voluptatum necessitatibus. Alias minima fuga
            mollitia quidem dolorum ab, magnam voluptate quos odio, libero et natus assumenda incidunt nobis quae dolor.
            Autem aperiam quasi tempore quas, quaerat optio nam magni rem debitis expedita nesciunt aliquam ipsam velit
            praesentium temporibus consequuntur neque! Illo, provident? Cupiditate rem esse aspernatur repudiandae natus
            repellat laboriosam, ut, soluta dolorem sed itaque. Illo tenetur excepturi sint enim illum, nemo dicta hic
            itaque beatae aliquam quibusdam in ratione nesciunt aperiam accusantium porro, eos perspiciatis tempore ex
            tempora id molestiae veniam. Provident, repudiandae. Optio ipsam suscipit eligendi voluptatibus tenetur
            ipsum, quibusdam repellat ab dolore impedit, voluptate veniam expedita non voluptatem iusto!
          </p>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" size="sm" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function HowToMenuItem() {
  const [show, toggleShow] = useToggle();
  return (
    <>
      <HowToModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faQuestionCircle} /> How to Use
      </NavDropdown.Item>
    </>
  );
}
