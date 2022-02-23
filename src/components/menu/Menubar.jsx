import { Stack, NavDropdown } from 'react-bootstrap';
import './menubar.css';

function Menubar() {
  return (
    <Stack id="menubar" direction="horizontal" className="bg-light">
      <NavDropdown className="p-0" title="File" id="nav-title-dropdown"></NavDropdown>
    </Stack>
  );
}

export default Menubar;
