import { Block } from '../types';
import { parse, eval as evaluate } from 'expression-eval';
import { throwErrorIfUndefined } from '../util';

export type Memory = {
  [key: string]: any;
};

const stmtPattern = /^(([a-zA-Z_][a-zA-Z0-9_]*)(\[(.*)\])?\s*=\s*)?(.*)$/;

export const evalStatementBlock = (block: Block, memory: Memory = {}): void => {
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
  const result = evaluate(ast, memory);

  if (lValue) {
    if (lValueIndex) {
      const indexAst = parse(lValueIndex);
      const indexResult = evaluate(indexAst, memory);
      memory[lValue][indexResult] = result;
    } else {
      memory[lValue] = result;
    }
  } else {
    console.log('result', result);
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
