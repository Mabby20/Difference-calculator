import _ from 'lodash';

const getOutputValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const buildLine = (data) => {
  const iter = (node, path) => {
    const {
      name, type, children, value, before, after,
    } = node;
    const currentPath = [...path, name];
    switch (type) {
      case 'nested':
        return children.flatMap((child) => iter(child, currentPath));

      case 'deleted':
        return `Property '${currentPath.join('.')}' was removed`;

      case 'added':
        return `Property '${currentPath.join('.')}' was added with value: ${getOutputValue(value)}`;

      case 'changed':
        return `Property '${currentPath.join('.')}' was updated. From ${getOutputValue(before)} to ${getOutputValue(after)}`;

      case 'unchanged':
      default:
        return [];
    }
  };
  return iter(data, []);
};

export default (tree) => tree.flatMap(buildLine).join('\n');
