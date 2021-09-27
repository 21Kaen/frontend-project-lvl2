import _ from 'lodash';

const getAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, type: 'same', value: obj1[key] };
    }

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { key, type: 'add', value: obj2[key] };
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { key, type: 'remove', value: obj1[key] };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', value: getAST(obj1[key], obj2[key]) };
    }

    return {
      key, type: 'updated', valueBefore: obj1[key], valueAfter: obj2[key],
    };
  });
  return result;
};
export default getAST;
