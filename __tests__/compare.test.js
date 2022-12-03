import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import compare from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

describe('check compare', () => {
  test('Stylish', () => {
    const expectedStylish = readFixture('stylish.txt').trim();
    const actual = compare(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
    expect(actual).toBe(expectedStylish);
  });
});
