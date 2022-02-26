import React from 'react';

const Footer = React.forwardRef(function (props, ref) {
  return (
    <footer ref={ref} className="text-center fixed-bottom bg-light border border-1">
      <a className="text-decoration-none link-secondary" href="https://spaceymonk.github.io/">
        <small>&copy; spaceymonk</small>
      </a>
    </footer>
  );
});

export default Footer;
