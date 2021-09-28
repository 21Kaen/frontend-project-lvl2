import parse from './parsers.js';
import getAST from './getAST.js';
import toFormat from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  const AST = getAST(obj1, obj2);
  return toFormat(AST, formatter);
};
export default genDiff;
