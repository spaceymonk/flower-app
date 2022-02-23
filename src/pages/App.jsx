import React from 'react';
import Footer from '../components/Footer';
import MenubarWrapper from '../components/menu/MenubarWrapper';
import Board from '../components/board/Board';
import useWindowDimensions from '../hooks/useWindowDimensions';

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
      <Board height={boardHeight} />
      <Footer ref={footerRef} />
    </>
  );
}

export default App;
