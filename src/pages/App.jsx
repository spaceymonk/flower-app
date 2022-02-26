import React from 'react';
import Footer from '../components/common/Footer';
import MenubarWrapper from '../components/menu/MenubarWrapper';
import useWindowDimensions from '../hooks/useWindowDimensions';
import BoardWrapper from '../components/board/BoardWrapper';

function App() {
  const [boardHeight, setBoardHeight] = React.useState(0);
  const menubarRef = React.useRef(null);
  const footerRef = React.useRef(null);
  const window = useWindowDimensions();

  React.useEffect(() => {
    setBoardHeight(window.height - menubarRef.current.clientHeight - footerRef.current.clientHeight);
  }, [window.height]);

  return (
    <>
      <MenubarWrapper ref={menubarRef} />
      <BoardWrapper height={boardHeight} width={window.width} />
      <Footer ref={footerRef} />
    </>
  );
}

export default App;
