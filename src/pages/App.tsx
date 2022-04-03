import React from 'react';
import Footer from '../components/common/Footer';
import MenubarWrapper from '../components/menu/MenubarWrapper';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Board from '../components/board/Board';
import Toolbar from '../components/toolbar/Toolbar';
import { ReactFlowProvider } from 'react-flow-renderer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import useAlert from '../hooks/useAlert';
import { AppProvider } from '../providers/AppProvider';
import { SimulationProvider } from '../providers/SimulationProvider';
import { throwErrorIfNull } from '../services/common';

function App() {
  const [boardHeight, setBoardHeight] = React.useState(1);
  const toolbarRef = React.useRef(null);
  const menubarRef = React.useRef(null);
  const footerRef = React.useRef(null);
  const windowDim = useWindowDimensions();

  React.useEffect(() => {
    setBoardHeight(
      windowDim.height -
        throwErrorIfNull(menubarRef.current).clientHeight -
        throwErrorIfNull(footerRef.current).clientHeight -
        throwErrorIfNull(toolbarRef.current).clientHeight
    );
  }, [windowDim.height]);

  useAlert();

  return (
    <AppProvider>
      <SimulationProvider>
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
      </SimulationProvider>
    </AppProvider>
  );
}

export default App;
