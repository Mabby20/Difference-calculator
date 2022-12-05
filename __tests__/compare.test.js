import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import compare from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');
const data = [
  ['file1.json', 'file2.json', 'stylish.txt'],
  ['file1.yaml', 'file2.yaml', 'stylish.txt'],
  ['file1.yml', 'file2.yml', 'stylish.txt'],
];

describe('check compare', () => {
  test.each(data)('compare test %s, %s, %s', (firstFile, secondFile, stylishFile) => {
    const expectedResult = readFixture(stylishFile).trim();
    const actualResult = compare(getFixturePath(firstFile), getFixturePath(secondFile));
    expect(actualResult).toBe(expectedResult);
  });
});
