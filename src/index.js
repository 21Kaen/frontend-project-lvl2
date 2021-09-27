import parse from './parsers.js';
import getAST from './getAST.js';
import ASTtoString from './ASTtoString.js';
import ASTtoPlain from './plain.js';

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  const AST = getAST(obj1, obj2);
  if (formatter === 'stylish') {
    return ASTtoString(AST);
  }
  if (formatter === 'plain') {
    return ASTtoPlain(AST, '');
  }
};
export default genDiff;
