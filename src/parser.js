import yaml from 'js-yaml';

export default (formatName, data) => {
  switch (formatName) {
    case 'json':
      return JSON.parse(data);

    case 'yml':
    case 'yaml':
      return yaml.load(data);

    default:
      throw new Error(`This ${formatName} is not used`);
  }
};
