import PropTypes from 'prop-types';

function CustomConnectionLine({ sourceX, sourceY, targetX, targetY }: PropTypes.InferProps<typeof CustomConnectionLine.propTypes>) {
  return (
    <g>
      <rect x={sourceX - 3} y={sourceY - 3} width={6} height={6} fill="#000" r={3} stroke="#505050" strokeWidth={1.5} />
      <path fill="none" stroke="#505050" className="animated" d={`M${sourceX},${sourceY} ${targetX},${targetY}`} />
      <circle cx={targetX} cy={targetY} fill="#fff" r={4} stroke="#505050" strokeWidth={1.5} />
    </g>
  );
}

CustomConnectionLine.propTypes = {
  sourceX: PropTypes.number.isRequired,
  sourceY: PropTypes.number.isRequired,
  targetX: PropTypes.number.isRequired,
  targetY: PropTypes.number.isRequired,
};

export default CustomConnectionLine;
