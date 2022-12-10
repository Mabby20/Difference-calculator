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
    switch (type) {
      case 'nested':
        const curPath = [...path, name];
        return children.flatMap((child) => iter(child, curPath));

      case 'deleted':
        return `Property '${[...path, name].join('.')}' was removed`;

      case 'added':
        return `Property '${[...path, name].join('.')}' was added with value: ${getOutputValue(value)}`;

      case 'changed':
        return `Property '${[...path, name].join('.')}' was updated. From ${getOutputValue(before)} to ${getOutputValue(after)}`;

      case 'unchanged':
        return [];

      default:
        throw new Error(`This ${type} is not defined`);
    }
  };
  return iter(data, []);
};

export default (tree) => tree.flatMap(buildLine).join('\n');
