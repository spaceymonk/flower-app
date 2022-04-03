import React from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = React.useState(initialState);
  const toggle = React.useCallback((overrideState: any) => {
    if ('boolean' == typeof overrideState) {
      setState(() => overrideState);
    } else {
      setState((state) => !state);
    }
  }, []);
  return [state, toggle];
};

export default useToggle;
