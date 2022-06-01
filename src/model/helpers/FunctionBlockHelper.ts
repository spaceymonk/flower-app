export function parseArgs(args: string) {
  let cursor = 0;
  const result = [];
  const token = [];

  function readQuote() {
    token.push(args[cursor]);
    cursor++;
    while (args[cursor] !== '"' || (args[cursor] === '"' && args[cursor - 1] === '\\')) {
      if (args[cursor] === undefined) {
        throw new Error('Invalid argument');
      }
      token.push(args[cursor]);
      cursor++;
      if (cursor === args.length) {
        cursor--;
        if (args[cursor] !== '"' || (args[cursor] === '"' && args[cursor - 1] === '\\')) {
          throw new Error('Invalid arguments');
        } else {
          break;
        }
      }
    }
    token.push(args[cursor]);
    cursor++;
  }

  function readEnclosed(first: string, second: string) {
    token.push(args[cursor]);
    cursor++;
    let indent = 1;
    while (indent > 0) {
      if (args[cursor] === undefined) {
        throw new Error('Invalid argument');
      }
      if (args[cursor] === first) {
        indent++;
        token.push(args[cursor]);
        cursor++;
      } else if (args[cursor] === second) {
        indent--;
        token.push(args[cursor]);
        cursor++;
      } else if (args[cursor] === '"') {
        readQuote();
      } else {
        token.push(args[cursor]);
        cursor++;
      }
      if (cursor === args.length) {
        if (indent !== 0) {
          throw new Error('Invalid arguments');
        } else {
          break;
        }
      }
    }
  }

  while (cursor < args.length) {
    if (args[cursor] === '"') {
      readQuote();
      if (args[cursor] === '"') throw new Error('Invalid argument');
    } else if (args[cursor] === '(') {
      readEnclosed('(', ')');
      if (args[cursor] === '(') throw new Error('Invalid argument');
    } else if (args[cursor] === '[') {
      readEnclosed('[', ']');
      if (args[cursor] === '[') throw new Error('Invalid argument');
    }
    if (args[cursor] === ',') {
      const arg = token.join('').trim();
      if (arg.length === 0) {
        throw new Error('Invalid arguments');
      }
      result.push(arg);
      token.length = 0;
      cursor++;
    } else {
      token.push(args[cursor]);
      cursor++;
    }
  }
  const arg = token.join('').trim();
  if (arg.length !== 0) result.push(arg);

  return result;
}
