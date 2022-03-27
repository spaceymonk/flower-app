const CustomConnectionLine = ({ sourceX, sourceY, targetX, targetY }) => {
  return (
    <g>
      <rect x={sourceX - 3} y={sourceY - 3} width={6} height={6} fill="#000" r={3} stroke="#505050" strokeWidth={1.5} />
      <path fill="none" stroke="#505050" className="animated" d={`M${sourceX},${sourceY} ${targetX},${targetY}`} />
      <circle cx={targetX} cy={targetY} fill="#fff" r={4} stroke="#505050" strokeWidth={1.5} />
    </g>
  );
};

export default CustomConnectionLine;
