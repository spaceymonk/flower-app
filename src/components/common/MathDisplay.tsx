import PropTypes from 'prop-types';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

import './MathDisplay.css';

export function MathDisplay({ text, display }: MathDisplayProps) {
  let expr = '$' + text + '$';
  if (display) expr = '$$' + text + '$$';
  return (
    <MathJaxContext config={config} version={3}>
      <MathJax dynamic inline>
        {expr}
      </MathJax>
    </MathJaxContext>
  );
}

MathDisplay.propTypes = {
  text: PropTypes.string.isRequired,
  display: PropTypes.bool,
};

export interface MathDisplayProps extends PropTypes.InferProps<typeof MathDisplay.propTypes> {}

const config = {
  loader: { load: ['[tex]/html'] },
  tex: {
    packages: { '[+]': ['html'] },
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
  },
};
