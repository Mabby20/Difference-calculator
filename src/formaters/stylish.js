import _ from 'lodash';

const getIndent = (depth, spacesCount = 4, replacer = ' ') => replacer.repeat(spacesCount * depth);

const stringify = (node, depth = 1) => {
  const repeatStr = getIndent(depth);
  const repeatBracket = getIndent(depth - 1);
  if (!_.isObject(node)) {
    return `${node}`;
  }
  const entries = Object.entries(node);
  const lines = entries.map(([key, value]) => `${repeatStr}${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...lines, `${repeatBracket}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const repeatForString = getIndent(depth).slice(0, -2);
    const repeatForBracket = getIndent(depth - 1);
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
        default:
          return `${repeatForString}  ${name}: ${stringify(value, depth + 1)}`;
      }
    });
    return ['{', ...res, `${repeatForBracket}}`].join('\n');
  };
  return iter(tree, 1);
};
export default stylish;
