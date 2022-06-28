import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { Button, Offcanvas, Table, Tooltip } from 'react-bootstrap';
import T from '../../../config/MessageConstants';
import CustomOverlay from '../../common/CustomOverlay';
import useToggle from '../../../hooks/useToggle';
import { useSimulationContext } from '../../../providers/SimulationProvider';
import { displayValue } from '../../../services/helpers/SimulationHelper';

function WatchSidebar() {
  const { isRunning, variableTableRef } = useSimulationContext();
  const [showSidebar, toggleSidebar] = useToggle();

  return (
    <>
      <CustomOverlay placement="bottom" overlay={<Tooltip>{T.watchesSidebar.tooltip}</Tooltip>}>
        <Button onClick={toggleSidebar} aria-label='toggle watches'>
          <FontAwesomeIcon icon={faGlasses} />
        </Button>
      </CustomOverlay>

      <Offcanvas show={showSidebar} onHide={toggleSidebar} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{T.watchesSidebar.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ filter: isRunning() ? 'opacity(1)' : 'opacity(.5)' }}>
          {Object.keys(variableTableRef.current).length <= 1 ? (
            <p>{T.watchesSidebar.empty}</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>{T.watchesSidebar.table.name}</th>
                  <th>{T.watchesSidebar.table.value}</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(variableTableRef.current)
                  .slice(1, undefined)
                  .map((key) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{displayValue(variableTableRef.current[key])}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default WatchSidebar;
