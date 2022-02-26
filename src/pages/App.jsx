import React from 'react';
import Footer from '../components/common/Footer';
import MenubarWrapper from '../components/menu/MenubarWrapper';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, Toast } from 'react-bootstrap';
import Board from '../components/board/Board';
import Toolbar from '../components/board/Toolbar';
import { v4 as uuid } from 'uuid';

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
    setToastList(toastList.concat(toast));
  }
  function closeToast(key) {
    setToastList(toastList.filter((t) => t.key !== key));
  }

  return (
    <>
      <MenubarWrapper ref={menubarRef} showToast={showToast} />
      <Toolbar ref={toolbarRef} showToast={showToast} />
      <Board width={window.width} height={boardHeight} showToast={showToast} />
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
                  <small>{t.subtitle}</small>
                </Toast.Header>
                <Toast.Body>{t.body}</Toast.Body>
              </Toast>
            );
          })}
      </ToastContainer>
    </>
  );
}

export default App;
