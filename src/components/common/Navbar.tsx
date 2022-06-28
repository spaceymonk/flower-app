import T from '../../config/MessageConstants';
import { Navbar as BsNavbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

const Navbar = React.forwardRef(function ({ children }: any, ref: any) {
  Navbar.propTypes = {
    children: PropTypes.node,
  };
  return (
    <BsNavbar ref={ref} id="navbar" bg="light" expand="lg" className="px-4 user-select-none">
      <BsNavbar.Brand className="d-flex align-items-center border bg-white p-1 rounded rounded-4">
        <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="app-icon" width="33" height="30" />
        <span className="lead ms-2">{T.app.name}</span>
      </BsNavbar.Brand>
      {children}
    </BsNavbar>
  );
});

export default Navbar;
