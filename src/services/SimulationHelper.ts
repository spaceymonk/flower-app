import { Block } from '../types';
import { parse, eval as evaluate } from 'expression-eval';
import { throwErrorIfUndefined } from '../util';

export type Memory = {
  [key: string]: any;
};

const lValuePattern = /^([a-zA-Z_][a-zA-Z0-9_]*)(\[(.*)\])?$/;

export const evalStatementBlock = (block: Block, memory: Memory = {}): void => {
  const code = throwErrorIfUndefined(block.data.text).trim();
  const tokens = code.split(' ');
  if (tokens.length < 3) {
    throw new Error('Syntax error: invalid statement block');
  }
  const lValue = tokens[0];
  const operator = tokens[1];
  const rValue = tokens.slice(2).join(' ');
  const match = lValue.match(lValuePattern);

  if (!match) {
    throw new Error('Syntax error: invalid l-value');
  }
  if (operator !== '=') {
    throw new Error('Syntax error: invalid operator');
  }

  const ast = parse(rValue);
  const result = evaluate(ast, memory);

  const lValueName = match[1];
  if (match[3] !== undefined) {
    const lValueIndex = match[3];
    const indexAst = parse(lValueIndex);
    const indexResult = evaluate(indexAst, memory);
    memory[lValueName][indexResult] = result;
  } else {
    memory[lValueName] = result;
  }
};

export const evalStoreBlock = (block: Block, memory: Memory = {}): void => {
  const code = throwErrorIfUndefined(block.data.text).trim();
  const tokens = code.split(', '); // @todo: bettter splitting!!!
  tokens.forEach((t) => {
    const variable = t.trim();
    const ast = parse(variable);
    const value = evaluate(ast, memory);
    console.log('OUTPUT: ', value);
  });
};

export const evalBranchingBlock = (block: Block, memory: Memory = {}): boolean => {
  const code = throwErrorIfUndefined(block.data.text).trim();
  const ast = parse(code.trim());
  const result = evaluate(ast, memory);
  return result;
};
