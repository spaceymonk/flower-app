import React from 'react';
import Board from './Board';
import Toolbar from './Toolbar';

function BoardWrapper({ height, width }) {
  const [boardHeight, setBoardHeight] = React.useState(height);
  const toolbarRef = React.useRef(null);

  React.useEffect(() => {
    setBoardHeight(height - toolbarRef.current.clientHeight);
  }, [height]);

  return (
    <div>
      <Toolbar ref={toolbarRef} />
      <Board width={width} height={boardHeight} />
    </div>
  );
}

export default BoardWrapper;
