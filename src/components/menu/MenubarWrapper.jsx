import { Navbar } from 'react-bootstrap';
import ProjectTitleButton from './ProjectTitleButton';
import Menubar from './Menubar';

function MenubarWrapper() {
  return (
    <>
      <Navbar id="navbar" bg="light" expand="lg" className="px-4">
        <Navbar.Brand href="/">Flower App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="text-center">
          <ProjectTitleButton className="ms-sm-5 mt-3 mt-sm-0" />
        </Navbar.Collapse>
      </Navbar>
      <Menubar />
    </>
  );
}

export default MenubarWrapper;
