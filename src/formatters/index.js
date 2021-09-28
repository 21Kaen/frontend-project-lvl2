import toStylish from './stylish.js';
import toPlain from './plain.js';
import toJson from './json.js';

const toFormat = (AST, formatter) => {
  if (formatter === 'stylish') {
    return toStylish(AST);
  }
  if (formatter === 'plain') {
    return toPlain(AST);
  }
  if (formatter === 'json') {
    return toJson(AST);
  }
  throw new Error('Формат не поддерживается');
};
export default toFormat;
