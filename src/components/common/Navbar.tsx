import T from '../../config/MessageConstants';
import { Navbar as BsNavbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Navbar({ children }: PropTypes.InferProps<typeof Navbar.propTypes>) {
  return (
    <BsNavbar id="navbar" bg="light" expand="lg" className="px-4 user-select-none">
      <BsNavbar.Brand className="d-flex align-items-center border bg-white p-1 rounded rounded-4" >
        <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="app-icon" width="30" height="30" />
        <span className="lead ms-2">{T.app.name}</span>
      </BsNavbar.Brand>
      {children}
    </BsNavbar>
  );
}

Navbar.propTypes = {
  children: PropTypes.node,
};

export default Navbar;
