import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const data2 = [
  ['file1.json', 'file2.json', 'expected-stylish.txt', 'stylish'],
  ['file1.yaml', 'file2.yaml', 'expected-stylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'expected-plain.txt', 'plain'],
  ['file1.yaml', 'file2.yaml', 'expected-plain.txt', 'plain'],
];

describe('check compare', () => {
  test.each(data2)('compare test nested %s, %s, %s', (firstFile, secondFile, stylishFile, formatter) => {
    const expectedResult = readFixture(stylishFile).trim();
    const actualResult = genDiff(getFixturePath(firstFile), getFixturePath(secondFile), formatter);
    expect(actualResult).toBe(expectedResult);
  });
});
