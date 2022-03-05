import React from 'react';
import Footer from '../components/common/Footer';
import MenubarWrapper from '../components/menu/MenubarWrapper';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { ToastContainer } from 'react-bootstrap';
import Board from '../components/board/Board';
import Toolbar from '../components/board/Toolbar';
import { v1 as uuid } from 'uuid';
import { ReactFlowProvider } from 'react-flow-renderer';
import Moment from 'moment';
import T from '../services/MessageConstants';
import { CustomToast } from '../components/common/CustomToast';

export const AppContext = React.createContext();

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
    <AppContext.Provider value={{ showToast: showToast }}>
      <ReactFlowProvider>
        <MenubarWrapper ref={menubarRef} />
        <Toolbar ref={toolbarRef} />
        <Board height={boardHeight} />
        <Footer ref={footerRef} />
        <ToastContainer className="pb-5 px-1" position="bottom-center" style={{ zIndex: '1060' }}>
          {toastList
            .filter((t, i) => i < 2)
            .map((t) => (
              <CustomToast key={t.key} toast={t} onClose={closeToast} />
            ))}
        </ToastContainer>
      </ReactFlowProvider>
    </AppContext.Provider>
  );
}

export default App;
