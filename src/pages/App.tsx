import React from 'react';
import Footer from '../components/common/Footer';
import MenubarWrapper from '../components/menu/MenubarWrapper';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Board from '../components/board/Board';
import Toolbar from '../components/toolbar/Toolbar';
import { ReactFlowProvider } from 'react-flow-renderer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AppProvider } from '../providers/AppProvider';
import { SimulationProvider } from '../providers/SimulationProvider';
import { throwErrorIfNull } from '../util/common';
import { ServiceProvider } from '../providers/ServiceProvider';

function App() {
  const [boardHeight, setBoardHeight] = React.useState(1);
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const menubarRef = React.useRef<HTMLDivElement>(null);
  const footerRef = React.useRef<HTMLDivElement>(null);
  const windowDim = useWindowDimensions();

  // This is a workaround for the issue that the board is not rendered correctly when the window is resized.
  React.useEffect(() => {
    setBoardHeight(
      windowDim.height -
        throwErrorIfNull(menubarRef.current).clientHeight -
        throwErrorIfNull(footerRef.current).clientHeight -
        throwErrorIfNull(toolbarRef.current).clientHeight
    );
  }, [windowDim.height]);

  // Alert user if user leaves the page
  const alertUser = React.useCallback((e) => {
    e.preventDefault();
    e.returnValue = '';
  }, []);
  React.useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, [alertUser]);

  return (
    <AppProvider>
      <SimulationProvider>
        <ReactFlowProvider>
          <ServiceProvider>
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
          </ServiceProvider>
        </ReactFlowProvider>
      </SimulationProvider>
    </AppProvider>
  );
}

export default App;
