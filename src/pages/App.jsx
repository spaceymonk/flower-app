import React from 'react';
import Footer from '../components/common/Footer';
import MenubarWrapper from '../components/menu/MenubarWrapper';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, Toast } from 'react-bootstrap';
import Board from '../components/board/Board';
import Toolbar from '../components/board/Toolbar';
import { v1 as uuid } from 'uuid';
import { ReactFlowProvider } from 'react-flow-renderer';
import Moment from 'moment';
import T from '../services/MessageConstants';

function App() {
  const [toastList, setToastList] = React.useState([]);
  const [boardHeight, setBoardHeight] = React.useState(1);
  const toolbarRef = React.useRef(null);
  const menubarRef = React.useRef(null);
  const footerRef = React.useRef(null);
  const window = useWindowDimensions();

  React.useEffect(() => {
    setBoardHeight(
      window.height - menubarRef.current.clientHeight - footerRef.current.clientHeight - toolbarRef.current.clientHeight
    );
  }, [window.height]);

  function showToast(toast) {
    toast.key = uuid();
    if (!toast.subtitle) toast.subtitle = Moment().format(T.app.dateFormat);
    setToastList((list) => [...list, toast]);
  }
  function closeToast(key) {
    setToastList((list) => list.filter((t) => t.key !== key));
  }

  return (
    <ReactFlowProvider>
      <MenubarWrapper ref={menubarRef} showToast={showToast} />
      <Toolbar ref={toolbarRef} showToast={showToast} />
      <Board height={boardHeight} showToast={showToast} />
      <Footer ref={footerRef} />
      <ToastContainer className="pb-5 px-1" position="bottom-center" style={{ zIndex: '1060' }}>
        {toastList
          .filter((t, i) => i < 2)
          .map((t) => {
            return (
              <Toast key={t.key} show={true} delay={5000} autohide animation={false} onClose={() => closeToast(t.key)}>
                <Toast.Header>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <strong className="me-auto ms-2">{t.title}</strong>
                  <small className="text-end">{t.subtitle}</small>
                </Toast.Header>
                {t.body && <Toast.Body>{t.body}</Toast.Body>}
              </Toast>
            );
          })}
      </ToastContainer>
    </ReactFlowProvider>
  );
}

export default App;
