import T from '../../services/MessageConstants';
import {Navbar as BsNavbar} from 'react-bootstrap';

function Navbar(props) {
  return (
    <BsNavbar id="navbar" bg="light" expand="lg" className="px-4 user-select-none">
      <BsNavbar.Brand href="/">{T.app.name}</BsNavbar.Brand>
      {props.children}
    </BsNavbar>
  );
}

export default Navbar;
