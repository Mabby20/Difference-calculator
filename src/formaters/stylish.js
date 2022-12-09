import _ from 'lodash';

const getIndent = (depth, count = 4, replacer = ' ') => replacer.repeat(count * depth);

const stringify = (node, depth = 1) => {
  const repeatStr = getIndent(depth, 4, ' ');
  const repeatBrck = getIndent(depth - 1, 4, ' ');
  if (!_.isObject(node)) {
    return `${node}`;
  }
  const entries = Object.entries(node);
  const lines = entries.map(([key, value]) => `${repeatStr}${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...lines, `${repeatBrck}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const repeatForString = getIndent(depth, 4, ' ').slice(0, -2);
    const repeatForBracket = getIndent(depth - 1, 4, ' ');
    const res = node.map((currentElement) => {
      const {
        name, type, value, children, before, after,
      } = currentElement;
      switch (type) {
        case 'nested':
          return `${repeatForString}  ${name}: ${iter(children, depth + 1)}`;

        case 'deleted':
          return `${repeatForString}- ${name}: ${stringify(value, depth + 1)}`;

        case 'added':
          return `${repeatForString}+ ${name}: ${stringify(value, depth + 1)}`;

        case 'changed':
          return [
            `${repeatForString}- ${name}: ${stringify(before, depth + 1)}`,
            `${repeatForString}+ ${name}: ${stringify(after, depth + 1)}`,
          ].join('\n');

        case 'unchanged':
          return `${repeatForString}  ${name}: ${stringify(value, depth + 1)}`;
        default:
          throw new Error(`this ${type} is not defined`);
      }
    });
    return ['{', ...res, `${repeatForBracket}}`].join('\n');
  };
  return iter(tree, 1);
};
export default stylish;
