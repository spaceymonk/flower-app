import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Modal, Button, Container } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import PropTypes from 'prop-types';

export function AboutModal({ show, onClose }: AboutModalProps) {
  return (
    <Modal show={show} size="lg" centered onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faStar} /> About
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-2">
        <Container className="text-center">
          <p className="lead">
            Flower App <small>ver: {process.env.REACT_APP_VERSION}</small>
          </p>
          <p className="text-center mx-5">
            Flower App is a simple app to help you organize your flowcharts. You can add, remove, edit, export and
            simulate your flowchart diagrams.
          </p>
          <p className="text-muted text-center small">
            This project developed by Berktuğ Kaan Özkan (<a href="http://spaceymonk.github.io/">@spaceymonk</a>). You
            can find the source code on <a href="https://github.com/spaceymonk/flower-app">GitHub page</a>.
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

AboutModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export interface AboutModalProps extends PropTypes.InferProps<typeof AboutModal.propTypes> {}


export function AboutMenuItem() {
  const [show, toggleShow] = useToggle();
  return (
    <>
      <AboutModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faStar} /> About
      </NavDropdown.Item>
    </>
  );
}