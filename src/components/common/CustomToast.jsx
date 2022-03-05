import { Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export function CustomToast({ toast, onClose }) {
  return (
    <Toast show={true} delay={5000} autohide animation={false} onClose={() => onClose(toast.key)}>
      <Toast.Header>
        <FontAwesomeIcon icon={faInfoCircle} />
        <strong className="me-auto ms-2">{toast.title}</strong>
        <small className="text-end">{toast.subtitle}</small>
      </Toast.Header>
      {toast.body && <Toast.Body>{toast.body}</Toast.Body>}
    </Toast>
  );
}
