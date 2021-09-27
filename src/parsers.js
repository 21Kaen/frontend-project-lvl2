import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const format = path.extname(filepath);
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }
  throw new Error(`Неверный формат файла: ${format}`);
};
export default parse;
