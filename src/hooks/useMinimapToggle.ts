import React from 'react';
import { faMap as filledMap } from '@fortawesome/free-solid-svg-icons';
import { faMap as emptyMap } from '@fortawesome/free-regular-svg-icons';

const useMinimapToggle = () => {
  const [minimapIcon, setMinimapIcon] = React.useState(filledMap);
  const [minimapToggled, setMinimapToggled] = React.useState(true);
  const handleMinimapVisibility = () => {
    if (minimapToggled === false) {
      setMinimapIcon(filledMap);
      setMinimapToggled(true);
    } else {
      setMinimapIcon(emptyMap);
      setMinimapToggled(false);
    }
  };

  return { minimapIcon, minimapToggled, handleMinimapVisibility };
};

export default useMinimapToggle;
