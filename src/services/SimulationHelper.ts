import { Block } from '../types';
import { parse, eval as evaluate } from 'expression-eval';
import { throwErrorIfUndefined } from '../util';
import { toast } from 'react-toastify';

export type Memory = {
  [key: string]: any;
};

const stmtPattern = /^(([a-zA-Z_][a-zA-Z0-9_]*)(\[(.*)\])?\s*=\s*)?(.*)$/;

export const displayValue = (value: any): string => {
  if (typeof value === 'string') {
    return '"' + value + '"';
  }
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  if (typeof value === 'boolean') {
    return value ? 'T' : '';
  }
  if (value === null) {
    return 'null';
  }
  if (Array.isArray(value)) {
    return `[${value.map((v) => displayValue(v)).join(', ')}]`;
  }
  return '-';
};

export const evalStatementBlock = (block: Block, memory: React.MutableRefObject<Memory>): void => {
  const code = throwErrorIfUndefined(block.data.text).trim();

  const stmtMatch = code.match(stmtPattern);
  if (!stmtMatch) {
    throw new Error(`Invalid statement: ${code}`);
  }

  const lValue = stmtMatch[2];
  const lValueIndex = stmtMatch[4];
  const rValue = stmtMatch[5];

  if (!rValue) {
    throw new Error(`Invalid statement: ${code}`);
  }

  const ast = parse(rValue);
  const result = evaluate(ast, memory.current);

  if (lValue) {
    if (lValueIndex) {
      const indexAst = parse(lValueIndex);
      const indexResult = evaluate(indexAst, memory.current);
      memory.current[lValue][indexResult] = result;
    } else {
      memory.current[lValue] = result;
    }
  }
};

export const evalStoreBlock = (block: Block, memory: React.MutableRefObject<Memory>): void => {
  const code = throwErrorIfUndefined(block.data.text).trim();
  const tokens = code.split(', '); // @todo: bettter splitting!!!
  tokens.forEach((t) => {
    const variable = t.trim();
    const ast = parse(variable);
    const value = evaluate(ast, memory.current);
    toast.info(`${variable} = ${displayValue(value)}`);
  });
};

export const evalLoadBlock = (
  block: Block,
  inputParams: string,
  inputParamIter: React.MutableRefObject<number>,
  memory: React.MutableRefObject<Memory>
): void => {
  const code = throwErrorIfUndefined(block.data.text).trim();
  const tokens = code.split(', '); // @todo: bettter splitting!!!

  if (inputParams === '') {
    throw new Error('No input parameters');
  }
  const params = inputParams.split('\n');

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].trim();
    const param = params.at(inputParamIter.current);
    if (param === undefined) {
      throw new Error(`No input parameter at line ${inputParamIter.current + 1}`);
    }
    const ast = parse(param);
    const value = evaluate(ast, memory.current);
    memory.current[token] = value;
    inputParamIter.current = inputParamIter.current + 1;
  }
};

export const evalBranchingBlock = (block: Block, memory: React.MutableRefObject<Memory>): boolean => {
  const code = throwErrorIfUndefined(block.data.text).trim();
  const ast = parse(code.trim());
  const result = !!evaluate(ast, memory.current);
  return result;
};
