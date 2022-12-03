import path from 'path';
import _ from 'lodash';
import parser from './parser.js';

const compare = (obj1, obj2) => {
  const commonKeys = [...Object.keys(obj1), ...Object.keys(obj2)];
  const uniqKeys = _.sortBy(_.uniq(commonKeys));

  const lines = uniqKeys.reduce((acc, currentKey) => {
    if (_.has(obj1, currentKey) && _.has(obj2, currentKey)) {
      if (obj2[currentKey] === obj1[currentKey]) {
        return [...acc, `    ${currentKey}: ${obj1[currentKey]}`];
      }
      return [...acc, `  - ${currentKey}: ${obj1[currentKey]}`, `  + ${currentKey}: ${obj2[currentKey]}`];
    }
    if (_.has(obj1, currentKey) && !_.has(obj2, currentKey)) {
      return [...acc, `  - ${currentKey}: ${obj1[currentKey]}`];
    }
    if (!_.has(obj1, currentKey) && _.has(obj2, currentKey)) {
      return [...acc, `  + ${currentKey}: ${obj2[currentKey]}`];
    }
    return acc;
  }, []);

  const res = ['{', ...lines, '}'].join('\n');
  return res;
};

const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath);

export default (filePath1, filePath2, type = 'json') => {
  const path1 = getAbsPath(filePath1);
  const path2 = getAbsPath(filePath2);
  const obj1 = parser(type, path1);
  const obj2 = parser(type, path2);
  const res = compare(obj1, obj2);
  return res;
};
