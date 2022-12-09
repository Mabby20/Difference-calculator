import stylish from './stylish.js';

export default (data, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`This ${outputFormat} not support`);
  }
};
