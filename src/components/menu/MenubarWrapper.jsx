import Navbar from '../common/Navbar';
import {Navbar as BsNavbar} from 'react-bootstrap'
import ProjectTitleButton from './ProjectTitleButton';
import Menubar from './Menubar';
import React from 'react';

const MenubarWrapper = React.forwardRef(function ({showToast, ...props}, ref) {
  return (
    <div ref={ref}>
      <Navbar>
        <BsNavbar.Toggle aria-controls="navbar-nav" />
        <BsNavbar.Collapse id="navbar-nav" className="text-center">
          <ProjectTitleButton className="ms-sm-5 mt-3 mt-sm-0" showToast={showToast}/>
        </BsNavbar.Collapse>
      </Navbar>
      <Menubar />
    </div>
  );
});

export default MenubarWrapper;
