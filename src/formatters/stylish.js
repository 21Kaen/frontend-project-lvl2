import _ from 'lodash';

const valueToString = (objValue, depth) => {
  if (!_.isObject(objValue)) {
    return `${objValue}`;
  }
  const lines = Object
    .entries(objValue)
    .map(([key, value]) => `${' '.repeat(depth + 8)}${key}: ${valueToString(value, depth + 4)}`);
  return ['{', ...lines, `${' '.repeat(depth + 4)}}`].join('\n');
};
const ASTtoString = (data, depth = 0) => {
  const outSpaces = ' '.repeat(depth);
  const inSpaces = ' '.repeat(depth + 2);
  const lines = data.map((obj) => {
    if (obj.type === 'remove') {
      return `${inSpaces}- ${obj.key}: ${valueToString(obj.value, depth)}`;
    }
    if (obj.type === 'same') {
      return `${inSpaces}  ${obj.key}: ${valueToString(obj.value, depth)}`;
    }
    if (obj.type === 'updated') {
      return `${inSpaces}- ${obj.key}: ${valueToString(obj.valueBefore, depth)}\n${inSpaces}+ ${obj.key}: ${valueToString(obj.valueAfter, depth)}`;
    }
    if (obj.type === 'add') {
      return `${inSpaces}+ ${obj.key}: ${valueToString(obj.value, depth)}`;
    }
    return `${inSpaces}  ${obj.key}: ${ASTtoString(obj.value, depth + 4)}`;
  });
  return ['{', ...lines, `${outSpaces}}`].join('\n');
};
export default ASTtoString;
