import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { Button, Offcanvas, Table, Tooltip } from 'react-bootstrap';
import T from '../../../services/MessageConstants';
import CustomOverlay from '../../common/CustomOverlay';
import useToggle from '../../../hooks/useToggle';
import { useSimulationContext } from '../../../providers/SimulationProvider';
import { Memory } from '../../../services/SimulationHelper';

const displayValue = (value: any): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (value === null) {
    return 'null';
  }
  if (Array.isArray(value)) {
    return `[${value.map(v => displayValue(v)).join(', ')}]`;
  }
  return '-';
}

function WatchSidebar() {
  const { isRunning, getVariableTable } = useSimulationContext();
  const [showSidebar, toggleSidebar] = useToggle();

  const variableTable: Memory = React.useMemo(getVariableTable, [getVariableTable]);

  return (
    <>
      <CustomOverlay placement="bottom" overlay={<Tooltip>{T.watchesSidebar.tooltip}</Tooltip>}>
        <Button onClick={toggleSidebar} disabled={!isRunning()}>
          <FontAwesomeIcon icon={faGlasses} />
        </Button>
      </CustomOverlay>

      <Offcanvas show={showSidebar} onHide={toggleSidebar} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{T.watchesSidebar.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Table>
            <thead>
              <tr>
                <th>{T.watchesSidebar.table.name}</th>
                <th>{T.watchesSidebar.table.value}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(variableTable).map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{displayValue(variableTable[key])}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default WatchSidebar;
