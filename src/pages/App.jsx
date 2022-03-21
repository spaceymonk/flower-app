import React from 'react';
import Footer from '../components/common/Footer';
import MenubarWrapper from '../components/menu/MenubarWrapper';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Board from '../components/board/Board';
import Toolbar from '../components/board/Toolbar';
import { ReactFlowProvider } from 'react-flow-renderer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import useAppContextInitials from '../hooks/project/useAppContextInitials';
import useAlert from '../hooks/useAlert';

export const AppContext = React.createContext();

function App() {
  const appContext = useAppContextInitials();

  const [boardHeight, setBoardHeight] = React.useState(1);
  const toolbarRef = React.useRef(null);
  const menubarRef = React.useRef(null);
  const footerRef = React.useRef(null);
  const windowDim = useWindowDimensions();

  React.useEffect(() => {
    setBoardHeight(
      windowDim.height -
        menubarRef.current.clientHeight -
        footerRef.current.clientHeight -
        toolbarRef.current.clientHeight
    );
  }, [windowDim.height]);

  useAlert();

  return (
    <AppContext.Provider value={appContext}>
      <ReactFlowProvider>
        <MenubarWrapper ref={menubarRef} />
        <Toolbar ref={toolbarRef} />
        <Board height={boardHeight} />
        <Footer ref={footerRef} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={2}
        />
      </ReactFlowProvider>
    </AppContext.Provider>
  );
}

export default App;
