import React, { LegacyRef } from 'react';

const Footer = React.forwardRef(function (props, ref: LegacyRef<HTMLDivElement>) {
  return (
    <footer ref={ref} className="text-center fixed-bottom bg-light border border-1 user-select-none">
      <a className="text-decoration-none link-dark" href="https://spaceymonk.github.io/" target="_blank" rel="noreferrer">
        <small>&copy; spaceymonk</small>
      </a>
    </footer>
  );
});

export default Footer;
