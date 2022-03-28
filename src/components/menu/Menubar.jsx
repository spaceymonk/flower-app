import { Stack, NavDropdown } from 'react-bootstrap';
import { AboutMenuItem } from './items/About';
import { DownloadMenuItem } from './items/Download';
import { ExportMenuItem } from './items/Export';
import { FindMenuItem } from './items/Find';
import { HowToMenuItem } from './items/HowTo';
import { InputSelectMenuItem } from './items/InputSelect';
import { NewMenuItem } from './items/New';
import { OpenMenuItem } from './items/Open';
import { SaveMenuItem } from './items/Save';
import { StatisticsMenuItem } from './items/Statistics';

import './menubar.css';

function Menubar() {
  return (
    <Stack id="menubar" direction="horizontal" className="bg-light user-select-none">
      <NavDropdown className="p-0" title="File" id="nav-title-dropdown">
        <NewMenuItem />
        <OpenMenuItem />
        <SaveMenuItem />
        <DownloadMenuItem />
        <NavDropdown.Divider />
        <ExportMenuItem />
      </NavDropdown>
      <NavDropdown className="p-0" title="Project" id="nav-project-dropdown">
        <FindMenuItem />
        <InputSelectMenuItem />
        <NavDropdown.Divider />
        <StatisticsMenuItem />
      </NavDropdown>
      <NavDropdown className="p-0" title="Help" id="nav-help-dropdown">
        <HowToMenuItem />
        <AboutMenuItem />
      </NavDropdown>
    </Stack>
  );
}

export default Menubar;
