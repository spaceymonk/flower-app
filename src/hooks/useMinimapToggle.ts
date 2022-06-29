import React from 'react';

const useMinimapToggle = () => {
  const [minimapToggled, setMinimapToggled] = React.useState(true);
  const handleMinimapVisibility = () => {
    if (minimapToggled === false) {
      setMinimapToggled(true);
    } else {
      setMinimapToggled(false);
    }
  };

  return { minimapToggled, handleMinimapVisibility };
};

export default useMinimapToggle;
