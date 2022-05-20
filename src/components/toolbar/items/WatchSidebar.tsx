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

  /* --------------------------- anti-pattern start --------------------------- */
  const [, forceRender] = React.useState<Date>(new Date());
  const intervalRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (isRunning()) {
      intervalRef.current = setInterval(() => {
        forceRender(new Date());
      }, 200);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isRunning]);
  /* ---------------------------- anti-pattern end ---------------------------- */

  return (
    <>
      <CustomOverlay placement="bottom" overlay={<Tooltip>{T.watchesSidebar.tooltip}</Tooltip>}>
        <Button onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faGlasses} />
        </Button>
      </CustomOverlay>

      <Offcanvas show={showSidebar} onHide={toggleSidebar} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{T.watchesSidebar.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ filter: isRunning() ? 'opacity(1)' : 'opacity(.5)' }}>
          <Table>
            <thead>
              <tr>
                <th>{T.watchesSidebar.table.name}</th>
                <th>{T.watchesSidebar.table.value}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(variableTableRef.current).map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{displayValue(variableTableRef.current[key])}</td>
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
