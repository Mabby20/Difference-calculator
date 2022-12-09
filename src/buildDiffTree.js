import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const commonKeys = [...Object.keys(obj1), ...Object.keys(obj2)];
  const sortedUniqKeys = _.sortBy(_.uniq(commonKeys));

  const lines = sortedUniqKeys.map((currentKey) => {
    if (_.isObject(obj1[currentKey]) && _.isObject(obj2[currentKey])) {
      return { name: currentKey, type: 'nested', children: buildDiffTree(obj1[currentKey], obj2[currentKey]) };
    }

    if (_.has(obj1, currentKey) && !_.has(obj2, currentKey)) {
      return { name: currentKey, type: 'deleted', value: obj1[currentKey] };
    }

    if (!_.has(obj1, currentKey) && _.has(obj2, currentKey)) {
      return { name: currentKey, type: 'added', value: obj2[currentKey] };
    }

    if (obj2[currentKey] === obj1[currentKey]) {
      return { name: currentKey, type: 'unchanged', value: obj1[currentKey] };
    }
    return {
      name: currentKey, type: 'changed', before: obj1[currentKey], after: obj2[currentKey],
    };
  });
  return lines;
};
export default buildDiffTree;
