const display = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (value === null) {
    return null;
  }
  return value;
};
const ASTtoPlain = (data, father = '') => {
  const filterData = data.filter((obj) => obj.type !== 'same');
  const lines = filterData.map((obj) => {
    if (obj.type === 'remove') {
      return `Property '${father}${obj.key}' was removed`;
    }
    if (obj.type === 'updated') {
      return `Property '${father}${obj.key}' was updated. From ${display(obj.valueBefore)} to ${display(obj.valueAfter)}`;
    }
    if (obj.type === 'add') {
      return `Property '${father}${obj.key}' was added with value: ${display(obj.value)}`;
    }
    return ASTtoPlain(obj.value, `${father}${obj.key}.`);
  });
  return [...lines].join('\n');
};
export default ASTtoPlain;
