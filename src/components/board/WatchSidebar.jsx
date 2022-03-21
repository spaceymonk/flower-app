import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faGlasses, faRemove, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Button, Offcanvas, Tooltip, Table, Form } from 'react-bootstrap';
import T from '../../services/MessageConstants';
import CustomOverlay from '../common/CustomOverlay';
import { v1 as uuid } from 'uuid';
import useToggle from '../../hooks/useToggle';
import { SimulationContext } from '../../providers/SimulationProvider';

function WatchSidebar() {
  const { isRunning } = React.useContext(SimulationContext);
  const [showSidbar, toggleSidebar] = useToggle();

  const [watchList, setWatchList] = React.useState([]);

  return (
    <>
      <CustomOverlay placement="bottom" overlay={<Tooltip>{T.watchesSidebar.tooltip}</Tooltip>}>
        <Button onClick={toggleSidebar} disabled={!isRunning()}>
          <FontAwesomeIcon icon={faGlasses} />
        </Button>
      </CustomOverlay>

      <Offcanvas show={showSidbar} onHide={toggleSidebar} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{T.watchesSidebar.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <WatchesTable watchList={watchList} setWatchList={setWatchList} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function WatchesTable({ watchList, setWatchList }) {
  const textRef = React.useRef(null);

  const addWatch = () => {
    const expr = textRef.current.value.trim();
    if (expr.length > 0) setWatchList((list) => list.concat({ key: uuid(), expr: expr, val: Math.random() }));
  };
  const removeWatch = (key) => {
    setWatchList((list) => list.filter((w) => w.key !== key));
  };
  const removeAllWatches = (key) => {
    setWatchList([]);
  };
  const handleExpressionChange = (event, key) => {
    const newExpr = event.target.value;
    if (newExpr) {
      setWatchList((list) => list.map((w) => (w.key === key ? { ...w, expr: newExpr } : w)));
    } else {
      removeWatch(key);
    }
  };

  React.useEffect(() => {
    // todo: get all variables in blocks

    textRef.current.value = '';
  }, [watchList]);

  return (
    <div>
      <Table hover striped size="sm">
        <thead>
          <tr>
            <th>Expression</th>
            <th className="text-end">Value</th>
            <th className="text-end">
              <Button variant="danger" size="sm" onClick={removeAllWatches}>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {watchList.map((w) => (
            <tr key={w.key}>
              <td>
                <Form.Control
                  size="sm"
                  type="text"
                  onChange={(event) => handleExpressionChange(event, w.key)}
                  placeholder="Expression..."
                  defaultValue={w.expr}
                  plaintext
                />
              </td>
              <td>
                <Form.Control size="sm" type="text" placeholder="Value..." readOnly defaultValue={w.val} plaintext />
              </td>
              <td className="d-flex-inline text-end align-items-center">
                <Button variant="danger" size="sm" onClick={() => removeWatch(w.key)}>
                  <FontAwesomeIcon icon={faRemove} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <Form.Control
                ref={textRef}
                type="text"
                placeholder="Expression..."
                onKeyDown={(event) => {
                  if (event.key === 'Enter') addWatch();
                }}
              />
            </td>
            <td className="text-end">
              <Button variant="primary" onClick={addWatch}>
                <FontAwesomeIcon icon={faArrowUp} />
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default WatchSidebar;
