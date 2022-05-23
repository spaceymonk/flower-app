import PropTypes from 'prop-types';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

export function MathDisplay({ text }: MathDisplayProps) {
  return (
    <MathJaxContext config={config} version={3}>
      <MathJax dynamic inline>
        {text}
      </MathJax>
    </MathJaxContext>
  );
}

MathDisplay.propTypes = {
  text: PropTypes.string.isRequired,
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
