import React from 'react';
import Footer from '../components/common/Footer';
import MenubarWrapper from '../components/menu/MenubarWrapper';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Board from '../components/board/Board';
import Toolbar from '../components/board/Toolbar';
import { ReactFlowProvider } from 'react-flow-renderer';
import generateProjectName from 'project-name-generator';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Initial {
  constructor() {
    this.title = window.localStorage.getItem('title') || generateProjectName().dashed;
    this.defaultNodes = JSON.parse(window.localStorage.getItem('nodes')) || [];
    this.defaultEdges = JSON.parse(window.localStorage.getItem('edges')) || [];
    this.inputParams = window.localStorage.getItem('inputParams') || '';
  }
}

export const initials = new Initial();
export const AppContext = React.createContext();

function App() {
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

  const [title, setTitle] = React.useState(initials.title);
  const [defaultNodes, setDefaultNodes] = React.useState(initials.defaultNodes);
  const [defaultEdges, setDefaultEdges] = React.useState(initials.defaultEdges);
  const [inputParams, setInputParams] = React.useState(initials.inputParams);
  const [isRunning, setRunning] = React.useState(false);

  return (
    <AppContext.Provider
      value={{
        isRunning: () => isRunning,
        setRunning: setRunning,
        getTitle: () => title,
        setTitle: setTitle,
        getDefaultNodes: () => defaultNodes,
        setDefaultNodes: setDefaultNodes,
        getDefaultEdges: () => defaultEdges,
        setDefaultEdges: setDefaultEdges,
        getInputParams: () => inputParams,
        setInputParams: setInputParams,
      }}
    >
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
