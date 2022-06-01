import T from '../../config/MessageConstants';
import { Navbar as BsNavbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Navbar({ children }: PropTypes.InferProps<typeof Navbar.propTypes>) {
  return (
    <BsNavbar id="navbar" bg="light" expand="lg" className="px-4 user-select-none">
      <BsNavbar.Brand className="d-flex align-items-center" style={{marginTop:'-10px'}}>
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="" width="45" height="45" className="d-inline-block align-center" />
        <span className="lead mt-2">{T.app.name}</span>
      </BsNavbar.Brand>
      {children}
    </BsNavbar>
  );
}

Navbar.propTypes = {
  children: PropTypes.node,
};

export default Navbar;
