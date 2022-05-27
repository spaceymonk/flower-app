export const displayValue = (value: any): string => {
  if (typeof value === 'string') {
    return '"' + value + '"';
  }
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  if (typeof value === 'boolean') {
    return value ? 'T' : 'F';
  }
  if (value === null) {
    return 'null';
  }
  if (Array.isArray(value)) {
    return `[${value.map((v) => displayValue(v)).join(', ')}]`;
  }
  return '-';
};
