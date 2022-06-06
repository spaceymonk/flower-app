import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from 'react-bootstrap';

export function HowToMenuItem() {
  return (
    <>
      <NavDropdown.Item target="_blank" href={process.env.PUBLIC_URL + '/how-to.html'}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faQuestionCircle} /> How to Use
      </NavDropdown.Item>
    </>
  );
}
