import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import buildDiffTree from './buildDiffTree.js';
import getOutput from './formaters/index.js';

const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath);
const getExtension = (filePath) => path.parse(filePath).ext.slice(1);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

export default (filePath1, filePath2, outputFormat = 'stylish') => {
  const path1 = getAbsPath(filePath1);
  const path2 = getAbsPath(filePath2);

  const ext1 = getExtension(filePath1);
  const ext2 = getExtension(filePath2);

  const data1 = readFile(path1);
  const data2 = readFile(path2);

  const obj1 = parser(ext1, data1);
  const obj2 = parser(ext2, data2);

  const data = buildDiffTree(obj1, obj2);
  const output = getOutput(data, outputFormat);

  return output;
};
