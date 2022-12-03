import fs from 'fs';
import yaml from 'js-yaml';

export default (type, path) => {
  switch (type) {
    case 'json':
      return JSON.parse(fs.readFileSync(path, 'utf8'));

    case 'yml':
      return yaml.load(fs.readFileSync(path, 'utf8'));

    case 'yaml':
      return yaml.load(fs.readFileSync(path, 'utf8'));

    default:
      throw new Error(`This ${type} is not used`);
  }
};
