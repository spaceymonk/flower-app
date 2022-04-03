import React from 'react';

const useAlert = () => {
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
};

export default useAlert;