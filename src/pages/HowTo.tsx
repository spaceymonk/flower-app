import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Tooltip } from 'react-bootstrap';
import CustomOverlay from '../components/common/CustomOverlay';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import html from '../config/HowToText';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { throwErrorIfNull } from '../util/common';

function HowTo() {
  const [frameHeight, setFrameHeight] = React.useState(0);
  const navbarRef = React.useRef<HTMLDivElement>(null);
  const footerRef = React.useRef<HTMLDivElement>(null);
  const windowDim = useWindowDimensions();

  // This is a workaround for the issue that the frame is not rendered correctly when the window is resized.
  React.useEffect(() => {
    setFrameHeight(windowDim.height - throwErrorIfNull(navbarRef.current).clientHeight - throwErrorIfNull(footerRef.current).clientHeight);
  }, [windowDim.height]);

  return (
    <>
      <Navbar ref={navbarRef}>
        <CustomOverlay overlay={<Tooltip>Return to application</Tooltip>}>
          <Button variant="outline-secondary" className="ms-auto" size="sm">
            <FontAwesomeIcon icon={faAngleLeft} />
          </Button>
        </CustomOverlay>
      </Navbar>
      <iframe title="How To" width="100%" height={frameHeight + 'px'} src={'data:text/html;base64,' + html} />
      <Footer ref={footerRef} />
    </>
  );
}

export default HowTo;
