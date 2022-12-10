import stylish from './stylish.js';
import plain from './plain.js';

export default (data, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      throw new Error(`This ${outputFormat} not support`);
  }
};
