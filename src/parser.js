import yaml from 'js-yaml';

export default (extension, data) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data);

    case 'yml':
    case 'yaml':
      return yaml.load(data);

    default:
      throw new Error(`This ${extension} is not used`);
  }
};
