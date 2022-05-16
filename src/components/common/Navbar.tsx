import T from '../../config/MessageConstants';
import { Navbar as BsNavbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Navbar({ children }: PropTypes.InferProps<typeof Navbar.propTypes>) {
  return (
    <BsNavbar id="navbar" bg="light" expand="lg" className="px-4 user-select-none">
      <BsNavbar.Brand href="/">{T.app.name}</BsNavbar.Brand>
      {children}
    </BsNavbar>
  );
}

Navbar.propTypes = {
  children: PropTypes.node,
};

export default Navbar;
