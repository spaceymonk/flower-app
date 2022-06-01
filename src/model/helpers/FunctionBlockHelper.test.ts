import { parseArgs } from './FunctionBlockHelper';

test('should empty', () => {
  expect(parseArgs('')).toEqual([]);
});

test('should parse quoted', () => {
  expect(parseArgs('""')).toEqual(['""']);
  expect(parseArgs('"a"')).toEqual(['"a"']);
  expect(parseArgs('"a,b"')).toEqual(['"a,b"']);
  expect(parseArgs('"a,b", c')).toEqual(['"a,b"', 'c']);
  expect(parseArgs('"a,b", c, "d"')).toEqual(['"a,b"', 'c', '"d"']);
  expect(parseArgs('a, "b,c", d')).toEqual(['a', '"b,c"', 'd']);
  expect(parseArgs('a, "b,c"')).toEqual(['a', '"b,c"']);
});

test('should parse enclosed', () => {
  expect(parseArgs('[]')).toEqual(['[]']);
  expect(parseArgs('()')).toEqual(['()']);
  expect(parseArgs('(1)')).toEqual(['(1)']);
  expect(parseArgs('[1,a,3,4]')).toEqual(['[1,a,3,4]']);
  expect(parseArgs('[a, "b", "", 4]')).toEqual(['[a, "b", "", 4]']);
  expect(parseArgs(' [ 1,   c ] ')).toEqual(['[ 1,   c ]']);
  expect(parseArgs('[a, [1, 2], 3]')).toEqual(['[a, [1, 2], 3]']);
  expect(parseArgs('[a, [1, 2]]')).toEqual(['[a, [1, 2]]']);
  expect(parseArgs('[[1, 2]]')).toEqual(['[[1, 2]]']);
  expect(parseArgs('[[1, 2],1]')).toEqual(['[[1, 2],1]']);
  expect(parseArgs('((1/3)-(+"5"))')).toEqual(['((1/3)-(+"5"))']);
});

test('should parse combinations', () => {
  expect(parseArgs('"a", [1,2,3], "b"')).toEqual(['"a"', '[1,2,3]', '"b"']);
  expect(parseArgs('"a", [1,2,3], "b", [4,5,6]')).toEqual(['"a"', '[1,2,3]', '"b"', '[4,5,6]']);
  expect(parseArgs('"a", [1,2,3], "b", [4,5,6], "c"')).toEqual(['"a"', '[1,2,3]', '"b"', '[4,5,6]', '"c"']);
  expect(parseArgs('[""]')).toEqual(['[""]']);
  expect(parseArgs('["[]"]')).toEqual(['["[]"]']);
  expect(parseArgs('["[a,b, \\",12\\"]"], 12')).toEqual(['["[a,b, \\",12\\"]"]', '12']);
  expect(parseArgs('[,]')).toEqual(['[,]']);
});

test('should throw error', () => {
  expect(() => parseArgs(',')).toThrow();
  expect(() => parseArgs('(')).toThrow();
  expect(() => parseArgs('(()')).toThrow();
  expect(() => parseArgs('((,)')).toThrow();
  expect(() => parseArgs('"')).toThrow();
  expect(() => parseArgs('"\\"')).toThrow();
  expect(() => parseArgs('\\"')).toThrow();
  expect(() => parseArgs('"""')).toThrow();
});

export {};
