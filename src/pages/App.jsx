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
import generateProjectName from 'project-name-generator';

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
  const [toastList, setToastList] = React.useState([]);
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

  function showToast(toast) {
    toast.key = uuid();
    if (!toast.subtitle) toast.subtitle = Moment().format(T.app.dateFormat);
    setToastList((list) => [...list, toast]);
  }
  function closeToast(key) {
    setToastList((list) => list.filter((t) => t.key !== key));
  }

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
        showToast: showToast,
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
